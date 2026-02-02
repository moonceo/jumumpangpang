"use client";

import { OrderTable } from "@/components/orders/shared/order-table";
import { columns as defaultColumns } from "@/components/orders/shared/columns";
import { mockOrders } from "@/lib/mock-data/orders";
import { OrderSearch } from "@/components/orders/shared/order-search";
import { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Truck } from "lucide-react";
import { Order, SourcingHistory } from "@/types/order";
import { ORDER_STATUSES } from "@/lib/constants/orders";
import { PCCCInfoModal } from "@/components/orders/modals/pccc-info-modal";
import { OrderHistoryModal } from "@/components/orders/modals/order-history-modal";
import { DirectDeliveryModal } from "@/components/orders/modals/direct-delivery-modal";
import { SourcingPaymentModal } from "@/components/orders/modals/sourcing-payment-modal";
import { SourcingSelectionModal } from "@/components/orders/modals/sourcing-selection-modal";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function WaitingShipmentPage() {
    const [showTempInvoiceOnly, setShowTempInvoiceOnly] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isPcccOpen, setIsPcccOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isDirectDeliveryOpen, setIsDirectDeliveryOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [isSourcingSelectionOpen, setIsSourcingSelectionOpen] = useState(false);

    const handlePcccClick = (order: Order) => {
        setSelectedOrder(order);
        setIsPcccOpen(true);
    };

    const handleHistoryClick = (order: Order) => {
        setSelectedOrder(order);
        setIsHistoryOpen(true);
    };

    const handleDirectDeliveryClick = (order: Order) => {
        setSelectedOrder(order);
        setIsDirectDeliveryOpen(true);
    };

    const handleSourcingClick = (order: Order) => {
        setSelectedOrder(order);
        setIsPaymentOpen(true);
    };

    const handleSourcingManagementClick = (order: Order) => {
        setSelectedOrder(order);
        setIsSourcingSelectionOpen(true);
    };

    const handleMemoSave = (order: Order, memo: string) => {
        const updatedOrder = { ...order, internalMemo: memo };
        const index = mockOrders.findIndex(o => o.id === order.id);
        if (index !== -1) {
            mockOrders[index] = updatedOrder;
        }
        setLastFiltered(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
    };

    const handleSourcingComplete = (order: Order, selectedSourcing: SourcingHistory) => {
        // Mock update: Add the selected sourcing history to the order
        // In a real app, this would be an API call and re-fetch
        console.log("Sourcing completed", order.id, selectedSourcing);

        // Update local state to reflect change immediately for demo
        const updatedOrder = {
            ...order,
            sourcingHistory: [selectedSourcing, ...(order.sourcingHistory || [])]
        };

        // Update the mock data list (this is a hack for the demo to persist slightly)
        const index = mockOrders.findIndex(o => o.id === order.id);
        if (index !== -1) {
            mockOrders[index] = updatedOrder;
        }

        // Force re-render of search results if needed
        setLastFiltered(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
    };

    useEffect(() => {
        const handlePcccEvent = (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handlePcccClick(customEvent.detail);
        };
        const handleDirectDeliveryEvent = (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handleDirectDeliveryClick(customEvent.detail);
        };
        const handlePaymentEvent = (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handleSourcingClick(customEvent.detail);
        };

        window.addEventListener('action-pccc-info', handlePcccEvent);
        window.addEventListener('action-register-invoice', handleDirectDeliveryEvent);
        window.addEventListener('action-pay-sourcing', handlePaymentEvent);

        return () => {
            window.removeEventListener('action-pccc-info', handlePcccEvent);
            window.removeEventListener('action-register-invoice', handleDirectDeliveryEvent);
            window.removeEventListener('action-pay-sourcing', handlePaymentEvent);
        };
    }, []);

    // Filter for 'Pending Shipment' status orders
    const pendingOrders = useMemo(() => mockOrders.filter(o => ORDER_STATUSES.WAITING.includes(o.status)), []);
    const [lastFiltered, setLastFiltered] = useState<Order[]>(pendingOrders);

    const handleSearch = useCallback((filtered: Order[]) => {
        setLastFiltered(filtered);
    }, []);

    const filteredOrders = useMemo(() => {
        if (showTempInvoiceOnly) {
            return lastFiltered.filter((o: Order) => o.isTempInvoice);
        }
        return lastFiltered;
    }, [lastFiltered, showTempInvoiceOnly]);

    const pageColumns = defaultColumns;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
                        <Truck className="h-8 w-8 text-violet-600" />
                        발송대기
                    </h1>
                    <p className="text-slate-500 mt-1 text-sm font-medium">
                        발주가 진행중인 주문을 확인하고 발주를 진행합니다.
                    </p>
                </div>
            </div>

            <OrderSearch
                baseData={pendingOrders}
                onSearch={handleSearch}
                statusOptions={ORDER_STATUSES.WAITING}
                placeholder="마켓 주문번호, 주문 ID, 주문자, 수령인 정보, 상품명 검색"
                action={
                    <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
                            <Switch
                                id="temp-invoice"
                                checked={showTempInvoiceOnly}
                                onCheckedChange={setShowTempInvoiceOnly}
                                className="data-[state=checked]:bg-violet-600"
                            />
                            <Label htmlFor="temp-invoice" className="text-xs font-black text-slate-700 cursor-pointer whitespace-nowrap">가송장만 보기</Label>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="h-10 px-4 font-black border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl shadow-sm"
                                        onClick={() => {
                                            import("sonner").then(({ toast }) => {
                                                toast.success("마켓 주문을 동기화하고 있습니다...", { description: "잠시만 기다려주세요." });
                                                setTimeout(() => toast.success("주문 동기화가 완료되었습니다."), 1500);
                                            });
                                        }}
                                    >
                                        <RefreshCw className="h-4 w-4 mr-2 text-violet-600" />
                                        주문 불러오기
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs">마지막 업데이트: 2024-03-21 14:30</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                }
            />

            <Card className="p-0 overflow-hidden shadow-sm border-gray-200">
                <OrderTable
                    columns={pageColumns}
                    data={filteredOrders}
                    viewMode="WAITING"
                    onHistoryClick={handleHistoryClick}
                    onSourcingClick={handleSourcingClick}
                    onSourcingManagementClick={handleSourcingManagementClick}
                    onPCCClick={handlePcccClick}
                    onTrackingClick={handleDirectDeliveryClick}
                    onMemoSave={handleMemoSave}
                />
            </Card>

            {/* Modals */}
            {selectedOrder && (
                <>
                    <PCCCInfoModal
                        open={isPcccOpen}
                        onOpenChange={setIsPcccOpen}
                        order={selectedOrder}
                    />
                    <OrderHistoryModal
                        open={isHistoryOpen}
                        onOpenChange={setIsHistoryOpen}
                        order={selectedOrder}
                    />
                    <DirectDeliveryModal
                        open={isDirectDeliveryOpen}
                        onOpenChange={setIsDirectDeliveryOpen}
                        order={selectedOrder}
                        onConfirm={(order) => {
                            import("sonner").then(({ toast }) => {
                                toast.success("직접전달 처리가 완료되었습니다.", {
                                    description: `주문번호: ${order.marketOrderId}`
                                });
                            });
                        }}
                    />
                    <SourcingPaymentModal
                        open={isPaymentOpen}
                        onOpenChange={setIsPaymentOpen}
                        order={selectedOrder}
                        onComplete={(order) => {
                            import("sonner").then(({ toast }) => {
                                toast.success("소싱 결제가 완료되었습니다.", {
                                    description: "배송중 단계로 이동합니다."
                                });
                            });
                        }}
                        onBack={() => {
                            setIsPaymentOpen(false);
                            setIsSourcingSelectionOpen(true);
                        }}
                    />
                    <SourcingSelectionModal
                        open={isSourcingSelectionOpen}
                        onOpenChange={setIsSourcingSelectionOpen}
                        order={selectedOrder}
                        onComplete={handleSourcingComplete}
                    />
                </>
            )}
        </div>
    );
}

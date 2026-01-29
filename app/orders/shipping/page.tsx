"use client";

import { OrderTable } from "@/components/orders/shared/order-table";
import { columns as defaultColumns } from "@/components/orders/shared/columns";
import { mockOrders } from "@/lib/mock-data/orders";
import { TrackingModal } from "@/components/orders/modals/tracking-modal";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Order } from "@/types/order";
import { Truck, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { PCCCInfoModal } from "@/components/orders/modals/pccc-info-modal";
import { OrderSearch } from "@/components/orders/shared/order-search";
import { ORDER_STATUSES } from "@/lib/constants/orders";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { WarehouseModal } from "@/components/orders/modals/warehouse-modal";
import { SourcingManagementModal } from "@/components/orders/modals/sourcing-management-modal";
import { OrderHistoryModal } from "@/components/orders/modals/order-history-modal";
import { AddSourcingModal } from "@/components/orders/modals/add-sourcing-modal";

import { DomesticShippingPaymentModal } from "@/components/orders/modals/domestic-shipping-payment-modal";
import { DomesticTrackingConfirmModal } from "@/components/orders/modals/domestic-tracking-confirm-modal";

export default function ShippingPage() {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [trackingModalOpen, setTrackingModalOpen] = useState(false);
    const [pcccModalOpen, setPcccModalOpen] = useState(false);
    const [warehouseModalOpen, setWarehouseModalOpen] = useState(false);
    const [sourcingMgmtModalOpen, setSourcingMgmtModalOpen] = useState(false);
    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [addSourcingModalOpen, setAddSourcingModalOpen] = useState(false);
    const [domesticSettleModalOpen, setDomesticSettleModalOpen] = useState(false);
    const [domesticTrackingConfirmModalOpen, setDomesticTrackingConfirmModalOpen] = useState(false);

    // Filter for shipping-related statuses
    const shippingStatuses = useMemo(() => ORDER_STATUSES.SHIPPING, []);

    const shippingOrders = useMemo(() =>
        mockOrders.filter(o => shippingStatuses.includes(o.status)),
        [shippingStatuses]
    );

    const [filteredOrders, setFilteredOrders] = useState<Order[]>(shippingOrders);

    // Handlers
    const handleTracking = (order: Order) => {
        setSelectedOrder(order);
        setTrackingModalOpen(true);
    };

    const handleDomesticTracking = (order: Order) => {
        setSelectedOrder(order);
        setDomesticTrackingConfirmModalOpen(true);
    };

    const handleSourcing = (order: Order) => {
        setSelectedOrder(order);
        setAddSourcingModalOpen(true);
    };

    const handleWarehouse = (order: Order) => {
        setSelectedOrder(order);
        setWarehouseModalOpen(true);
    };

    const handleSourcingManagement = (order: Order) => {
        setSelectedOrder(order);
        setSourcingMgmtModalOpen(true);
    };

    const handleHistory = (order: Order) => {
        setSelectedOrder(order);
        setHistoryModalOpen(true);
    };

    const handlePcccClick = (order: Order) => {
        setSelectedOrder(order);
        setPcccModalOpen(true);
    };

    const handleMemoSave = (order: Order, memo: string) => {
        const updatedOrder = { ...order, internalMemo: memo };
        const index = mockOrders.findIndex(o => o.id === order.id);
        if (index !== -1) {
            mockOrders[index] = updatedOrder;
        }
        setFilteredOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
    };

    const handlePayShipping = (order: Order) => {
        import("sonner").then(({ toast }) => {
            toast.info("배송비 결제 모달이 준비중입니다.", { description: "추후 구현 예정입니다." });
        });
    };

    const pageColumns = defaultColumns;

    // Setup Event Listeners
    useEffect(() => {
        const handleSourcingEvent = (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handleSourcing(customEvent.detail);
        };
        const handleTrackingControlEvent = (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handleDomesticTracking(customEvent.detail);
        };

        window.addEventListener('action-add-sourcing', handleSourcingEvent);
        window.addEventListener('action-check-tracking', handleTrackingControlEvent);
        window.addEventListener('action-pccc-info', (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handlePcccClick(customEvent.detail);
        });

        return () => {
            window.removeEventListener('action-add-sourcing', handleSourcingEvent);
            window.removeEventListener('action-check-tracking', handleTrackingControlEvent);
            window.removeEventListener('action-pccc-info', (e: Event) => {
                const customEvent = e as CustomEvent<Order>;
                handlePcccClick(customEvent.detail);
            });
        };
    }, []);

    return (

        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">배송중</h1>
                    <p className="text-muted-foreground mt-2">
                        현지 배송부터 국내 배송까지 전체 물류 과정을 관리합니다.
                    </p>
                </div>
            </div>

            <OrderSearch
                baseData={shippingOrders}
                onSearch={setFilteredOrders}
                statusOptions={shippingStatuses}
                action={
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => {
                                        import("sonner").then(({ toast }) => {
                                            toast.success("마켓 주문을 동기화하고 있습니다...", { description: "잠시만 기다려주세요." });
                                            setTimeout(() => toast.success("주문 동기화가 완료되었습니다."), 1500);
                                        });
                                    }}
                                >
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    주문 불러오기
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">마지막 업데이트: 2024-03-21 14:30</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                }
            />

            <Card className="p-0 overflow-hidden shadow-sm border-gray-200">
                <OrderTable
                    data={filteredOrders}
                    columns={pageColumns}
                    onTrackingClick={handleTracking}
                    onWarehouseClick={handleWarehouse}
                    onSourcingClick={handleSourcing}
                    onSourcingManagementClick={handleSourcingManagement}
                    onHistoryClick={handleHistory}
                    onMemoSave={handleMemoSave}
                    onDomesticTrackingClick={handleDomesticTracking}
                    onAddSourcingClick={handleSourcing}
                    onPayShippingClick={handlePayShipping}
                    viewMode="SHIPPING"
                />
            </Card>

            {/* Modals */}
            <TrackingModal
                open={trackingModalOpen}
                onOpenChange={setTrackingModalOpen}
                order={selectedOrder}
            />
            <PCCCInfoModal
                open={pcccModalOpen}
                onOpenChange={setPcccModalOpen}
                order={selectedOrder}
            />
            <WarehouseModal
                open={warehouseModalOpen}
                onOpenChange={setWarehouseModalOpen}
                order={selectedOrder}
            />
            <SourcingManagementModal
                open={sourcingMgmtModalOpen}
                onOpenChange={setSourcingMgmtModalOpen}
                order={selectedOrder}
            />
            <OrderHistoryModal
                open={historyModalOpen}
                onOpenChange={setHistoryModalOpen}
                order={selectedOrder}
            />
            <AddSourcingModal
                open={addSourcingModalOpen}
                onOpenChange={setAddSourcingModalOpen}
                order={selectedOrder}
            />
            <DomesticShippingPaymentModal
                open={domesticSettleModalOpen}
                onOpenChange={setDomesticSettleModalOpen}
                order={selectedOrder}
                onPaymentComplete={() => {
                    setDomesticSettleModalOpen(false);
                    setTimeout(() => setTrackingModalOpen(true), 150);
                }}
            />
            <DomesticTrackingConfirmModal
                open={domesticTrackingConfirmModalOpen}
                onOpenChange={setDomesticTrackingConfirmModalOpen}
                order={selectedOrder}
                onFullTrackingClick={() => {
                    setDomesticTrackingConfirmModalOpen(false);
                    setTimeout(() => setTrackingModalOpen(true), 150);
                }}
            />
        </div>
    );
}

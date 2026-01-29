"use client";

import { OrderTable } from "@/components/orders/shared/order-table";
import { columns as defaultColumns } from "@/components/orders/shared/columns";
import { mockOrders } from "@/lib/mock-data/orders";
import { OrderCancelModal } from "@/components/orders/modals/order-cancel-modal";
import { MarginReviewModal } from "@/components/orders/modals/margin-review-modal";
import { ConfirmOrderModal } from "@/components/orders/modals/confirm-order-modal";
import { PCCCInfoModal } from "@/components/orders/modals/pccc-info-modal";
import { OrderHistoryModal } from "@/components/orders/modals/order-history-modal";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { OrderSearch } from "@/components/orders/shared/order-search";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, RefreshCw } from "lucide-react";
import { Order } from "@/types/order";
import { ORDER_STATUSES } from "@/lib/constants/orders";

export default function NewOrdersPage() {
    // Filter for 'New' status orders
    const newOrders = useMemo(() => mockOrders.filter(o => ORDER_STATUSES.NEW.includes(o.status)), []);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>(newOrders);

    // State for modals
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [marginModalOpen, setMarginModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [pcccModalOpen, setPcccModalOpen] = useState(false);
    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Handlers
    const handleMarginReview = (order: Order) => {
        setSelectedOrder(order);
        setMarginModalOpen(true);
    };

    const handleCancel = (order: Order) => {
        setSelectedOrder(order);
        setCancelModalOpen(true);
    };

    const handleConfirmOrder = (order: Order) => {
        setSelectedOrder(order);
        setConfirmModalOpen(true);
    };

    const handlePcccInfo = (order: Order) => {
        setSelectedOrder(order);
        setPcccModalOpen(true);
    };

    const handleOrderHistory = (order: Order) => {
        setSelectedOrder(order);
        setHistoryModalOpen(true);
    };

    const handleMemoSave = (order: Order, memo: string) => {
        const updatedOrder = { ...order, internalMemo: memo };
        const index = mockOrders.findIndex(o => o.id === order.id);
        if (index !== -1) {
            mockOrders[index] = updatedOrder;
        }
        setFilteredOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
    };

    // Use default columns directly as they now include the improved styles
    const pageColumns = defaultColumns;

    useEffect(() => {
        const handleConfirmOrderEvent = (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handleConfirmOrder(customEvent.detail);
        };
        const handleMarginReviewEvent = (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handleMarginReview(customEvent.detail);
        };
        const handleCancelOrderEvent = (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handleCancel(customEvent.detail);
        };

        window.addEventListener('action-tracking-input', handleConfirmOrderEvent);
        window.addEventListener('action-review-margin', handleMarginReviewEvent);
        window.addEventListener('action-cancel-order', handleCancelOrderEvent);
        window.addEventListener('action-pccc-info', (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handlePcccInfo(customEvent.detail);
        });

        return () => {
            window.removeEventListener('action-tracking-input', handleConfirmOrderEvent);
            window.removeEventListener('action-review-margin', handleMarginReviewEvent);
            window.removeEventListener('action-cancel-order', handleCancelOrderEvent);
            window.removeEventListener('action-pccc-info', (e: Event) => {
                const customEvent = e as CustomEvent<Order>;
                handlePcccInfo(customEvent.detail);
            });
        };
    }, [handleConfirmOrder, handleMarginReview, handleCancel]);


    const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
    const selectedCount = useMemo(() => Object.values(selectedRows).filter(Boolean).length, [selectedRows]);

    const handleBulkOrder = () => {
        import("sonner").then(({ toast }) => {
            toast.success(`${selectedCount}건의 주문을 일괄 발주 확인 처리했습니다.`);
            setSelectedRows({});
        });
    };

    return (
        <div className="space-y-6 relative pb-20">
            {/* Breadcrumb & Title Area */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>주문관리</span>
                    <span className="text-[10px]">/</span>
                    <span className="text-slate-600 font-medium">신규 주문</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">신규 주문</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            마켓에서 수집된 미확인 주문을 확인하고 발주를 진행하세요.
                        </p>
                    </div>
                </div>
            </div>

            <OrderSearch
                baseData={newOrders}
                onSearch={setFilteredOrders}
                statusOptions={ORDER_STATUSES.NEW}
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

            {/* Order Count Summary */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">전체</span>
                    <span className="text-sm font-bold text-indigo-600">{filteredOrders.length}</span>
                    <span className="text-sm font-semibold text-slate-900">건</span>
                </div>
            </div>

            {/* Main Table */}
            <OrderTable
                data={filteredOrders}
                columns={pageColumns}
                viewMode="NEW"
                onRowSelectionChange={setSelectedRows}
                onTrackingClick={handleConfirmOrder}
                onSourcingClick={handleMarginReview}
                onHistoryClick={handleOrderHistory}
                onPCCClick={handlePcccInfo}
                onMemoSave={handleMemoSave}
            />

            {/* Bulk Action Bar (Floating) */}
            {selectedCount > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white border border-slate-200 shadow-2xl rounded-full px-6 py-3 flex items-center gap-6">
                        <div className="flex items-center gap-2 pr-6 border-r border-slate-100">
                            <span className="text-sm font-medium text-slate-600">
                                <strong className="text-indigo-600 font-bold">{selectedCount}</strong>개 주문 선택됨
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 px-4 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-full"
                                onClick={() => setSelectedRows({})}
                            >
                                선택 해제
                            </Button>
                            <Button
                                size="sm"
                                className="h-9 px-6 bg-[#00A36C] hover:bg-[#008F5D] text-white font-semibold rounded-full shadow-md transition-all active:scale-95"
                                onClick={handleBulkOrder}
                            >
                                일괄 발주 확인하기
                            </Button>
                        </div>
                    </div>
                </div>
            )}


            {/* Modals */}
            {selectedOrder && (
                <>
                    <OrderCancelModal
                        open={cancelModalOpen}
                        onOpenChange={setCancelModalOpen}
                        orderId={selectedOrder.id}
                        marketOrderId={selectedOrder.marketOrderId}
                        productName={selectedOrder.product.name}
                    />
                    <MarginReviewModal
                        open={marginModalOpen}
                        onOpenChange={setMarginModalOpen}
                        order={selectedOrder}
                    />
                    <ConfirmOrderModal
                        open={confirmModalOpen}
                        onOpenChange={setConfirmModalOpen}
                        order={selectedOrder}
                    />
                    <PCCCInfoModal
                        open={pcccModalOpen}
                        onOpenChange={setPcccModalOpen}
                        order={selectedOrder}
                    />
                    <OrderHistoryModal
                        open={historyModalOpen}
                        onOpenChange={setHistoryModalOpen}
                        order={selectedOrder}
                    />
                </>
            )}
        </div>
    );
}

"use client";

import { OrderTable } from "@/components/orders/shared/order-table";
import { columns as defaultColumns } from "@/components/orders/shared/columns";
import { mockOrders } from "@/lib/mock-data/orders";
import { OrderCancelModal } from "@/components/orders/modals/order-cancel-modal";
import { MarginReviewModal } from "@/components/orders/modals/margin-review-modal";
import { TrackingInputModal } from "@/components/orders/modals/tracking-input-modal";
import { PcccInfoModal } from "@/components/orders/modals/pccc-info-modal";
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
    const [trackingModalOpen, setTrackingModalOpen] = useState(false);
    const [pcccModalOpen, setPcccModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Floating Action Bar State
    const [selectedCount, setSelectedCount] = useState(0);

    // Handlers
    const handleMarginReview = (order: Order) => {
        setSelectedOrder(order);
        setMarginModalOpen(true);
    };

    const handleCancel = (order: Order) => {
        setSelectedOrder(order);
        setCancelModalOpen(true);
    };

    const handleTrackingInput = (order: Order) => {
        setSelectedOrder(order);
        setTrackingModalOpen(true);
    };

    const handlePcccInfo = (order: Order) => {
        setSelectedOrder(order);
        setPcccModalOpen(true);
    };

    // Define columns with override for recipient only (Actions are handled by default columns via events)
    const pageColumns = useMemo(() => {
        return defaultColumns.map(col => {
            // Override Recipient Column
            if ('accessorKey' in col && col.accessorKey === 'recipient') {
                return {
                    ...col,
                    header: "수령자",
                    cell: ({ row }: { row: { original: Order } }) => {
                        const recipient = row.original.recipient;
                        const isPccMissing = !recipient.pccc || recipient.pccc.length < 12;

                        const handleSendAlert = (e: React.MouseEvent) => {
                            e.stopPropagation();
                            import("sonner").then(({ toast }) => {
                                toast.success(`[${recipient.name}] 고객님에게 PCCC 요청 알림톡을 발송했습니다.`);
                            });
                        };

                        return (
                            <div className="flex flex-col text-sm gap-0.5">
                                <div className="font-medium">
                                    {recipient.name}
                                </div>
                                <span className="text-xs text-muted-foreground">{recipient.phone}</span>
                                <div className="mt-0.5">
                                    {isPccMissing ? (
                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleSendAlert}
                                                className="h-5 px-1.5 text-[10px] bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
                                            >
                                                통관부호 요청
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePcccInfo(row.original);
                                            }}
                                            className="h-5 px-1.5 text-[10px] bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
                                        >
                                            통관부호 확인
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    },
                };
            }
            return col;
        });
    }, [handlePcccInfo]);

    useEffect(() => {
        const handleTrackingInputEvent = (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handleTrackingInput(customEvent.detail);
        };
        const handleMarginReviewEvent = (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handleMarginReview(customEvent.detail);
        };
        const handleCancelOrderEvent = (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handleCancel(customEvent.detail);
        };

        window.addEventListener('action-tracking-input', handleTrackingInputEvent);
        window.addEventListener('action-review-margin', handleMarginReviewEvent);
        window.addEventListener('action-cancel-order', handleCancelOrderEvent);

        return () => {
            window.removeEventListener('action-tracking-input', handleTrackingInputEvent);
            window.removeEventListener('action-review-margin', handleMarginReviewEvent);
            window.removeEventListener('action-cancel-order', handleCancelOrderEvent);
        };
    }, [handleTrackingInput, handleMarginReview, handleCancel]);

    // To demonstrate the Floating Bar, let's simulate selection
    const toggleSelectionDemo = () => {
        if (selectedCount === 0) setSelectedCount(3);
        else setSelectedCount(0);
    };

    return (

        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">신규 주문</h1>
                    <p className="text-muted-foreground mt-2">
                        마켓에서 수집된 미확인 주문을 확인하고 발주를 진행하세요.
                    </p>
                </div>
            </div>

            <OrderSearch
                baseData={newOrders}
                onSearch={setFilteredOrders}
                statusOptions={ORDER_STATUSES.NEW}
                action={
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
                }
            />

            {/* Main Table */}
            <Card className="p-0 overflow-hidden shadow-sm border-gray-200">
                <OrderTable data={filteredOrders} columns={pageColumns} viewMode="NEW" />

                <div className="mt-4 border-t pt-4 p-4">
                    <Button variant="ghost" size="sm" onClick={toggleSelectionDemo} className="text-xs text-muted-foreground">
                        (Demo: Toggle Floating Bar Selection)
                    </Button>
                </div>
            </Card>

            {/* Floating Action Bar */}
            {selectedCount > 0 && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black px-6 py-3 rounded-full shadow-lg flex items-center gap-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <span className="font-semibold text-sm">{selectedCount}개 주문 선택됨</span>
                    <div className="h-4 w-px bg-zinc-700 dark:bg-zinc-300" />
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-8 hover:bg-zinc-800 hover:text-white" onClick={() => setSelectedCount(0)}>
                            선택 해제
                        </Button>
                        <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 text-white border-0">
                            <Check className="h-4 w-4 mr-2" />
                            일괄 발주 확인하기
                        </Button>
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
                    <TrackingInputModal
                        open={trackingModalOpen}
                        onOpenChange={setTrackingModalOpen}
                        order={selectedOrder}
                    />
                    <PcccInfoModal
                        open={pcccModalOpen}
                        onOpenChange={setPcccModalOpen}
                        order={selectedOrder}
                    />
                </>
            )}
        </div>
    );
}

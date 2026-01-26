"use client";

import { OrderTable } from "@/components/orders/shared/order-table";
import { columns as defaultColumns } from "@/components/orders/shared/columns";
import { mockOrders } from "@/lib/mock-data/orders";
import { TrackingModal } from "@/components/orders/modals/tracking-modal";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Order } from "@/types/order";
import { Truck } from "lucide-react";
import { toast } from "sonner";
import { PcccInfoModal } from "@/components/orders/modals/pccc-info-modal";
import { OrderSearch } from "@/components/orders/shared/order-search";

export default function ShippingPage() {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [trackingModalOpen, setTrackingModalOpen] = useState(false);
    const [pcccModalOpen, setPcccModalOpen] = useState(false);

    // Filter for shipping-related statuses
    const shippingStatuses = useMemo(() => [
        '현지 발송 대기중', '현지 배송중', '현지 배송 완료',
        '입고 대기', '입고중', '견적 완료', '배송비 결제 완료',
        '출고 준비', '출고 완료', '국내 입항', '통관중', '통관 완료',
        '국내 배송 시작', '국내 배송중', '배송 완료',
        '오류입고', '검수불합격'
    ], []);

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
        toast.info(`국내 송장 조회: ${order.domesticTracking?.carrier} ${order.domesticTracking?.trackingNumber}`);
    };

    const handleSourcing = (order: Order) => {
        toast.message("추가 소싱하기", { description: "이 기능은 추후 구현될 예정입니다." });
    };

    const handleWarehouse = (order: Order) => {
        toast.message("배송대행지 관리", { description: "이 기능은 추후 구현될 예정입니다." });
    };

    const handlePcccClick = (order: Order) => {
        setSelectedOrder(order);
        setPcccModalOpen(true);
    };

    // Define columns with override for recipient only
    const pageColumns = useMemo(() => {
        return defaultColumns.map(col => {
            // Override Recipient
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
                            <div className="flex flex-col text-sm">
                                <div className="font-medium flex items-center gap-1">
                                    {recipient.name}
                                    {isPccMissing ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleSendAlert}
                                            className="h-5 px-1.5 text-[10px] bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
                                        >
                                            통관부호 요청
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePcccClick(row.original);
                                            }}
                                            className="h-5 px-1.5 text-[10px] bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
                                        >
                                            통관부호 확인
                                        </Button>
                                    )}
                                </div>
                                <span className="text-xs text-muted-foreground">{recipient.phone}</span>
                                {isPccMissing && (
                                    <span className="text-[10px] text-red-500 font-medium">⚠️ 통관부호 누락</span>
                                )}
                            </div>
                        );
                    },
                };
            }
            return col;
        });
    }, [handlePcccClick]);

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

        return () => {
            window.removeEventListener('action-add-sourcing', handleSourcingEvent);
            window.removeEventListener('action-check-tracking', handleTrackingControlEvent);
        };
    }, [handleSourcing, handleDomesticTracking]);

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

            <OrderSearch baseData={shippingOrders} onSearch={setFilteredOrders} />

            <Card className="p-0 overflow-hidden shadow-sm border-gray-200">
                <OrderTable
                    data={filteredOrders}
                    columns={pageColumns}
                    onTrackingClick={handleTracking}
                    onWarehouseClick={handleWarehouse}
                    onSourcingClick={handleSourcing}
                />
            </Card>

            {/* Modals */}
            <TrackingModal
                open={trackingModalOpen}
                onOpenChange={setTrackingModalOpen}
                order={selectedOrder}
            />
            <PcccInfoModal
                open={pcccModalOpen}
                onOpenChange={setPcccModalOpen}
                order={selectedOrder}
            />
        </div>
    );
}

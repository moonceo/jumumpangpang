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
import { PcccInfoModal } from "@/components/orders/modals/pccc-info-modal";
import { OrderSearch } from "@/components/orders/shared/order-search";
import { ORDER_STATUSES } from "@/lib/constants/orders";

import { WarehouseModal } from "@/components/orders/modals/warehouse-modal";
import { SourcingManagementModal } from "@/components/orders/modals/sourcing-management-modal";
import { OrderHistoryModal } from "@/components/orders/modals/order-history-modal";
import { AddSourcingModal } from "@/components/orders/modals/add-sourcing-modal";

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
        // toast.info(`국내 송장 조회: ${order.domesticTracking?.carrier} ${order.domesticTracking?.trackingNumber}`);
        setSelectedOrder(order);
        setDomesticSettleModalOpen(true);
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
                                                handlePcccClick(row.original);
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

            <Card className="p-0 overflow-hidden shadow-sm border-gray-200">
                <OrderTable
                    data={filteredOrders}
                    columns={pageColumns}
                    onTrackingClick={handleTracking}
                    onWarehouseClick={handleWarehouse}
                    onSourcingClick={handleSourcing}
                    onSourcingManagementClick={handleSourcingManagement}
                    onHistoryClick={handleHistory}
                    viewMode="SHIPPING"
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
            <DomesticTrackingConfirmModal
                open={domesticSettleModalOpen}
                onOpenChange={setDomesticSettleModalOpen}
                order={selectedOrder}
                onFullTrackingClick={() => {
                    setDomesticSettleModalOpen(false);
                    setTimeout(() => setTrackingModalOpen(true), 150);
                }}
            />
        </div>
    );
}

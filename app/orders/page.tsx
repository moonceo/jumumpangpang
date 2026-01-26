"use client";
import { RefreshCw } from "lucide-react";
import { OrderTable } from "@/components/orders/shared/order-table";
import { columns as defaultColumns } from "@/components/orders/shared/columns";
import { mockOrders } from "@/lib/mock-data/orders";
import { ORDER_STATUSES } from "@/lib/constants/orders";
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Order } from "@/types/order";
import { OrderSearch } from "@/components/orders/shared/order-search";
import { WarehouseModal } from "@/components/orders/modals/warehouse-modal";
import { SourcingManagementModal } from "@/components/orders/modals/sourcing-management-modal";
import { TrackingModal } from "@/components/orders/modals/tracking-modal";
import { OrderHistoryModal } from "@/components/orders/modals/order-history-modal";
import { PcccInfoModal } from "@/components/orders/modals/pccc-info-modal";
import { Button } from "@/components/ui/button";


export default function AllOrdersPage() {
    // Show all orders
    const [orders, setOrders] = useState<Order[]>(mockOrders);

    // Modal states
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
    const [isSourcingOpen, setIsSourcingOpen] = useState(false);
    const [isTrackingOpen, setIsTrackingOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isPcccOpen, setIsPcccOpen] = useState(false);

    const handleWarehouseClick = (order: Order) => {
        setSelectedOrder(order);
        setIsWarehouseOpen(true);
    };

    const handleSourcingClick = (order: Order) => {
        setSelectedOrder(order);
        setIsSourcingOpen(true);
    };

    const handleTrackingClick = (order: Order) => {
        setSelectedOrder(order);
        setIsTrackingOpen(true);
    };

    const handleHistoryClick = (order: Order) => {
        setSelectedOrder(order);
        setIsHistoryOpen(true);
    };

    const handlePcccClick = (order: Order) => {
        setSelectedOrder(order);
        setIsPcccOpen(true);
    };

    // Override recipient column to add PCCC modal
    // Override recipient column to add PCCC modal
    const pageColumns = useMemo(() => {
        return defaultColumns.map(col => {
            if ('accessorKey' in col && col.accessorKey === 'recipient') {
                return {
                    ...col,
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
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">전체 주문 관리</h1>
                    <p className="text-muted-foreground mt-2 text-sm">
                        여러 마켓에서 발생한 주문을 통합 관리하는 시스템입니다.
                    </p>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <OrderSearch
                baseData={mockOrders}
                onSearch={setOrders}
                statusOptions={ORDER_STATUSES.ALL}
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
                <OrderTable
                    data={orders}
                    columns={pageColumns}
                    onWarehouseClick={handleWarehouseClick}
                    onSourcingClick={handleSourcingClick}
                    onTrackingClick={handleTrackingClick}
                    onHistoryClick={handleHistoryClick}
                />
            </Card>

            {/* Modals */}
            <WarehouseModal
                order={selectedOrder}
                open={isWarehouseOpen}
                onOpenChange={setIsWarehouseOpen}
            />
            <SourcingManagementModal
                order={selectedOrder}
                open={isSourcingOpen}
                onOpenChange={setIsSourcingOpen}
            />
            <TrackingModal
                order={selectedOrder}
                open={isTrackingOpen}
                onOpenChange={setIsTrackingOpen}
            />
            <OrderHistoryModal
                order={selectedOrder}
                open={isHistoryOpen}
                onOpenChange={setIsHistoryOpen}
            />
            <PcccInfoModal
                order={selectedOrder}
                open={isPcccOpen}
                onOpenChange={setIsPcccOpen}
            />
        </div>
    );
}

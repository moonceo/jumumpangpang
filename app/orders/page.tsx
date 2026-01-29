"use client";
import { RefreshCw } from "lucide-react";
import { OrderTable } from "@/components/orders/shared/order-table";
import { columns as defaultColumns } from "@/components/orders/shared/columns";
import { mockOrders } from "@/lib/mock-data/orders";
import { ORDER_STATUSES } from "@/lib/constants/orders";
import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Order } from "@/types/order";
import { OrderSearch } from "@/components/orders/shared/order-search";
import { WarehouseModal } from "@/components/orders/modals/warehouse-modal";
import { SourcingManagementModal } from "@/components/orders/modals/sourcing-management-modal";
import { TrackingModal } from "@/components/orders/modals/tracking-modal";
import { OrderHistoryModal } from "@/components/orders/modals/order-history-modal";
import { PCCCInfoModal } from "@/components/orders/modals/pccc-info-modal";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";


export default function AllOrdersPage() {
    // Show all orders
    const [orders, setOrders] = useState<Order[]>(mockOrders);

    useEffect(() => {
        const handlePcccEvent = (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handlePcccClick(customEvent.detail);
        };
        window.addEventListener('action-pccc-info', handlePcccEvent);
        return () => window.removeEventListener('action-pccc-info', handlePcccEvent);
    }, []);

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

    const handleMemoSave = (order: Order, memo: string) => {
        const updatedOrder = { ...order, internalMemo: memo };
        const index = mockOrders.findIndex(o => o.id === order.id);
        if (index !== -1) {
            mockOrders[index] = updatedOrder;
        }
        setOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
    };

    const pageColumns = defaultColumns;

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

            {/* Main Table */}
            <Card className="p-0 overflow-hidden shadow-sm border-gray-200">
                <OrderTable
                    data={orders}
                    columns={pageColumns}
                    onWarehouseClick={handleWarehouseClick}
                    onSourcingClick={handleSourcingClick}
                    onTrackingClick={handleTrackingClick}
                    onHistoryClick={handleHistoryClick}
                    onMemoSave={handleMemoSave}
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
            <PCCCInfoModal
                order={selectedOrder}
                open={isPcccOpen}
                onOpenChange={setIsPcccOpen}
            />
        </div>
    );
}

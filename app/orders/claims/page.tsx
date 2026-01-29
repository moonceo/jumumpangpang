"use client";

import { OrderTable } from "@/components/orders/shared/order-table";
import { columns as defaultColumns } from "@/components/orders/shared/columns";
import { mockOrders } from "@/lib/mock-data/orders";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { PCCCInfoModal } from "@/components/orders/modals/pccc-info-modal";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Order } from "@/types/order";
import { OrderSearch } from "@/components/orders/shared/order-search";
import { ORDER_STATUSES } from "@/lib/constants/orders";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ClaimsPage() {
    // Filter for Claims related statuses
    // Filter for Claims related statuses
    const claimStatuses = useMemo(() => ORDER_STATUSES.CLAIMS, []);

    const claimOrders = useMemo(() =>
        mockOrders.filter(o => claimStatuses.includes(o.status)),
        [claimStatuses]
    );

    const [filteredOrders, setFilteredOrders] = useState<Order[]>(claimOrders);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [pcccModalOpen, setPcccModalOpen] = useState(false);

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

    const pageColumns = defaultColumns;

    useEffect(() => {
        const handlePcccEvent = (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handlePcccClick(customEvent.detail);
        };
        window.addEventListener('action-pccc-info', handlePcccEvent);
        return () => window.removeEventListener('action-pccc-info', handlePcccEvent);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-red-600 dark:text-red-500 flex items-center gap-2">
                        <AlertTriangle className="h-8 w-8" />
                        반품/교환/취소
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        고객 클레임 및 주문 취소 건을 관리합니다.
                    </p>
                </div>
            </div>



            <OrderSearch
                baseData={claimOrders}
                onSearch={setFilteredOrders}
                statusOptions={ORDER_STATUSES.CLAIMS}
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
                    viewMode="CLAIMS"
                    onPCCClick={handlePcccClick}
                    onMemoSave={handleMemoSave}
                />
            </Card>
            <PCCCInfoModal
                order={selectedOrder}
                open={pcccModalOpen}
                onOpenChange={setPcccModalOpen}
            />
        </div>
    );
}

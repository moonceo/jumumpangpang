"use client";

import { OrderTable } from "@/components/orders/shared/order-table";
import { columns as defaultColumns } from "@/components/orders/shared/columns";
import { mockOrders } from "@/lib/mock-data/orders";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { PcccInfoModal } from "@/components/orders/modals/pccc-info-modal";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Order } from "@/types/order";
import { OrderSearch } from "@/components/orders/shared/order-search";
import { ORDER_STATUSES } from "@/lib/constants/orders";

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
                <OrderTable data={filteredOrders} columns={pageColumns} viewMode="CLAIMS" />
            </Card>
            <PcccInfoModal
                order={selectedOrder}
                open={pcccModalOpen}
                onOpenChange={setPcccModalOpen}
            />
        </div>
    );
}

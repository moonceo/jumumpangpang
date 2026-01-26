"use client";

import { OrderTable } from "@/components/orders/shared/order-table";
import { columns as defaultColumns } from "@/components/orders/shared/columns";
import { mockOrders } from "@/lib/mock-data/orders";
import { AlertTriangle } from "lucide-react";
import { PcccInfoModal } from "@/components/orders/modals/pccc-info-modal";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Order } from "@/types/order";
import { OrderSearch } from "@/components/orders/shared/order-search";

export default function ClaimsPage() {
    // Filter for Claims related statuses
    const claimStatuses = useMemo(() => [
        '주문 취소', '취소 요청', '반품 요청',
        '반품 수거중', '반품 완료', '교환 요청',
        '오류입고', '검수불합격'
    ], []);

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

            <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 p-4 rounded-lg flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-orange-900 dark:text-orange-400">반품 처리 가이드 (2단계 프로세스)</h4>
                    <ol className="text-sm list-decimal list-inside text-orange-800 dark:text-orange-300 space-y-1">
                        <li>
                            <span className="font-medium">1단계 (소싱 환불):</span> 먼저 &apos;소싱주문 관리&apos; 채팅으로 판매자에게 반품 의사를 밝히고 반품지 주소를 확보하세요.
                        </li>
                        <li>
                            <span className="font-medium">2단계 (배대지 반품 요청):</span> 확보한 주소를 바탕으로 &apos;배송대행지 관리&apos;에서 반품 신청서를 작성하세요.
                        </li>
                    </ol>
                </div>
            </div>

            <OrderSearch baseData={claimOrders} onSearch={setFilteredOrders} />

            <Card className="p-0 overflow-hidden shadow-sm border-gray-200">
                <OrderTable data={filteredOrders} columns={pageColumns} />
            </Card>
            <PcccInfoModal
                order={selectedOrder}
                open={pcccModalOpen}
                onOpenChange={setPcccModalOpen}
            />
        </div>
    );
}

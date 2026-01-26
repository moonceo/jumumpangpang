"use client";

import { OrderTable } from "@/components/orders/shared/order-table";
import { columns as defaultColumns } from "@/components/orders/shared/columns";
import { mockOrders } from "@/lib/mock-data/orders";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { OrderSearch } from "@/components/orders/shared/order-search";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, Truck, Info, Copy } from "lucide-react";
import { Order } from "@/types/order";
import { toast } from "sonner";
import { PcccInfoModal } from "@/components/orders/modals/pccc-info-modal";

export default function WaitingShipmentPage() {
    const [showTempInvoiceOnly, setShowTempInvoiceOnly] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [isPcccOpen, setIsPcccOpen] = useState(false);

    // Filter for 'Pending Shipment' status orders
    const pendingOrders = useMemo(() => mockOrders.filter(o => o.status === '발송대기'), []);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>(pendingOrders);

    // Handlers
    const handleInvoiceRegister = (order: Order) => {
        setSelectedOrder(order);
        setIsInvoiceModalOpen(true);
    };

    const handleCopyInvoice = () => {
        navigator.clipboard.writeText("509501161401"); // Mock invoice
        toast.success("가송장 번호가 복사되었습니다.");
    };

    const handlePcccClick = (order: Order) => {
        setSelectedOrder(order);
        setIsPcccOpen(true);
    };

    // Define columns with override for recipient only (Actions are handled by default columns via events)
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

    // Setup Event Listeners for Actions
    useEffect(() => {
        const handleRegisterInvoiceEvent = (e: Event) => {
            const customEvent = e as CustomEvent<Order>;
            handleInvoiceRegister(customEvent.detail);
        };

        window.addEventListener('action-register-invoice', handleRegisterInvoiceEvent);

        return () => {
            window.removeEventListener('action-register-invoice', handleRegisterInvoiceEvent);
        };
    }, [handleInvoiceRegister]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">발송대기</h1>
                    <p className="text-muted-foreground mt-2">
                        발주가 확인되었으나 아직 송장이 입력되지 않은 주문입니다.
                    </p>
                </div>
            </div>

            <OrderSearch baseData={pendingOrders} onSearch={setFilteredOrders} />

            <Card className="p-0 overflow-hidden shadow-sm border-gray-200">
                {/* Page specific filters */}
                <div className="flex items-center space-x-2 p-4 border-b">
                    <Switch
                        id="temp-invoice"
                        checked={showTempInvoiceOnly}
                        onCheckedChange={setShowTempInvoiceOnly}
                    />
                    <Label htmlFor="temp-invoice">가송장만 보기 (임시 번호)</Label>
                </div>

                <OrderTable data={filteredOrders} columns={pageColumns} />
            </Card>

            {/* Invoice Register Modal (Manual) */}
            <Dialog open={isInvoiceModalOpen} onOpenChange={setIsInvoiceModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>송장 수동 입력 필요</DialogTitle>
                        <DialogDescription>
                            {selectedOrder?.marketType === '11st'
                                ? "11번가는 API 제약으로 인해 '직접전달' 모드로 입력해야 합니다."
                                : "이 마켓은 송장 자동 동기화를 지원하지 않습니다."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-md text-sm">
                            <span className="font-semibold w-20">가송장 번호</span>
                            <code className="bg-white px-1 py-0.5 rounded border">509501161401</code>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto" onClick={handleCopyInvoice}>
                                <Copy className="h-3 w-3" />
                            </Button>
                        </div>

                        {selectedOrder?.marketType === '11st' && (
                            <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
                                <div className="flex items-start gap-3">
                                    <Truck className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-blue-900">
                                            11번가 처리 가이드
                                        </p>
                                        <p className="text-sm text-blue-700">
                                            반드시 배송 방법을 <span className="font-bold underline">직접전달</span>로 선택하고 송장번호를 입력해주세요. 택배사 선택 시 오류가 발생할 수 있습니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label>처리할 운송장 번호</Label>
                            <Input defaultValue="509501161401" />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsInvoiceModalOpen(false)}>취소</Button>
                        <Button onClick={() => {
                            toast.success("송장 정보가 업데이트되었습니다.");
                            setIsInvoiceModalOpen(false);
                        }}>
                            입력 완료
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <PcccInfoModal
                order={selectedOrder}
                open={isPcccOpen}
                onOpenChange={setIsPcccOpen}
            />
        </div>
    );
}

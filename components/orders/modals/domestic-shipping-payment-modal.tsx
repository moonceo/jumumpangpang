"use client";

import { Order } from "@/types/order";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, AlertTriangle, ClipboardList, X } from "lucide-react";
import { toast } from "sonner";

export function DomesticShippingPaymentModal({
    order,
    open,
    onOpenChange,
    onPaymentComplete
}: {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onPaymentComplete?: () => void;
}) {
    if (!order) return null;

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("클립보드에 복사되었습니다.", { description: text });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden flex flex-col gap-0 border-none">
                <div className="p-6 pb-2 space-y-2 relative">
                    <button
                        onClick={() => onOpenChange(false)}
                        className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <DialogHeader className="space-y-2">
                        <DialogTitle className="text-xl font-bold">국내 배송비 결제</DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            해외 물류센터에 입고되어 무게 측정이 완료되었습니다.<br />
                            배송비를 결제하면 국내 배송이 시작됩니다.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6 pt-2 space-y-6">
                    {/* Weight & Cost Info */}
                    <div className="bg-slate-50 dark:bg-zinc-900 rounded-lg p-5 space-y-4 border">
                        <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-zinc-800">
                            <span className="text-sm text-muted-foreground">실측 무게</span>
                            <span className="font-bold text-lg">{order.warehouse?.weight || 0} kg</span>
                        </div>
                        <div className="flex justify-between items-center text-red-600 dark:text-red-400">
                            <span className="text-sm font-medium">결제할 배송비</span>
                            <span className="font-bold text-xl">{(order.warehouse?.shippingCost || 3000).toLocaleString()}원</span>
                        </div>
                    </div>

                    {/* Payment Method Notice */}
                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm">
                        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold mb-1">예치금에서 자동 차감됩니다.</p>
                            <p className="text-xs opacity-90">잔액이 부족할 경우 충전 후 결제해 주세요.</p>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                {/* Footer Buttons */}
                <div className="p-4 border-t flex gap-3">
                    <Button
                        variant="ghost"
                        className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                        onClick={() => onOpenChange(false)}
                    >
                        취소
                    </Button>
                    <Button
                        className="flex-[2] bg-[#18181b] hover:bg-zinc-800 text-white"
                        onClick={() => {
                            toast.success("배송비 결제가 완료되었습니다.");
                            onPaymentComplete?.();
                            onOpenChange(false);
                        }}
                    >
                        결제하기
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

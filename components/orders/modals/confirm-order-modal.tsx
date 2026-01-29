"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Order } from "@/types/order";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ConfirmOrderModalProps {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ConfirmOrderModal({ order, open, onOpenChange }: ConfirmOrderModalProps) {
    if (!order) return null;

    const handleConfirm = () => {
        toast.success(`[${order.marketOrderId}] 주문이 발송대기 상태로 변경되었습니다.`);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-lg font-bold text-slate-900">발주 확인</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-4">
                    {/* Order Summary Box */}
                    <div className="bg-slate-50/80 rounded-xl p-4 flex gap-4 border border-slate-100">
                        <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border border-white shadow-sm">
                            <Image
                                src={order.product.thumbnail}
                                alt={order.product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                    {order.marketType}
                                </span>
                                <span className="text-[10px] text-slate-300">|</span>
                                <span className="text-[10px] font-mono text-slate-500">
                                    {order.marketOrderId}
                                </span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-800 truncate">
                                {order.product.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate">
                                옵션: {order.product.optionName}
                            </p>
                        </div>
                    </div>

                    {/* Notice box */}
                    <div className="bg-[#ECFDF5] border border-[#D1FAE5] rounded-xl p-4 flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#059669] shrink-0 mt-0.5" />
                        <p className="text-sm text-[#065F46] font-medium leading-relaxed">
                            선택한 주문의 상태가 <span className="font-bold underline decoration-2 underline-offset-4 decoration-[#A7F3D0]">"신규주문"</span>에서 <span className="font-bold underline decoration-2 underline-offset-4 decoration-[#A7F3D0]">"발송대기"</span>로 변경됩니다.
                        </p>
                    </div>
                </div>

                <DialogFooter className="bg-slate-50/50 p-4 border-t border-slate-100 flex items-center justify-end gap-2">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 font-medium"
                    >
                        취소
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        className="bg-[#00A36C] hover:bg-[#008F5D] text-white font-bold px-6 shadow-lg shadow-emerald-100 transition-all active:scale-95"
                    >
                        발주 확인하기
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

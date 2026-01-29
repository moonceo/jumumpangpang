"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Order } from "@/types/order";

interface DirectDeliveryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    order: Order | null;
    onConfirm?: (order: Order) => void;
}

export function DirectDeliveryModal({ open, onOpenChange, order, onConfirm }: DirectDeliveryModalProps) {
    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                        <AlertCircle className="h-5 w-5 text-zinc-900" />
                        직접전달 처리하기
                    </DialogTitle>
                </DialogHeader>

                <div className="py-6 py-4">
                    <p className="text-sm text-slate-600 leading-relaxed text-center font-medium">
                        직접전달로 미리 발송 처리가 진행됩니다.<br />
                        계속하시겠습니까?
                    </p>
                </div>

                <DialogFooter className="flex gap-2 sm:justify-center">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="flex-1 h-11 text-slate-500 font-bold border-slate-200"
                    >
                        취소
                    </Button>
                    <Button
                        onClick={() => {
                            onConfirm?.(order);
                            onOpenChange(false);
                        }}
                        className="flex-1 h-11 bg-[#18181b] hover:bg-zinc-800 text-white font-bold transition-all active:scale-95"
                    >
                        직접전달 처리하기
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

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

interface DomesticTrackingConfirmModalProps {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onFullTrackingClick: () => void;
}

export function DomesticTrackingConfirmModal({
    order,
    open,
    onOpenChange,
    onFullTrackingClick
}: DomesticTrackingConfirmModalProps) {
    if (!order) return null;

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("클립보드에 복사되었습니다.", { description: text });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md p-0 overflow-hidden flex flex-col gap-0 border-none">
                <div className="p-6 pb-2 space-y-2 relative">
                    <button
                        onClick={() => onOpenChange(false)}
                        className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <DialogHeader className="space-y-2">
                        <DialogTitle className="text-xl font-bold">직접전달주문 처리하기</DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            직접전달 주문을 정산받기 위해서는 아래와 같은 처리가 필요해요.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6 pt-2 space-y-6">
                    {/* Status Section */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 px-3 py-1 text-xs">
                                배송완료
                            </Badge>
                            <span className="text-[10px] text-muted-foreground bg-slate-100 px-2 py-1 rounded">최근</span>
                        </div>
                        <p className="text-sm text-foreground">
                            고객님의 상품이 배송완료 되었습니다.(담당사원:김철수 010-1234-5678)
                        </p>
                    </div>

                    {/* Settlement Guide Box */}
                    <div className="bg-slate-50 dark:bg-zinc-900 rounded-lg p-4 space-y-3 border">
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                            <ClipboardList className="h-4 w-4 text-slate-500" />
                            정산을 위해 해야 할 일
                        </h4>
                        <div className="text-sm text-foreground">
                            현재 <span className="font-bold text-green-600">배송완료</span> 상태예요. 배송이 완료되면 구매확정 요청을 해주세요.
                        </div>
                        <div className="bg-white dark:bg-black rounded border p-3 text-xs text-muted-foreground leading-relaxed">
                            <span className="text-[10px] text-slate-400 block mb-1">{order.storeName} 판매자센터</span>
                            배송현황 관리 → 구매확정 관리 → <span className="font-bold text-foreground">구매확정 요청</span>
                        </div>
                    </div>

                    {/* Tracking Info */}
                    <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">택배사</span>
                            <span className="font-medium">{order.domesticTracking?.carrier || "CJ대한통운"}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span className="text-sm font-normal text-muted-foreground">운송장</span>
                            <div className="flex items-center gap-2">
                                <span>{order.domesticTracking?.trackingNumber || "509501161401"}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleCopy(order.domesticTracking?.trackingNumber || "")}
                                >
                                    <Copy className="h-3 w-3 text-slate-400" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Warning Box */}
                    <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-500 text-xs px-4 py-3 rounded-lg flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        송장번호로 변경하면 패널티가 부과될 수 있어요.
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 border-t flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1 border-black text-black hover:bg-slate-50 dark:border-white dark:text-white dark:hover:bg-zinc-800"
                        onClick={onFullTrackingClick}
                    >
                        배송추적 전체 보기
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                        onClick={() => onOpenChange(false)}
                    >
                        닫기
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

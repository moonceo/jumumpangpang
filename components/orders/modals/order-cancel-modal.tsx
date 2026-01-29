import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";

interface OrderCancelModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    orderId?: string;
    marketOrderId?: string;
    productName?: string;
}

export function OrderCancelModal({
    open,
    onOpenChange,
    orderId,
    marketOrderId,
    productName,
}: OrderCancelModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-lg font-bold text-slate-900">주문 취소</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-5">
                    {/* Order Info Box */}
                    <div className="bg-slate-50/80 rounded-xl p-4 space-y-2 text-[12px] border border-slate-100">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400 font-medium tracking-tight">주문번호</span>
                            <span className="font-mono text-slate-600 font-bold">{orderId}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400 font-medium tracking-tight">마켓 주문번호</span>
                            <span className="font-mono text-slate-600 font-bold">{marketOrderId}</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 pt-1 border-t border-slate-100 mt-1">
                            <span className="text-slate-400 font-medium tracking-tight whitespace-nowrap">상품명</span>
                            <span className="font-bold text-slate-700 text-right line-clamp-2">{productName}</span>
                        </div>
                    </div>

                    {/* Reason Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="cancel-reason" className="text-[12px] font-bold text-slate-700 ml-1">
                            취소 사유 <span className="text-red-500">*</span>
                        </Label>
                        <Select>
                            <SelectTrigger id="cancel-reason" className="h-10 text-[13px] border-slate-200 focus:ring-slate-400 rounded-lg bg-white/50">
                                <SelectValue placeholder="사유를 선택해주세요" />
                            </SelectTrigger>
                            <SelectContent className="rounded-lg">
                                <SelectItem value="customer_change">구매 의사 취소</SelectItem>
                                <SelectItem value="option_change">색상 및 사이즈 변경</SelectItem>
                                <SelectItem value="wrong_order">다른 상품 잘못 주문</SelectItem>
                                <SelectItem value="service_bad">서비스 불만족</SelectItem>
                                <SelectItem value="delay">배송 지연</SelectItem>
                                <SelectItem value="outofstock">상품 품절</SelectItem>
                                <SelectItem value="info_mismatch">상품 정보 상이</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Detailed Reason */}
                    <div className="space-y-2">
                        <Label htmlFor="cancel-detail" className="text-[12px] font-bold text-slate-700 ml-1">상세 사유 (선택)</Label>
                        <Textarea
                            id="cancel-detail"
                            placeholder="추가로 전달하실 내용이 있다면 입력해주세요"
                            className="resize-none min-h-[100px] text-[13px] border-slate-200 focus:ring-slate-400 rounded-lg bg-white/50 p-3"
                        />
                    </div>

                    {/* Warning Box */}
                    <div className="bg-[#FFFBEB] border border-[#FEF3C7] p-4 rounded-xl flex gap-3">
                        <AlertTriangle className="h-5 w-5 text-[#D97706] shrink-0 mt-0.5" />
                        <p className="text-sm text-[#92400E] font-medium leading-relaxed">
                            주문 취소 요청 후에는 되돌릴 수 없습니다. <span className="font-bold underline decoration-[#FDE68A] decoration-2 underline-offset-4">신중하게 결정해주세요.</span>
                        </p>
                    </div>
                </div>

                <DialogFooter className="bg-slate-50/50 p-4 border-t border-slate-100 flex items-center justify-end gap-2">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 font-medium"
                    >
                        닫기
                    </Button>
                    <Button
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 shadow-lg shadow-slate-100 transition-all active:scale-95"
                    >
                        주문 취소하기
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

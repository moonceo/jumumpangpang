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
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>주문 취소하기</DialogTitle>
                    <DialogDescription>
                        마켓에 주문 취소 요청을 전송합니다.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Order Info Box */}
                    <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">주문번호</span>
                            <span className="font-medium">{orderId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">마켓 주문번호</span>
                            <span className="font-medium">{marketOrderId}</span>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                            <span className="text-muted-foreground whitespace-nowrap">상품명</span>
                            <span className="font-medium text-right truncate line-clamp-2">{productName}</span>
                        </div>
                    </div>

                    {/* Reason Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="cancel-reason">취소 사유 <span className="text-red-500">*</span></Label>
                        <Select>
                            <SelectTrigger id="cancel-reason">
                                <SelectValue placeholder="사유를 선택해주세요" />
                            </SelectTrigger>
                            <SelectContent>
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
                        <Label htmlFor="cancel-detail">상세 사유 (선택)</Label>
                        <Textarea
                            id="cancel-detail"
                            placeholder="추가로 전달하실 내용이 있다면 입력해주세요"
                            className="resize-none"
                        />
                    </div>

                    {/* Warning Box */}
                    <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 p-3 rounded-md flex gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
                        <p className="text-sm text-yellow-800 dark:text-yellow-400 font-medium">
                            주문 취소 요청 후에는 되돌릴 수 없습니다. 신중하게 결정해주세요.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>닫기</Button>
                    <Button variant="destructive">주문 취소하기</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import Image from "next/image";
import { Order } from "@/types/order";
import { toast } from "sonner";

interface AddSourcingModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    order: Order | null;
}

export function AddSourcingModal({ open, onOpenChange, order }: AddSourcingModalProps) {
    if (!order) return null;

    // Mock AI recommended product for additional sourcing
    const aiProduct = {
        name: "실내용 의자 가정용 심플 의자 휴식 등받이형 은색 프레임 옐로우 고무 원형 스툴",
        matchingRate: 95,
        priceCNY: 280,
        priceKRW: 53200,
        shippingCNY: 0,
        thumbnail: order.product.thumbnail, // Reusing for mock
    };

    const sourcingTotal = aiProduct.priceKRW;

    const handleConfirm = () => {
        toast.success("추가 소싱 상품이 등록되었습니다.", {
            description: "발송대기 상태로 주문이 복제되지 않고, 소싱 이력에 추가되었습니다."
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-blue-500" />
                        소싱 검토 - 주문 #{order.id}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border rounded-lg overflow-hidden h-[500px]">
                    {/* Left: Original Order Key Info */}
                    <div className="bg-muted/30 p-6 space-y-6 border-r overflow-y-auto">
                        <h3 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                            <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                            주문 상품 정보
                        </h3>

                        <div className="flex gap-4">
                            <div className="relative h-24 w-24 rounded border overflow-hidden flex-shrink-0">
                                <Image src={order.product.thumbnail} alt="Product" fill className="object-cover" />
                            </div>
                            <div className="space-y-1">
                                <div className="font-medium text-sm line-clamp-2">{order.product.name}</div>
                                <div className="text-xs text-muted-foreground">{order.product.optionName}</div>
                                <div className="text-xs border rounded w-fit px-1.5 py-0.5 mt-1">수량: {order.product.quantity}개</div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded p-4 space-y-2 text-sm border shadow-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">결제 금액</span>
                                <span className="font-bold">{order.paymentPrice.toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>플랫폼 수수료</span>
                                <span>-{order.platformFee.toLocaleString()}원</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-blue-600">
                                <span>정산 예정금액</span>
                                <span>{order.expectedSettlement.toLocaleString()}원</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: AI Recommendation Search */}
                    <div className="bg-blue-50/50 dark:bg-blue-950/20 p-6 space-y-6 overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
                                <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                                AI 추천 소싱 상품
                            </h3>
                            <Button variant="link" size="sm" className="h-auto p-0 text-blue-600">
                                더보기 <Search className="h-3 w-3 ml-1" />
                            </Button>
                        </div>

                        {/* Recommendation Item 1 */}
                        <div className="bg-white dark:bg-zinc-900 rounded-lg border p-4 shadow-sm space-y-4 ring-2 ring-blue-500 ring-offset-2">
                            <div className="flex gap-4">
                                <div className="relative h-16 w-16 rounded bg-muted flex-shrink-0">
                                    <Image src={aiProduct.thumbnail} alt="Sourcing" fill className="object-cover rounded" />
                                    <Badge className="absolute -top-2 -left-2 bg-pink-500 hover:bg-pink-600 text-[10px]">
                                        매칭률 95%
                                    </Badge>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="font-medium text-sm text-blue-900 dark:text-blue-100 line-clamp-1">
                                        {aiProduct.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        옵션: 블랙 프레임 / 원형
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-zinc-800 p-3 rounded text-xs space-y-1">
                                <div className="flex justify-between">
                                    <span>상품가</span>
                                    <span>280 CNY (약 53,200원)</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>예상 배송비</span>
                                    <span>0 CNY</span>
                                </div>
                                <Separator className="my-1" />
                                <div className="flex justify-between font-bold">
                                    <span>총 소싱 비용</span>
                                    <span>{sourcingTotal.toLocaleString()}원</span>
                                </div>
                            </div>
                            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleConfirm}>
                                이 상품으로 선택
                            </Button>
                        </div>

                        {/* Recommendation Item 2 */}
                        <div className="bg-white dark:bg-zinc-900 rounded-lg border p-4 shadow-sm space-y-4 opacity-75 hover:opacity-100 transition-opacity">
                            <div className="flex gap-4">
                                <div className="relative h-16 w-16 rounded bg-muted flex-shrink-0">
                                    <div className="bg-slate-200 w-full h-full flex items-center justify-center text-xs text-muted-foreground rounded">Img</div>
                                    <Badge className="absolute -top-2 -left-2 bg-slate-500 text-[10px]">
                                        매칭률 90%
                                    </Badge>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="font-medium text-sm line-clamp-1">
                                        유사 상품 B (Different Option)
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        옵션: 화이트 프레임
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs text-center p-2">
                                <span className="font-bold">51,000원</span> (비용 절감 가능)
                            </div>
                            <Button variant="outline" size="sm" className="w-full">
                                선택
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="py-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>닫기</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

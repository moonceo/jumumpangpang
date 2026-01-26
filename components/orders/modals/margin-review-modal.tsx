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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowRight, ExternalLink, Calculator, TrendingUp } from "lucide-react";
import Image from "next/image";
import { Order } from "@/types/order";

interface MarginReviewModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    order: Order;
}

export function MarginReviewModal({ open, onOpenChange, order }: MarginReviewModalProps) {
    // Mock AI recommended product
    const aiProduct = {
        name: "타오바오 동일 옵션 상품 (Translated)",
        matchingRate: 98,
        priceCNY: 298,
        priceKRW: 56000,
        shippingCNY: 0,
        thumbnail: order.product.thumbnail, // Reusing for mock
    };

    const exchangeRate = 190;
    const sourcingTotal = aiProduct.priceKRW + (aiProduct.shippingCNY * exchangeRate);
    const estimatedMargin = order.expectedSettlement - sourcingTotal - 8500; // 8500 = approx shipping + fee
    const marginRate = (estimatedMargin / order.paymentPrice) * 100;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>마진 검토 및 소싱 확정</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border rounded-lg overflow-hidden h-[500px]">
                    {/* Left: Original Order */}
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
                                <span className="text-muted-foreground">판매가</span>
                                <span>{order.paymentPrice.toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between text-red-500">
                                <span>- 수수료</span>
                                <span>-{order.platformFee.toLocaleString()}원</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold">
                                <span>정산예상금액</span>
                                <span className="text-blue-600">{order.expectedSettlement.toLocaleString()}원</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: AI Recommendation */}
                    <div className="bg-blue-50/50 dark:bg-blue-950/20 p-6 space-y-6 overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
                                <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                                AI 추천 소싱 상품
                            </h3>
                            <Button variant="link" size="sm" className="h-auto p-0 text-blue-600">
                                모두 보기 <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded-lg border p-4 shadow-sm space-y-4">
                            <div className="flex gap-4">
                                <div className="relative h-20 w-20 rounded bg-muted flex-shrink-0">
                                    <Image src={aiProduct.thumbnail} alt="Sourcing" fill className="object-cover rounded" />
                                    <Badge className="absolute -top-2 -left-2 bg-pink-500 hover:bg-pink-600">
                                        매칭률 {aiProduct.matchingRate}%
                                    </Badge>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="font-medium text-sm text-blue-900 dark:text-blue-100 line-clamp-2 pr-6">
                                        {aiProduct.name}
                                    </div>
                                    <a href="#" className="flex items-center gap-1 text-xs text-muted-foreground hover:underline">
                                        원문 상품 보기 <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-muted-foreground">옵션 선택</label>
                                    <Select defaultValue="opt1">
                                        <SelectTrigger className="h-8 text-sm">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="opt1">블랙 프레임 / 원형 (추천)</SelectItem>
                                            <SelectItem value="opt2">화이트 프레임 / 원형</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center justify-between bg-muted/30 p-2 rounded">
                                    <span className="text-xs text-muted-foreground">소싱 총비용 (예상)</span>
                                    <span className="font-bold text-sm">{sourcingTotal.toLocaleString()}원</span>
                                </div>
                            </div>
                        </div>

                        {/* Margin Analysis */}
                        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-2 text-green-800 dark:text-green-400 font-semibold text-sm">
                                <TrendingUp className="h-4 w-4" />
                                예상 수익 분석
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">예상 순수익</span>
                                <span className="font-bold text-green-700 dark:text-green-400 text-lg">
                                    +{estimatedMargin.toLocaleString()}원
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-green-700 border-green-300 bg-green-100 dark:bg-green-900">
                                    마진율 {marginRate.toFixed(1)}%
                                </Badge>
                                <span>(배대지 비용 포함 예상)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="py-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>취소</Button>
                    <Button className="pl-4 bg-blue-600 hover:bg-blue-700 text-white transform transition-all active:scale-95">
                        이 상품으로 소싱 진행
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

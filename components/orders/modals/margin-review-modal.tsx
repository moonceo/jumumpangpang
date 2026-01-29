import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
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
import { Input } from "@/components/ui/input";
import { ArrowRight, ExternalLink, Calculator, TrendingUp, Search, Info, ChevronRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Order } from "@/types/order";
import { cn } from "@/lib/utils";

interface Recommendation {
    id: string;
    name: string;
    matchingRate: number;
    priceCNY: number;
    priceKRW: number;
    shippingCNY: number;
    thumbnail: string;
}

interface MarginReviewModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    order: Order | null;
}

import { useState, useMemo } from "react";

export function MarginReviewModal({ open, onOpenChange, order }: MarginReviewModalProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    if (!order) return null;

    // Mock AI recommended products
    const recommendations = [
        {
            id: "1",
            name: "타오바오 동일 상품 - 프리미엄 라운드 블랙",
            matchingRate: 98,
            priceCNY: 298,
            priceKRW: 56620,
            shippingCNY: 0,
            thumbnail: order.product.thumbnail,
        },
        {
            id: "2",
            name: "알리익스프레스 초이스 상품 - 가성비 라인",
            matchingRate: 85,
            priceCNY: 185,
            priceKRW: 35150,
            shippingCNY: 15,
            thumbnail: order.product.thumbnail,
        },
        {
            id: "3",
            name: "1688 대량 도매처 - 원단 보강 버전",
            matchingRate: 72,
            priceCNY: 145,
            priceKRW: 27550,
            shippingCNY: 20,
            thumbnail: order.product.thumbnail,
        }
    ];

    const selectedRecommendation = useMemo(() =>
        recommendations.find(r => r.id === selectedId) || null
        , [selectedId, recommendations]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[1400px] p-0 overflow-hidden border-none shadow-2xl h-[90vh] max-h-[900px] flex flex-col">
                <DialogHeader className="p-6 bg-zinc-900 text-white shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-xl flex items-center gap-2 font-black">
                                <TrendingUp className="h-5 w-5 text-blue-400" />
                                AI 마진 검토 대시보드
                            </DialogTitle>
                            <DialogDescription className="text-zinc-400 text-xs">
                                주문 <span className="font-bold text-white">#{order.marketOrderId}</span> | 리펀디 AI 시스템이 최적의 수익성을 시뮬레이션합니다.
                            </DialogDescription>
                        </div>
                        <Badge className="bg-blue-600 px-3 py-1 text-[10px] font-black italic">Refundy AI Engine v2.0</Badge>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-hidden grid grid-cols-[280px_1fr_340px]">
                    {/* Left: Original Order */}
                    <div className="bg-white border-r border-slate-100 flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-slate-100">
                            <h3 className="text-[12px] font-bold text-slate-800 mb-4 tracking-tight uppercase">주문상품</h3>
                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 space-y-3">
                                <div className="flex gap-3">
                                    <div className="relative h-16 w-16 rounded-lg border border-slate-200 overflow-hidden shadow-sm flex-shrink-0 bg-white">
                                        <Image src={order.product.thumbnail} alt="Product" fill className="object-cover" />
                                        <div className="absolute top-0.5 left-0.5 bg-blue-600/90 text-[7px] text-white px-1 py-0.5 rounded-sm flex items-center gap-0.5">
                                            AI 옵션 이미지
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-[11px] text-slate-800 line-clamp-2 leading-snug">{order.product.name}</h4>
                                        <p className="text-[10px] text-slate-500">옵션: {order.product.optionName}</p>
                                        <div className="text-[10px] text-slate-600">수량: {order.product.quantity}개 <span className="mx-1 text-slate-200">|</span> 단가: {order.paymentPrice.toLocaleString()}원</div>
                                    </div>
                                </div>

                                <div className="space-y-2 text-[11px] pt-2 border-t border-slate-200/50">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500">결제가격</span>
                                        <span className="font-bold text-slate-900">{order.paymentPrice.toLocaleString()}원</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-400">
                                        <span>- 플랫폼 수수료</span>
                                        <span>-{order.platformFee.toLocaleString()}원</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-1 border-t border-slate-200/50 mt-1">
                                        <span className="text-slate-500 font-bold">정산예상금액</span>
                                        <span className="font-bold text-slate-900">{order.expectedSettlement.toLocaleString()}원</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex-1">
                            <h3 className="text-[12px] font-bold text-slate-800 mb-2 tracking-tight">주문 고객 요청사항</h3>
                            <div className="bg-slate-50 rounded p-3 text-xs text-slate-400 italic">
                                {order.recipient.deliveryMemo || "요청사항 없음"}
                            </div>
                        </div>
                    </div>

                    {/* Middle: AI Recommendation List */}
                    <div className="flex flex-col overflow-hidden bg-slate-50/30">
                        <div className="p-4 border-b border-slate-100 bg-white shrink-0 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">AI 추천 소싱 상품</h3>
                            </div>

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                <Input
                                    placeholder="찾는 상품이 없으신가요?"
                                    className="pl-9 h-9 border-slate-200 text-[12px] rounded-lg focus-visible:ring-1 focus-visible:ring-blue-500"
                                />
                                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-slate-400">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-4">
                            {recommendations.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedId(item.id)}
                                    className={cn(
                                        "group border rounded-xl p-0 overflow-hidden cursor-pointer transition-all hover:shadow-md",
                                        selectedId === item.id ? "border-blue-500 ring-1 ring-blue-500 bg-white" : "border-slate-200 bg-white"
                                    )}
                                >
                                    <div className="p-4 flex gap-4">
                                        <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-slate-100 shrink-0">
                                            <Image src={item.thumbnail} alt="Recommend" fill className="object-cover" />
                                            <div className="absolute top-1 right-1">
                                                <Button variant="ghost" size="icon" className="h-5 w-5 rounded-md bg-white/90 text-slate-400 hover:text-blue-500">
                                                    <ExternalLink className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <div className="absolute top-1 left-1">
                                                <Badge className="bg-blue-600 hover:bg-blue-600 rounded-sm text-[8px] h-4 px-1 border-none font-medium">
                                                    AI 매칭 {item.matchingRate}%
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-[12px] text-slate-800 line-clamp-2 leading-tight">
                                                    {item.name}
                                                </h4>
                                                <div className="flex items-center gap-1 bg-purple-50 text-purple-600 px-1 py-0.5 rounded text-[8px] font-bold shrink-0">
                                                    <Search className="h-2.5 w-2.5" />
                                                    직접 등록
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <Select defaultValue="default">
                                                    <SelectTrigger className="h-6 w-[100px] text-[10px] border-slate-200 rounded-md bg-white">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="default">색상: 블루</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="icon" className="h-5 w-5 rounded-sm border-slate-200">-</Button>
                                                    <span className="text-[11px] font-bold w-4 text-center">1</span>
                                                    <Button variant="outline" size="icon" className="h-5 w-5 rounded-sm border-slate-200">+</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50/50 p-3 border-t border-slate-100">
                                        <div className="space-y-1.5 text-[11px]">
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">상품 금액(최대 할인 적용 시)</span>
                                                <span className="font-mono font-bold text-slate-700">¥{item.priceCNY} (₩{item.priceKRW.toLocaleString()})</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">부대 비용 합계 <Info className="h-2.5 w-2.5 inline ml-0.5" /></span>
                                                <span className="font-mono font-bold text-slate-700">₩{(item.shippingCNY * 190).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between pt-1 border-t border-slate-200/50 mt-1">
                                                <span className="text-slate-900 font-bold">소싱 총비용</span>
                                                <span className="font-mono font-black text-slate-900">₩{(item.priceKRW + (item.shippingCNY * 190)).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Selected Detail & Dark Margin Card */}
                    <div className="border-l border-slate-100 flex flex-col bg-white overflow-hidden">
                        <div className="p-4 flex-1 overflow-y-auto space-y-6">
                            <h3 className="text-[12px] font-bold text-slate-800 tracking-tight">선택된 소싱 상품</h3>
                            {selectedId ? (
                                <>
                                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                        <div className="flex gap-3 mb-3">
                                            <div className="relative h-14 w-14 rounded border border-slate-200 overflow-hidden bg-white shrink-0">
                                                <Image src={selectedRecommendation?.thumbnail || order.product.thumbnail} alt="Selected" fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1 justify-end mb-1">
                                                    <div className="bg-blue-100 text-blue-600 px-1 py-0.5 rounded text-[8px] font-bold uppercase">AI 매칭 {selectedRecommendation?.matchingRate}%</div>
                                                    <ExternalLink className="h-2.5 w-2.5 text-slate-300" />
                                                </div>
                                                <h4 className="text-[10px] font-bold text-slate-800 line-clamp-2 leading-tight mb-1">{selectedRecommendation?.name}</h4>
                                                <div className="text-[9px] text-slate-500">
                                                    선택 옵션: {order.product.optionName}<br />
                                                    수량: {order.product.quantity}개
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5 text-[10px] pt-2 border-t border-slate-200/50">
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">상품 금액(중국 현지)</span>
                                                <span className="font-mono text-slate-700">¥{selectedRecommendation?.priceCNY} (₩{selectedRecommendation?.priceKRW.toLocaleString()})</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">통화 환전 수수료</span>
                                                <span className="font-mono text-slate-700">₩{(selectedRecommendation?.shippingCNY || 0 * 190).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between pt-1.5 border-t border-slate-200/50 mt-1">
                                                <span className="font-bold text-slate-900">소싱 총비용</span>
                                                <span className="font-mono font-bold text-slate-900">₩{(selectedRecommendation ? selectedRecommendation.priceKRW + (selectedRecommendation.shippingCNY * 190) : 0).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. Dark Margin Analysis Card */}
                                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 text-white shadow-lg space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">예상 마진율</span>
                                            <Badge className="bg-emerald-500 text-white border-0">수익성 확보</Badge>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-end">
                                                <span className="text-3xl font-black tracking-tight">61.9%</span>
                                                <span className="text-sm font-bold text-emerald-400">+₩{(selectedRecommendation ? order.expectedSettlement - (selectedRecommendation.priceKRW + (selectedRecommendation.shippingCNY * 190)) - 5000 : 0).toLocaleString()}</span>
                                            </div>
                                            <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-emerald-500 h-full w-[61.9%]"></div>
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-slate-700 space-y-2 text-[10px] text-slate-300">
                                            <div className="flex justify-between">
                                                <span>정산예상금액</span>
                                                <span className="font-bold text-white">{order.expectedSettlement.toLocaleString()}원</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>소싱 총비용</span>
                                                <span>-{(selectedRecommendation ? selectedRecommendation.priceKRW + (selectedRecommendation.shippingCNY * 190) : 0).toLocaleString()}원</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>배대지 예상비용</span>
                                                <span>-5,000원</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-lg h-32 flex flex-col items-center justify-center p-4 text-center mt-20">
                                    <p className="text-[11px] text-slate-400">왼쪽 리스트에서 소싱할 상품을 선택해주세요.</p>
                                </div>
                            )}
                        </div>

                        {/* Right Column Footer */}
                        <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/30">
                            <Button className="w-full bg-[#18181b] hover:bg-zinc-800 text-white font-bold h-11 rounded-lg shadow-lg flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                소싱 반영하기
                            </Button>
                            <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full h-10 text-slate-400 font-bold">닫기</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

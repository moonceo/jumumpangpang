"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, FileText, ShoppingBag } from "lucide-react";
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[1400px] h-[90vh] max-h-[900px] p-0 overflow-hidden flex flex-col border-none shadow-2xl transition-all duration-500">
                <DialogHeader className="p-6 bg-zinc-900 text-white shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-xl flex items-center gap-2 font-black">
                                <ShoppingBag className="h-5 w-5 text-blue-400" />
                                AI 소싱 발주 대시보드
                            </DialogTitle>
                            <DialogDescription className="text-zinc-400 text-xs">
                                주문 <span className="font-bold text-white">#{order.marketOrderId}</span> | 리펀디 AI 소싱 엔진이 최적의 공급처를 추천합니다.
                            </DialogDescription>
                        </div>
                        <Badge className="bg-blue-600 px-3 py-1 text-[10px] font-black italic">Refundy AI Engine v2.0</Badge>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-hidden grid grid-cols-[280px_1fr_340px]">
                    {/* PANEL 1: Original Order Summary */}
                    <div className="bg-white border-r border-slate-100 flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-slate-100">
                            <h3 className="text-[12px] font-bold text-slate-800 mb-4 tracking-tight uppercase">주문상품</h3>
                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 space-y-3">
                                <div className="aspect-square relative rounded-xl border overflow-hidden bg-white shadow-sm">
                                    <Image src={order.product.thumbnail} alt="" fill className="object-cover" />
                                    <div className="absolute top-0.5 left-0.5 bg-blue-600/90 text-[7px] text-white px-1 py-0.5 rounded-sm flex items-center gap-0.5">
                                        AI 옵션 이미지
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-[11px] text-slate-800 line-clamp-2 leading-snug">{order.product.name}</h4>
                                    <p className="text-[10px] text-slate-500">옵션: {order.product.optionName}</p>
                                    <div className="text-[10px] text-slate-600">수량: {order.product.quantity}개 <span className="mx-1 text-slate-200">|</span> 단가: {order.paymentPrice.toLocaleString()}원</div>
                                </div>

                                <div className="space-y-2 text-[11px] pt-2 border-t border-slate-200/50">
                                    <div className="flex justify-between items-center text-slate-500">
                                        <span>결제 가격</span>
                                        <span className="font-bold text-slate-900">{order.paymentPrice.toLocaleString()}원</span>
                                    </div>
                                    <div className="p-2 bg-blue-50/50 rounded-lg border border-blue-100/50">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <span className="text-[10px] font-bold text-blue-600">정산 예정</span>
                                            <span className="text-[11px] font-black text-blue-800">{order.expectedSettlement.toLocaleString()}원</span>
                                        </div>
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

                    {/* PANEL 2: AI Recommendations List */}
                    <div className="flex flex-col overflow-hidden bg-slate-50/50">
                        <div className="p-4 border-b border-slate-100 bg-white shrink-0 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[12px] font-bold text-slate-800 tracking-tight">AI 추천 소싱 상품</h3>
                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none text-[10px]">12개 결과</Badge>
                            </div>
                            <div className="p-3 bg-zinc-900 rounded-xl space-y-2 shadow-lg">
                                <h4 className="text-[10px] font-black text-white/50 uppercase tracking-widest">AI 추천 필터</h4>
                                <div className="flex gap-2">
                                    {['최저가 우선', '판매량 우선', '배송 속도 우선'].map((filter, i) => (
                                        <div key={i} className={cn(
                                            "flex-1 flex items-center justify-center px-2 py-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-all",
                                            i === 0 ? "bg-blue-600 border-blue-500 text-white" : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700"
                                        )}>
                                            {filter}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {MOCK_RECOMMENDATIONS.map((item) => (
                                <div key={item.id} className={cn(
                                    "group flex gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer bg-white",
                                    item.id === '1' ? "border-blue-600 shadow-md" : "border-slate-100 hover:border-slate-300"
                                )}>
                                    <div className="relative h-20 w-20 rounded-xl overflow-hidden border bg-slate-50 shrink-0 shadow-sm">
                                        <Image src={item.thumbnail} alt="" fill className="object-cover" />
                                        {item.id === '1' && (
                                            <div className="absolute top-0 left-0 bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-br-lg shadow-md">BEST</div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <p className="text-[12px] font-bold text-slate-900 truncate leading-tight">{item.productName}</p>
                                            <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-slate-200 text-slate-400 bg-white">Taobao</Badge>
                                        </div>
                                        <div className="flex items-end justify-between">
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] text-slate-400 font-bold">소싱 단가</p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-sm font-black text-slate-900">{item.priceKRW.toLocaleString()}원</span>
                                                    <span className="text-[10px] text-slate-400">¥{item.priceCNY}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[9px] text-emerald-600 font-black uppercase tracking-wider">Estimated Profit</p>
                                                <p className="text-sm font-black text-slate-900">+{item.profit.toLocaleString()}원</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PANEL 3: Detail & Profit Comparison */}
                    <div className="flex flex-col bg-white overflow-hidden border-l border-slate-100">
                        <div className="p-4 flex-1 overflow-y-auto space-y-6">
                            <h3 className="text-[12px] font-bold text-slate-800 tracking-tight">최종 소싱 분석</h3>

                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <ShoppingBag className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-tight">Standard Recommendation</p>
                                        <p className="text-[11px] font-black text-slate-900 line-clamp-1">{MOCK_RECOMMENDATIONS[0].productName}</p>
                                    </div>
                                </div>
                                <div className="space-y-2.5 pt-2 border-t border-slate-200/50">
                                    {[
                                        { label: "마켓 정산 예상액", value: order.expectedSettlement, color: "text-slate-900" },
                                        { label: "상품 소싱 매입가", value: -MOCK_RECOMMENDATIONS[0].priceKRW, color: "text-red-500" },
                                        { label: "기타 제반 비용", value: -300, color: "text-red-500" }
                                    ].map((row, i) => (
                                        <div key={i} className="flex justify-between items-center text-[11px] font-bold">
                                            <span className="text-slate-500">{row.label}</span>
                                            <span className={row.color}>{row.value > 0 ? '+' : ''}{row.value.toLocaleString()}원</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Standard Dark Margin Analysis Card */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 text-white shadow-lg space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">예상 마진율</span>
                                    <Badge className="bg-emerald-500 text-white border-0">수익성 확보</Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-3xl font-black tracking-tight">32%</span>
                                        <span className="text-sm font-bold text-emerald-400">+{(order.expectedSettlement - MOCK_RECOMMENDATIONS[0].priceKRW - 300).toLocaleString()}원</span>
                                    </div>
                                    <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-emerald-500 h-full w-[32%]"></div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-700 space-y-2 text-[10px] text-slate-300">
                                    <div className="flex justify-between">
                                        <span>정산액</span>
                                        <span className="font-bold text-white">{order.expectedSettlement.toLocaleString()}원</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>매입가</span>
                                        <span>-{MOCK_RECOMMENDATIONS[0].priceKRW.toLocaleString()}원</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>수수료</span>
                                        <span>-300원</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/30">
                            <Button className="w-full bg-[#18181b] hover:bg-zinc-800 text-white font-black h-12 rounded-xl shadow-lg flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                소싱 발주하기
                            </Button>
                            <Button variant="ghost" className="w-full text-slate-400 font-bold h-10 rounded-xl" onClick={() => onOpenChange(false)}>
                                나중에 하기
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

const MOCK_RECOMMENDATIONS = [
    {
        id: '1',
        productName: '2024년형 울트라 라이프 패딩 자켓',
        thumbnail: 'https://placehold.co/200x200?text=Rec+1',
        priceCNY: 89,
        priceKRW: 16910,
        profit: 32000
    },
    {
        id: '2',
        productName: '프리미엄 헤비웨이트 니트 스웨터',
        thumbnail: 'https://placehold.co/200x200?text=Rec+2',
        priceCNY: 120,
        priceKRW: 22800,
        profit: 26000
    },
    {
        id: '3',
        productName: '에어쿠션 워킹 슈즈 스니커즈',
        thumbnail: 'https://placehold.co/200x200?text=Rec+3',
        priceCNY: 65,
        priceKRW: 12350,
        profit: 36500
    }
];

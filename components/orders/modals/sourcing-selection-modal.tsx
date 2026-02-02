"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Info, ExternalLink, Search, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Order, SourcingHistory } from "@/types/order";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SourcingSelectionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    order: Order | null;
    onComplete?: (order: Order, selectedSourcing: SourcingHistory) => void;
}

// Extended Mock recommended items to match benchmark feeling
const MOCK_RECOMMENDATIONS: SourcingHistory[] = [
    {
        attempt: 1,
        status: 'active',
        productName: "투명 PVC 쇼핑백 / 선물 가방 (방수, 휴대용, 음료 포장)",
        thumbnail: "https://picsum.photos/seed/sourcing1/200/200",
        matchingRate: 79,
        sourcingPriceCNY: 60.69,
        sourcingPriceKRW: 12591,
        sourcingFeeKRW: 35,
        exchangeRatefee: 31,
        link: "https://detail.1688.com/offer/example1",
        optionName: "양면 30데니어 특두께 50개입 (강력 추천) 세로형 높이 15x 너비 13x 옆면 7",
        localShippingFeeCNY: 0,
        hsCode: "392690",
        estimatedWeight: 0.8,
    },
    {
        attempt: 1,
        status: 'active',
        productName: "투명 비닐 쇼핑백 도매 60원/개 PVC 답례품 포장 방수 선물 가방",
        thumbnail: "https://picsum.photos/seed/sourcing2/200/200",
        matchingRate: 78,
        sourcingPriceCNY: 0.61,
        sourcingPriceKRW: 126,
        sourcingFeeKRW: 35,
        exchangeRatefee: 31,
        link: "https://detail.1688.com/offer/example2",
        optionName: "세로형 높이 15 길이 10 측면 폭 7",
        localShippingFeeCNY: 0,
        hsCode: "392690",
        estimatedWeight: 0.5,
    },
    {
        attempt: 2,
        status: 'active',
        productName: "두명 PVC 손잡이 쇼핑백 (빨간색 와인/답례품/사탕 선물 포장용)",
        thumbnail: "https://picsum.photos/seed/sourcing3/200/200",
        matchingRate: 78,
        sourcingPriceCNY: 1.20,
        sourcingPriceKRW: 248,
        sourcingFeeKRW: 35,
        exchangeRatefee: 31,
        link: "https://detail.1688.com/offer/example3",
        optionName: "두명 세로형 높이 15 너비 13 옆 너비 70",
        localShippingFeeCNY: 4.5,
        hsCode: "392690",
        estimatedWeight: 0.6,
    },
    {
        attempt: 3,
        status: 'active',
        productName: "투명 PVC 손잡이 가방 졸업 선물 가방, 인기 만점 노점 음료 포장 가방, 편의...",
        thumbnail: "https://picsum.photos/seed/sourcing4/200/200",
        matchingRate: 78,
        sourcingPriceCNY: 8.97,
        sourcingPriceKRW: 1861,
        sourcingFeeKRW: 35,
        exchangeRatefee: 31,
        link: "https://detail.1688.com/offer/example4",
        optionName: "세로형 길이 13*높이 15*폭 7 10",
        localShippingFeeCNY: 0,
        hsCode: "392690",
        estimatedWeight: 0.7,
    },
    {
        attempt: 4,
        status: 'active',
        productName: "투명 손잡이 쇼핑백 PVC 플라스틱 선물 봉투 (버클/두꺼움/방수)",
        thumbnail: "https://picsum.photos/seed/sourcing5/200/200",
        matchingRate: 78,
        sourcingPriceCNY: 1.20,
        sourcingPriceKRW: 248,
        sourcingFeeKRW: 35,
        exchangeRatefee: 31,
        link: "https://detail.1688.com/offer/example5",
        optionName: "두명 세로형 높이 15 너비 13 옆 너비 70",
        localShippingFeeCNY: 4.5,
        hsCode: "392690",
        estimatedWeight: 0.6,
    },
    {
        attempt: 5,
        status: 'active',
        productName: "투명 PVC 쇼핑백/선물 포장백 (의류, 답례품, 화장품 등)",
        thumbnail: "https://picsum.photos/seed/sourcing6/200/200",
        matchingRate: 77,
        sourcingPriceCNY: 1.20,
        sourcingPriceKRW: 248,
        sourcingFeeKRW: 35,
        exchangeRatefee: 31,
        link: "https://detail.1688.com/offer/example6",
        optionName: "두명 세로형 높이 15 너비 13 옆 너비 70",
        localShippingFeeCNY: 4.5,
        hsCode: "392690",
        estimatedWeight: 0.6,
    }
];

export function SourcingSelectionModal({ open, onOpenChange, order, onComplete }: SourcingSelectionModalProps) {
    const [step, setStep] = useState<1 | 2>(1);
    const [selectedItem, setSelectedItem] = useState<SourcingHistory | null>(null);

    // Default select the 3rd item (index 2) as in the screenshot example if none selected, 
    // but better to let user select.
    // For demo visual parity, let's not auto-select.

    if (!order) return null;

    const handleNext = () => {
        if (selectedItem) setStep(2);
    };

    const handleComplete = () => {
        if (selectedItem && onComplete) {
            onComplete(order, selectedItem);
            onOpenChange(false);
            setStep(1); // Reset
            setSelectedItem(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {/* Use !important classes to force sizing as seen in standard Dialog */}
            <DialogContent className="sm:max-w-[1400px] w-[95vw] h-[90vh] max-h-[900px] p-0 flex flex-col bg-white border-none shadow-2xl overflow-hidden">
                <DialogHeader className="p-6 bg-zinc-900 text-white shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-xl flex items-center gap-2 font-black">
                                <Search className="h-5 w-5 text-blue-400" />
                                AI 소싱 선택 마법사
                            </DialogTitle>
                            <DialogDescription className="text-zinc-400 text-xs">
                                주문 <span className="font-bold text-white">#{order.marketOrderId}</span> | {step === 1 ? "최적의 소싱 상품을 선택해주세요." : "선택한 상품의 마진을 최종 확인하고 메모를 작성하세요."}
                            </DialogDescription>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-xs font-bold bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                <span className={step === 1 ? "text-blue-400" : "text-white/40"}>01 상품 선택</span>
                                <ArrowRight className="h-3 w-3 text-white/20" />
                                <span className={step === 2 ? "text-blue-400" : "text-white/40"}>02 최종 확인</span>
                            </div>
                            <Badge className="bg-blue-600 px-3 py-1 text-[10px] font-black italic">Jumumpangpang AI Engine v2.0</Badge>
                        </div>
                    </div>
                </DialogHeader>

                <div className={cn(
                    "flex-1 overflow-hidden grid transition-all duration-300",
                    step === 1
                        ? (selectedItem ? "grid-cols-[280px_1fr_340px]" : "grid-cols-[280px_1fr]")
                        : "grid-cols-[280px_1fr]"
                )}>
                    {/* LEFT PANEL: Order Summary / Order Summary (Step 2) */}
                    <div className="bg-white border-r border-slate-100 flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/30 shrink-0">
                            <h3 className="text-[12px] font-bold text-slate-800 tracking-tight uppercase">
                                {step === 1 ? "주문상품" : "주문 요약"}
                            </h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {/* Order Product Section */}
                            <section className="space-y-3">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">주문 상품</h4>
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
                            </section>

                            {/* Step 2 Only: Selected Sourcing Product Section */}
                            {step === 2 && selectedItem && (
                                <section className="space-y-3">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">소싱 상품</h4>
                                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 space-y-3">
                                        <div className="aspect-square relative rounded-xl border overflow-hidden bg-white shadow-sm">
                                            <Image src={selectedItem.thumbnail} alt="" fill className="object-cover" />
                                            <div className="absolute top-0.5 left-0.5 bg-emerald-600/90 text-[7px] text-white px-1 py-0.5 rounded-sm">
                                                매칭률 {selectedItem.matchingRate}%
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-[11px] text-slate-800 line-clamp-2 leading-snug">{selectedItem.productName}</h4>
                                            <p className="text-[10px] text-slate-500 line-clamp-1">옵션: {selectedItem.optionName}</p>
                                            <p className="text-[10px] text-slate-600">수량: 1개 <span className="mx-1 text-slate-200">|</span> 단가: ¥{selectedItem.sourcingPriceCNY}</p>
                                        </div>
                                        <div className="pt-2 border-t border-slate-200/50">
                                            <div className="flex justify-between items-center text-[10px]">
                                                <span className="text-slate-500">소싱 총비용</span>
                                                <span className="font-bold text-slate-900">₩{((selectedItem.sourcingPriceKRW * order.product.quantity) + selectedItem.sourcingFeeKRW + selectedItem.exchangeRatefee + 933).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            <div className="p-2">
                                <h3 className="text-[11px] font-bold text-slate-400 mb-2 tracking-tight">주문 고객 요청사항</h3>
                                <div className="bg-slate-50 rounded p-3 text-[10px] text-slate-400 italic">
                                    {order.recipient.deliveryMemo || "요청사항 없음"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE PANEL: Recommendation List (Step 1) OR Final Confirmation (Step 2) */}
                    <div className="flex flex-col overflow-hidden bg-slate-50/50">
                        {step === 1 ? (
                            <>
                                <div className="p-4 border-b border-slate-100 bg-white shrink-0 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[12px] font-bold text-slate-800 tracking-tight">AI 추천 소싱 상품</h3>
                                        <Badge className="bg-emerald-100 text-emerald-700 border-none text-[10px]">12개 결과</Badge>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full text-[10px] h-9 justify-start text-slate-400 bg-white border-slate-200 hover:bg-slate-50 rounded-xl">
                                        <Search className="h-3.5 w-3.5 mr-2 text-slate-400" />
                                        찾는 상품이 없으신가요?
                                    </Button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 content-start">
                                    <div className="grid grid-cols-2 gap-4">
                                        {MOCK_RECOMMENDATIONS.map((item, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setSelectedItem(item)}
                                                className={cn(
                                                    "group border-2 rounded-2xl p-4 overflow-hidden cursor-pointer transition-all hover:shadow-lg bg-white flex flex-col gap-4 relative",
                                                    selectedItem === item ? "border-emerald-500 shadow-md shadow-emerald-50" : "border-slate-100"
                                                )}
                                            >
                                                <div className="flex gap-4">
                                                    <div className="relative h-20 w-20 rounded-xl overflow-hidden border border-slate-100 shrink-0 bg-slate-50 shadow-sm">
                                                        <Image src={item.thumbnail} alt="" fill className="object-cover" />
                                                        {idx === 0 && (
                                                            <div className="absolute top-0 left-0 bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-br-lg shadow-md">BEST</div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 space-y-1.5 min-w-0">
                                                        <div className="flex justify-between items-start">
                                                            <div className="text-blue-600 text-[9px] font-bold uppercase tracking-wider">AI Matching {item.matchingRate}%</div>
                                                            <ExternalLink className="h-2.5 w-2.5 text-slate-300 hover:text-blue-500" />
                                                        </div>
                                                        <h4 className="font-bold text-[12px] text-slate-900 line-clamp-2 leading-tight h-8">{item.productName}</h4>
                                                        <p className="text-[10px] text-slate-400 line-clamp-1">{item.optionName}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center border border-slate-200 rounded-lg px-2 h-7 bg-white shrink-0">
                                                        <span className="text-[9px] text-slate-400 mr-2 font-bold">QTY</span>
                                                        <span className="text-[11px] font-bold text-slate-900">1</span>
                                                        <div className="ml-2 flex flex-col gap-0.5">
                                                            <button className="text-[7px] text-slate-300 hover:text-slate-600 leading-none">▲</button>
                                                            <button className="text-[7px] text-slate-300 hover:text-slate-600 leading-none">▼</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-1.5 pt-3 border-t border-dashed border-slate-100">
                                                    <div className="flex justify-between text-[11px]">
                                                        <span className="text-slate-400">소싱 단가</span>
                                                        <span className="font-bold text-slate-900">₩{item.sourcingPriceKRW.toLocaleString()} <span className="text-slate-400 font-normal">(¥{item.sourcingPriceCNY})</span></span>
                                                    </div>
                                                    <div className="flex justify-between text-[12px] pt-1 mt-1 border-t border-slate-100">
                                                        <span className="font-black text-slate-900">소싱 총비용</span>
                                                        <span className="font-black text-slate-900">₩{((item.sourcingPriceKRW) + (item.sourcingFeeKRW || 35) + (item.exchangeRatefee || 31) + 933).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col bg-white overflow-hidden">
                                <div className="p-4 border-b border-slate-100 bg-slate-50/30 shrink-0">
                                    <h3 className="text-[12px] font-bold text-slate-800 tracking-tight uppercase">최종 확인</h3>
                                </div>
                                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                    {/* Margin Analysis Section */}
                                    <section className="space-y-4 max-w-4xl">
                                        <h4 className="text-[12px] font-bold text-slate-800">마진 분석</h4>
                                        <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                                            <div className="grid grid-cols-[1fr_200px] bg-white text-[13px]">
                                                <div className="p-4 border-r border-slate-100 space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-slate-500">정산예상금액</span>
                                                        <span className="font-bold text-slate-900">₩{order.expectedSettlement.toLocaleString()}</span>
                                                    </div>
                                                    <div className="space-y-1.5 pl-3 border-l-2 border-slate-50">
                                                        <div className="flex justify-between items-center text-slate-400 text-[12px]">
                                                            <span>- 상품 금액 (최대 할인 적용 시)</span>
                                                            <span>-₩{selectedItem ? (selectedItem.sourcingPriceKRW * order.product.quantity).toLocaleString() : "0"}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-slate-400 text-[12px]">
                                                            <span>- 소싱처 이용료</span>
                                                            <span>-₩{selectedItem?.sourcingFeeKRW || 35}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-slate-400 text-[12px]">
                                                            <span>- 통화 환전 수수료</span>
                                                            <span>-₩{selectedItem?.exchangeRatefee || 31}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-slate-400 text-[12px]">
                                                            <span>- 중국내 배송비</span>
                                                            <span>-₩933 (¥4.50)</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-slate-400 text-[12px]">
                                                            <span>- 배송대행지 운임료 (예상)</span>
                                                            <span>-₩{(5000 + Math.max(0, (selectedItem?.estimatedWeight || 0.2) - 0.2) * 5000).toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-6 bg-slate-50/50 flex flex-col justify-center items-end space-y-4">
                                                    <div className="text-right">
                                                        <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">예상 순이익</p>
                                                        <p className="text-2xl font-black text-slate-900">₩1,359</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">마진율</p>
                                                        <p className="text-xl font-black text-blue-600 tracking-tight">17.9%</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Chinese Seller Memo Section */}
                                    <section className="space-y-4 max-w-4xl">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1 rounded bg-slate-100">
                                                <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                                            </div>
                                            <h4 className="text-[13px] font-bold text-slate-700">중국 판매자에게 전달할 요청사항</h4>
                                        </div>
                                        <div className="relative">
                                            <textarea
                                                className="w-full h-32 border border-slate-200 rounded-xl p-4 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 resize-none bg-white transition-all placeholder:text-slate-300"
                                                placeholder="깨끗한 새 제품으로 보내주세요. 꼼꼼한 포장 부탁드립니다."
                                            ></textarea>
                                            <div className="absolute bottom-3 right-4 text-[11px] text-slate-300 font-medium">
                                                0 / 90자
                                            </div>
                                        </div>
                                    </section>

                                    <div className="flex justify-center gap-4 pt-6 max-w-4xl">
                                        <Button variant="outline" onClick={() => setStep(1)} className="w-64 h-12 rounded-lg font-bold text-slate-600 border-slate-200 hover:bg-slate-50">이전</Button>
                                        <Button onClick={handleComplete} className="w-64 h-12 bg-zinc-800 hover:bg-zinc-900 text-white font-bold rounded-lg shadow-lg">
                                            완료
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT PANEL: Selected Detail & Margin Analysis (Step 1 Selected Only) */}
                    {step === 1 && selectedItem && (
                        <div className="border-l border-slate-100 flex flex-col bg-white overflow-hidden">
                            <div className="p-4 border-b border-slate-100 bg-slate-50/30 shrink-0">
                                <h3 className="text-[12px] font-bold text-slate-800 tracking-tight uppercase">선택된 소싱 상품</h3>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                <section className="space-y-4">
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">소싱 상품</h4>
                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-4">
                                        <div className="flex gap-4">
                                            <div className="relative h-20 w-20 rounded-lg border overflow-hidden bg-white shrink-0">
                                                <Image src={selectedItem.thumbnail} alt="" fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0 space-y-1.5">
                                                <div className="flex items-center gap-1 justify-between">
                                                    <span className="text-blue-500 text-[9px] font-bold">AI 매칭률 {selectedItem.matchingRate}%</span>
                                                    <ExternalLink className="h-3 w-3 text-slate-300" />
                                                </div>
                                                <h4 className="text-[11px] font-bold text-slate-900 line-clamp-2 leading-tight">{selectedItem.productName}</h4>
                                                <div className="text-[10px] text-slate-500">
                                                    <span className="block font-bold text-slate-400 mb-0.5">선택 옵션</span>
                                                    {selectedItem.optionName}
                                                    <span className="block mt-1">수량: 1개</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-[11px] pt-3 border-t border-slate-200/60">
                                            <p className="font-bold text-slate-400 text-[10px] mb-1">비용 구성</p>
                                            <div className="flex justify-between items-center text-slate-400">
                                                <span>상품 금액 (최대 할인 적용 시)</span>
                                                <span className="text-slate-900 font-bold">₩{selectedItem.sourcingPriceKRW.toLocaleString()} (¥{selectedItem.sourcingPriceCNY})</span>
                                            </div>
                                            <div className="flex justify-between items-center text-slate-400">
                                                <span className="flex items-center gap-1 cursor-help">소싱처 이용료 <Info className="h-2.5 w-2.5" /></span>
                                                <span className="text-slate-900 font-bold">₩{selectedItem.sourcingFeeKRW || 35}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-slate-400">
                                                <span className="flex items-center gap-1 cursor-help">통화 환전 수수료 <Info className="h-2.5 w-2.5" /></span>
                                                <span className="text-slate-900 font-bold">₩{selectedItem.exchangeRatefee || 31}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-slate-400">
                                                <span>중국내 배송비</span>
                                                <span className="text-slate-900 font-bold">₩933 (¥4.50)</span>
                                            </div>
                                            <Separator className="my-1 bg-slate-200" />
                                            <div className="flex justify-between items-center pt-1">
                                                <span className="font-bold text-slate-900 text-[12px]">소싱 총비용</span>
                                                <span className="font-black text-slate-900 text-[13px]">
                                                    ₩{((selectedItem.sourcingPriceKRW * order.product.quantity) + (selectedItem.sourcingFeeKRW || 35) + (selectedItem.exchangeRatefee || 31) + 933).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">마진 분석</h4>
                                    <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-4 shadow-sm">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[12px] text-slate-500">정산예상금액</span>
                                            <span className="font-bold text-slate-900">₩{order.expectedSettlement.toLocaleString()}</span>
                                        </div>
                                        <Separator className="bg-slate-100" />
                                        <div className="space-y-2 text-[11px]">
                                            <div className="flex justify-between text-slate-400">
                                                <span>- 상품 금액 (최대 할인 적용 시)</span>
                                                <span>-₩{selectedItem.sourcingPriceKRW.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-slate-400">
                                                <span>- 소싱처 이용료</span>
                                                <span>-₩{selectedItem.sourcingFeeKRW || 35}</span>
                                            </div>
                                            <div className="flex justify-between text-slate-400">
                                                <span>- 통화 환전 수수료</span>
                                                <span>-₩{selectedItem.exchangeRatefee || 31}</span>
                                            </div>
                                            <div className="flex justify-between text-slate-400">
                                                <span>- 중국내 배송비</span>
                                                <span>-₩933</span>
                                            </div>
                                            <div className="flex justify-between text-slate-400">
                                                <span>- 배송대행지 운임료 (예상)</span>
                                                <span>-₩{(5000 + Math.max(0, (selectedItem.estimatedWeight || 0.2) - 0.2) * 5000).toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="pt-3 border-t border-slate-100 mt-2 space-y-1">
                                            <div className="flex justify-between items-center text-[13px]">
                                                <span className="font-bold text-slate-800">예상 순이익</span>
                                                <span className="font-black text-slate-900">₩1,359</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[12px]">
                                                <span className="text-slate-500">마진율</span>
                                                <span className="font-bold text-blue-600">17.9%</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="p-4 border-t border-slate-100 bg-white shrink-0">
                                <Button
                                    onClick={handleNext}
                                    className="w-full h-12 bg-zinc-800 hover:bg-zinc-900 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2"
                                >
                                    다음 단계
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

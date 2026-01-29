"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink, CreditCard, RefreshCw, ChevronRight, Info, Check, Smartphone, Box, Power, Flag, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Order } from "@/types/order";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SourcingPaymentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    order: Order | null;
    onComplete?: (order: Order) => void;
    onBack?: () => void; // Callback to go back to sourcing selection
}

export function SourcingPaymentModal({ open, onOpenChange, order, onComplete, onBack }: SourcingPaymentModalProps) {
    const confirmed = order?.sourcingHistory?.find(h => h.status === 'active') || order?.sourcingHistory?.[0];
    const [weight, setWeight] = useState(confirmed?.estimatedWeight?.toString() || "0.10");
    const [isPcccValidating, setIsPcccValidating] = useState(false);
    const [isPcccValidated, setIsPcccValidated] = useState(!!order?.recipient.pccc);

    const handleValidatePccc = () => {
        setIsPcccValidating(true);
        setTimeout(() => {
            setIsPcccValidating(false);
            setIsPcccValidated(true);
            import("sonner").then(({ toast }) => {
                toast.success("통관부호 유효성 검증이 완료되었습니다.");
            });
        }, 1200);
    };

    if (!order) return null;

    if (!confirmed) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[1400px] w-[95vw] h-[85vh] p-0 flex flex-col bg-slate-50 border-none shadow-2xl">
                <DialogHeader className="px-6 py-4 bg-white border-b flex-shrink-0">
                    <div className="flex items-center justify-between w-full">
                        <div className="space-y-1">
                            <DialogTitle className="text-lg font-bold flex items-center gap-2">
                                상품 결제 - 주문 #{order.marketOrderId}
                            </DialogTitle>
                            <p className="text-[11px] text-slate-400">마켓 주문번호: {order.marketOrderId}</p>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex flex-1 overflow-hidden grid grid-cols-[300px_1fr_320px]">
                    {/* Left Panel: Order & Sourcing Summary */}
                    <div className="bg-white border-r border-slate-100 flex flex-col overflow-y-auto p-5 space-y-6">

                        {/* Order Item */}
                        <div className="space-y-3">
                            <h3 className="text-[12px] font-bold text-slate-800">주문 상품</h3>
                            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm space-y-3">
                                <div className="flex gap-3">
                                    <div className="relative h-16 w-16 rounded-lg border border-slate-100 overflow-hidden bg-slate-50 shrink-0">
                                        <Image src={order.product.thumbnail} alt="" fill className="object-cover" />
                                        <div className="absolute top-0.5 left-0.5 bg-blue-500/90 text-[8px] text-white px-1 py-0.5 rounded-sm flex items-center gap-0.5">
                                            AI 옵션 이미지
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-[12px] text-slate-900 line-clamp-2 leading-snug">{order.product.name}</h4>
                                        <p className="text-[11px] text-slate-500 line-clamp-1">옵션: {order.product.optionName}</p>
                                        <div className="text-[11px] text-slate-400">수량: {order.product.quantity}개 <span className="mx-1 text-slate-300">|</span> 단가: {order.product.unitPrice.toLocaleString()}원</div>
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-slate-100 text-[11px] space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">결제가격</span>
                                        <span className="font-medium text-slate-900">{order.paymentPrice.toLocaleString()}원</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">- 플랫폼 수수료</span>
                                        <span className="text-slate-400">-{order.platformFee.toLocaleString()}원</span>
                                    </div>
                                    <div className="flex justify-between pt-1 font-bold">
                                        <span className="text-slate-700">정산예상금액</span>
                                        <span className="text-slate-900">{order.expectedSettlement.toLocaleString()}원</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sourcing Item */}
                        <div className="space-y-3">
                            <h3 className="text-[12px] font-bold text-slate-800">소싱 상품</h3>
                            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm space-y-3 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
                                <div className="flex gap-3 pl-2">
                                    <div className="relative h-16 w-16 rounded-lg border border-slate-100 overflow-hidden bg-slate-50 shrink-0">
                                        <Image src={confirmed.thumbnail} alt="" fill className="object-cover" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none text-[10px] px-1.5 py-0">
                                                결제 대기
                                            </Badge>
                                            <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-none text-[10px] px-1.5 py-0">
                                                AI 매칭률 {confirmed.matchingRate}%
                                            </Badge>
                                        </div>
                                        <h4 className="font-bold text-[12px] text-slate-900 line-clamp-2 leading-snug">{confirmed.productName}</h4>
                                        <p className="text-[11px] text-slate-500 line-clamp-1">옵션: {confirmed.optionName}</p>
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-slate-100 text-[11px] space-y-1 pl-2">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">상품 금액</span>
                                        <span className="font-medium text-slate-900">₩{(confirmed.sourcingPriceKRW * order.product.quantity).toLocaleString()} (¥{confirmed.sourcingPriceCNY})</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">소싱처 이용료</span>
                                        <span className="font-medium text-slate-900">₩{confirmed.sourcingFeeKRW}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">통화 환전 수수료</span>
                                        <span className="font-medium text-slate-900">₩{confirmed.exchangeRatefee}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">중국내 배송비</span>
                                        <span className="font-medium text-slate-900">₩{Math.round((confirmed.localShippingFeeCNY || 0) * 190.4).toLocaleString()} (¥{confirmed.localShippingFeeCNY || 0})</span>
                                    </div>
                                    <div className="flex justify-between pt-1 font-bold">
                                        <span className="text-slate-700">소싱 총비용</span>
                                        <span className="text-slate-900">₩{((confirmed.sourcingPriceKRW * order.product.quantity) + (confirmed.sourcingFeeKRW || 0) + (confirmed.exchangeRatefee || 0) + Math.round((confirmed.localShippingFeeCNY || 0) * 190.4)).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Middle Panel: Payment Info & Settings */}
                    <div className="flex flex-col bg-white overflow-y-auto w-full">
                        <div className="p-4 border-b border-slate-100 sticky top-0 bg-white z-10 shrink-0">
                            <h3 className="text-[13px] font-bold text-slate-800">결제 정보</h3>
                        </div>

                        <div className="p-6 space-y-10">
                            {/* Weight Estimation */}
                            <section className="space-y-3">
                                <Label className="text-[12px] font-bold text-slate-800">배송비 계산용 예상치</Label>
                                <div className="space-y-1">
                                    <div className="text-[11px] text-slate-500 mb-1 font-bold">무게 (kg) <span className="text-red-500">*</span></div>
                                    <Input
                                        type="number"
                                        value={weight}
                                        onChange={e => setWeight(e.target.value)}
                                        className="h-10 border-slate-200 bg-white text-sm"
                                    />
                                    <p className="text-[10px] text-slate-400">예상 무게: {weight} kg</p>
                                </div>
                            </section>

                            {/* Delivery Order Info */}
                            <section className="space-y-4">
                                <h3 className="text-[12px] font-bold text-slate-800">배송대행지 주문서</h3>

                                <div className="space-y-4">
                                    {/* Shipping Method */}
                                    <div className="space-y-2">
                                        <Label className="text-[11px] font-bold text-slate-600">배송 방법</Label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="border border-slate-200 rounded-lg p-3 hover:border-slate-400 cursor-pointer bg-white transition-all">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-3 h-3 rounded-full border border-slate-300"></div>
                                                    <span className="text-[11px] font-bold text-slate-700">항공</span>
                                                </div>
                                            </div>
                                            <div className="border border-slate-200 rounded-lg p-3 hover:border-slate-400 cursor-pointer bg-white transition-all">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-3 h-3 rounded-full border border-slate-300"></div>
                                                    <span className="text-[11px] font-bold text-slate-700">해운 (인천)</span>
                                                </div>
                                            </div>
                                            <div className="border-2 border-emerald-500 rounded-lg p-3 cursor-pointer bg-emerald-50/10 relative overflow-hidden transition-all shadow-sm">
                                                <div className="absolute top-0 right-0 bg-black text-white text-[9px] px-2 py-0.5 rounded-bl-lg font-bold flex items-center gap-1">
                                                    ✨ AI 추천
                                                </div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-3 h-3 rounded-full border-[3px] border-emerald-500"></div>
                                                    <span className="text-[11px] font-bold text-emerald-900">해운 (평택)</span>
                                                </div>
                                                <div className="flex items-start gap-1.5 pl-5">
                                                    <div className="mt-0.5 text-yellow-500">💡</div>
                                                    <p className="text-[10px] text-slate-500 leading-snug break-keep">일반 공산품이라 해운이 더 안전해요</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Customs Info */}
                                        <div className="space-y-4 pt-4 border-t border-dashed border-slate-200">
                                            <Label className="text-[11px] font-bold text-slate-600">통관 정보</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <Label className="text-[10px] text-slate-500">상품 금액 (CNY)</Label>
                                                    <Input type="number" defaultValue="1.18" className="h-9 text-xs" />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-[10px] text-slate-500">중국 내 배송비 (CNY)</Label>
                                                    <Input type="number" defaultValue="4.50" className="h-9 text-xs" />
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-slate-400 text-right">합계 (1개): 5.68 CNY · 약 1,178원</p>

                                            <div className="space-y-1">
                                                <Label className="text-[11px] font-bold text-slate-600 flex gap-1">HS Code <span className="text-red-500">*</span></Label>
                                                <div className="relative">
                                                    <Input defaultValue={confirmed.hsCode || "상품 카테고리"} className="h-9 text-xs pr-12" />
                                                    <Badge variant="secondary" className="absolute right-1.5 top-1.5 text-[10px] h-6 bg-slate-100 text-slate-600">추천</Badge>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-[10px] text-slate-500 font-bold">통관 방식</Label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="border-2 border-emerald-500 rounded-lg p-3 cursor-pointer bg-emerald-50/10 relative overflow-hidden transition-all shadow-sm">
                                                        <div className="absolute top-0 right-0 bg-black text-white text-[9px] px-2 py-0.5 rounded-bl-lg font-bold flex items-center gap-1">
                                                            ✨ AI 추천
                                                        </div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="w-3 h-3 rounded-full border-[3px] border-emerald-500"></div>
                                                            <span className="text-[11px] font-bold text-emerald-900">목록통관</span>
                                                        </div>
                                                        <div className="flex items-start gap-1.5 pl-5">
                                                            <div className="mt-0.5 text-yellow-500">💡</div>
                                                            <p className="text-[10px] text-slate-500 leading-snug break-keep">일반 잡화류라 목록통관이 가능해요</p>
                                                        </div>
                                                    </div>
                                                    <div className="border border-slate-200 rounded-lg p-3 hover:border-slate-400 cursor-pointer bg-white transition-all flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-3 h-3 rounded-full border border-slate-300"></div>
                                                            <span className="text-[11px] font-bold text-slate-700">간이통관</span>
                                                        </div>
                                                        <span className="text-[10px] text-slate-400">+3,000원</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            {/* Add-on Services */}
                            <section className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <Label className="text-[12px] font-bold text-slate-800">부가 서비스</Label>
                                    <ChevronRight className="h-4 w-4 text-slate-400" />
                                </div>
                                <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-lg text-[11px] font-bold flex items-center justify-between cursor-pointer hover:bg-emerald-100 transition-colors">
                                    무료 기본 서비스 안내
                                    <ChevronRight className="h-3 w-3" />
                                </div>

                                <div className="space-y-6">
                                    {/* Inspection */}
                                    <div>
                                        <div className="text-[11px] font-bold text-slate-500 mb-2">검수</div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="border border-slate-200 rounded-lg p-3 flex justify-between items-start hover:border-slate-400 cursor-pointer bg-white shadow-sm transition-all">
                                                <div className="flex items-center gap-2">
                                                    <Checkbox id="chk-inspect" className="rounded-sm" />
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="chk-inspect" className="text-xs font-bold text-slate-700 cursor-pointer">정밀검수</Label>
                                                        <Info className="h-3 w-3 text-slate-300" />
                                                    </div>
                                                </div>
                                                <span className="text-[11px] font-bold text-slate-600">+2,000원</span>
                                            </div>
                                            <div className="border border-slate-200 rounded-lg p-3 flex justify-between items-start hover:border-slate-400 cursor-pointer bg-white shadow-sm transition-all">
                                                <div className="flex items-center gap-2">
                                                    <Checkbox id="chk-op-inspect" className="rounded-sm" />
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="chk-op-inspect" className="text-xs font-bold text-slate-700 cursor-pointer">작동검수</Label>
                                                        <Info className="h-3 w-3 text-slate-300" />
                                                    </div>
                                                </div>
                                                <span className="text-[11px] font-bold text-slate-600">+3,000원</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Packaging */}
                                    <div>
                                        <div className="text-[11px] font-bold text-slate-500 mb-2">포장</div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="border-2 border-emerald-500 rounded-lg p-3 flex justify-between items-start bg-emerald-50/20 cursor-pointer shadow-sm relative overflow-hidden transition-all">
                                                <div className="absolute top-0 right-0 bg-black text-white text-[9px] px-2 py-0.5 rounded-bl-lg font-bold flex items-center gap-1">
                                                    ✨ AI 추천
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-emerald-500 p-0.5 rounded shadow-sm"><Check className="h-3 w-3 text-white" /></div>
                                                    <div className="space-y-0.5">
                                                        <span className="text-xs font-bold text-emerald-900 block">추천포장</span>
                                                        <Info className="h-3 w-3 text-emerald-300" />
                                                        <span className="text-[10px] text-slate-400 block mt-1">변동</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border border-slate-200 rounded-lg p-3 flex justify-between items-start hover:border-slate-400 cursor-pointer bg-white shadow-sm transition-all">
                                                <div className="flex items-center gap-2">
                                                    <Checkbox id="chk-packaging" className="rounded-sm" />
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="chk-packaging" className="text-xs font-bold text-slate-700 cursor-pointer">포장 선택하기</Label>
                                                        <span className="text-[10px] text-slate-400 block">변동</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Etc */}
                                    <div>
                                        <div className="text-[11px] font-bold text-slate-500 mb-2">기타</div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="border border-slate-200 rounded-lg p-3 flex justify-between items-start hover:border-slate-400 cursor-pointer bg-white shadow-sm transition-all">
                                                <div className="flex items-center gap-2">
                                                    <Checkbox id="chk-power" className="rounded-sm" />
                                                    <Label htmlFor="chk-power" className="text-xs font-bold text-slate-700 cursor-pointer">콘센트</Label>
                                                </div>
                                                <span className="text-[10px] text-slate-400">변동</span>
                                            </div>
                                            <div className="border border-slate-200 rounded-lg p-3 flex justify-between items-start hover:border-slate-400 cursor-pointer bg-white shadow-sm transition-all">
                                                <div className="flex items-center gap-2">
                                                    <Checkbox id="chk-origin" className="rounded-sm" />
                                                    <Label htmlFor="chk-origin" className="text-xs font-bold text-slate-700 cursor-pointer">원산지 표기</Label>
                                                </div>
                                                <span className="text-[11px] font-bold text-slate-600">+100원 ~ 변동</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Release/Transport Services */}
                                    <div>
                                        <div className="text-[11px] font-bold text-slate-500 mb-2">출고·운송 서비스</div>
                                        <div className="space-y-2">
                                            <div className="border border-slate-200 rounded-lg p-3 hover:border-slate-400 cursor-pointer bg-white shadow-sm transition-all">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Checkbox id="chk-duty" className="rounded-sm" />
                                                    <Label htmlFor="chk-duty" className="text-xs font-bold text-slate-700 cursor-pointer">관부가세 대납</Label>
                                                </div>
                                                <p className="text-[10px] text-slate-400 pl-6">※ 관부가세 확정 단계에서 대 납자에게 관부가세 납부 안내 후 통관 진행</p>
                                            </div>
                                            <div className="border border-slate-200 rounded-lg p-3 hover:border-slate-400 cursor-pointer bg-white shadow-sm transition-all">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Checkbox id="chk-kd" className="rounded-sm" />
                                                    <Label htmlFor="chk-kd" className="text-xs font-bold text-slate-700 cursor-pointer">경동택배 선불</Label>
                                                </div>
                                                <p className="text-[10px] text-slate-400 pl-6">※ 국내 배송을 경동택배 선불로 진행합니다</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            {/* Recipient Info (Expanded) */}
                            <section className="space-y-4">
                                <Label className="text-[12px] font-bold text-slate-800">수령인 정보 <span className="text-red-500">*</span></Label>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <Label className="text-[11px] font-bold text-slate-600">이름 <span className="text-red-500">*</span></Label>
                                        <Input defaultValue={order.recipient.name} className="h-10 text-xs bg-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[11px] font-bold text-slate-600">연락처 <span className="text-red-500">*</span></Label>
                                        <Input defaultValue={order.recipient.phone} className="h-10 text-xs bg-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[11px] font-bold text-slate-600">주소</Label>
                                        <Input defaultValue={order.recipient.address} className="h-10 text-xs bg-white mb-2" />
                                        <Input placeholder="상세주소" defaultValue="성지아파트 2동 1005호" className="h-10 text-xs bg-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <Input defaultValue="08634" className="h-10 text-xs bg-white w-32" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[11px] font-bold text-slate-600">국내 배송 요청 사항</Label>
                                        <textarea
                                            className="w-full h-16 border border-slate-200 rounded-md p-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white"
                                            placeholder="배송 요청 사항을 입력해주세요"
                                        ></textarea>
                                    </div>

                                    <div className="space-y-2 pt-2">
                                        <Label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">개인통관고유부호</Label>
                                        <div className="flex gap-2">
                                            <Input defaultValue={order.recipient.pccc} className="h-10 text-xs bg-white flex-1 font-mono" />
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "h-10 text-xs font-bold px-3 transition-all",
                                                    isPcccValidated ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-blue-600 border-blue-200 bg-blue-50"
                                                )}
                                                onClick={handleValidatePccc}
                                                disabled={isPcccValidating}
                                            >
                                                {isPcccValidating ? (
                                                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                                ) : isPcccValidated ? (
                                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                                ) : null}
                                                {isPcccValidating ? "검증중..." : isPcccValidated ? "통관부호 확인됨" : "통관부호 확인"}
                                            </Button>
                                        </div>
                                        <p className="text-[10px] text-slate-400">통관부호가 없으면 배송이 지연될 수 있습니다</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Right Panel: Preview & Pay */}
                    <div className="bg-white border-l border-slate-100 flex flex-col">
                        <div className="p-4 border-b border-slate-100 sticky top-0 bg-white z-10">
                            <h3 className="text-[13px] font-bold text-slate-800">미리보기</h3>
                        </div>
                        <div className="p-5 flex-1 overflow-y-auto space-y-6">

                            {/* Payment Card Preview */}
                            <div className="space-y-2">
                                <div className="border border-slate-200 rounded-xl p-4 shadow-sm bg-white space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                                            <CreditCard className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="text-[12px] font-bold text-slate-800">결제 카드</div>
                                            <div className="text-[11px] text-slate-500">[비자] 6832</div>
                                        </div>
                                    </div>
                                    <div className="pl-12 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                                            <span className="text-[11px] text-slate-400">카드 결제</span>
                                            <span className="text-[10px] text-slate-300">카드 결제를 준비 중입니다.</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                                            <span className="text-[11px] text-slate-400">상품 구매</span>
                                            <span className="text-[10px] text-slate-300">물건이 업체에 준비 중입니다.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Cost */}
                            <div className="space-y-2 text-[12px]">
                                <h4 className="font-bold text-slate-800">예상 배송대행지 비용</h4>
                                <div className="flex justify-between text-slate-600">
                                    <span>기본 비용 ({weight} kg)</span>
                                    <span>{(5000 + Math.max(0, parseFloat(weight) - 0.1) * 2000).toLocaleString()} 원</span>
                                </div>
                                <Separator className="bg-slate-200" />
                                <div className="flex justify-between font-bold text-slate-900 pt-1">
                                    <span>총 예상 비용</span>
                                    <span>{(5000 + Math.max(0, parseFloat(weight) - 0.1) * 2000).toLocaleString()} 원</span>
                                </div>
                            </div>

                            {/* Margin Analysis */}
                            <div className="space-y-3 pt-4 border-t border-slate-100">
                                <h4 className="text-[12px] font-bold text-slate-800">마진 분석</h4>
                                <div className="text-[11px] space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">정산예상금액</span>
                                        <span className="font-bold text-slate-900">₩{order.expectedSettlement.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-red-500">
                                        <span>- 상품 금액</span>
                                        <span>-₩{Math.round(confirmed.sourcingPriceKRW * order.product.quantity).toLocaleString()} (¥{confirmed.sourcingPriceCNY})</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>- 소싱처 이용료</span>
                                        <span>-₩{confirmed.sourcingFeeKRW || 35}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>- 통화 환전 수수료</span>
                                        <span>-₩{confirmed.exchangeRatefee || 31}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>- 중국내 배송비</span>
                                        <span>-₩{Math.round((confirmed.localShippingFeeCNY || 0) * 190.4).toLocaleString()} (¥{confirmed.localShippingFeeCNY || 0})</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>- 배송대행지 운임료 (예상)</span>
                                        <span>-₩{(5000 + Math.max(0, parseFloat(weight) - 0.1) * 2000).toLocaleString()}</span>
                                    </div>
                                </div>
                                <Separator className="bg-slate-200" />
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-[11px] font-bold text-slate-800">예상 순이익</div>
                                        <div className="text-[10px] text-slate-400">마진율</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[14px] font-bold text-slate-900">
                                            ₩{(order.expectedSettlement - (confirmed.sourcingPriceKRW * order.product.quantity) - (confirmed.sourcingFeeKRW || 35) - (confirmed.exchangeRatefee || 31) - Math.round((confirmed.localShippingFeeCNY || 0) * 190.4) - (5000 + Math.max(0, parseFloat(weight) - 0.1) * 2000)).toLocaleString()}
                                        </div>
                                        <div className="text-[12px] font-bold text-slate-900">
                                            {(((order.expectedSettlement - (confirmed.sourcingPriceKRW * order.product.quantity) - (confirmed.sourcingFeeKRW || 35) - (confirmed.exchangeRatefee || 31) - Math.round((confirmed.localShippingFeeCNY || 0) * 190.4) - (5000 + Math.max(0, parseFloat(weight) - 0.1) * 2000)) / order.paymentPrice) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="p-4 border-t border-slate-100 space-y-4 bg-white mt-auto">
                            <Button
                                className="w-full h-11 text-sm font-bold bg-[#18181b] hover:bg-zinc-800 text-white rounded-md shadow-lg"
                                onClick={() => {
                                    onComplete?.(order);
                                    onOpenChange(false);
                                }}
                            >
                                결제하기
                            </Button>

                            <Button
                                variant="ghost"
                                className="w-full h-8 text-[11px] font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                                onClick={() => {
                                    onOpenChange(false);
                                    onBack?.();
                                }}
                            >
                                다른 소싱 상품 선택하기
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    );
}

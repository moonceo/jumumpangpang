import { ORDER_STATUSES } from "@/lib/constants/orders";
import { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
    Pencil,
    ExternalLink,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Save,
    X,
    Copy,
    StickyNote,
    CheckCircle2,
    RefreshCw,
    History,
    CreditCard,
    Search,
    Truck
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExpandableRowContentProps {
    order: Order;
    onTrackingClick?: (order: Order) => void;
    onWarehouseClick?: (order: Order) => void;
    onSourcingClick?: (order: Order) => void;
    onHistoryClick?: (order: Order) => void;
    onSourcingManagementClick?: (order: Order) => void;
    onPCCClick?: (order: Order) => void;
    onMemoSave?: (order: Order, memo: string) => void;
    onDomesticTrackingClick?: (order: Order) => void;
    onAddSourcingClick?: (order: Order) => void;
    onPayShippingClick?: (order: Order) => void;
    viewMode?: 'NEW' | 'WAITING' | 'SHIPPING' | 'CLAIMS' | 'ALL';
}

export function ExpandableRowContent({
    order,
    onTrackingClick,
    onWarehouseClick,
    onSourcingClick,
    onHistoryClick,
    onSourcingManagementClick,
    onPCCClick,
    onMemoSave,
    onDomesticTrackingClick,
    onAddSourcingClick,
    onPayShippingClick,
    viewMode
}: ExpandableRowContentProps) {
    const [memo, setMemo] = useState(order.internalMemo || "");
    const [isEditingRecipient, setIsEditingRecipient] = useState(false);
    const [recipientData, setRecipientData] = useState(order.recipient);

    const handleSaveMemo = () => {
        onMemoSave?.(order, memo);
        import("sonner").then(({ toast }) => {
            toast.success("메모가 저장되었습니다.");
        });
    };

    const handleSaveRecipient = () => {
        setIsEditingRecipient(false);
        import("sonner").then(({ toast }) => {
            toast.success("수령인 정보가 수정되었습니다.");
        });
    };

    return (
        <div className="p-0 bg-white dark:bg-zinc-950 border-t overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12">
                {/* 1. 좌측: 정보 영역 (col-span-3) */}
                <div className="md:col-span-3 p-6 space-y-6 border-r border-dashed border-gray-100 dark:border-zinc-800">
                    <div className="space-y-4">
                        <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-tight">정보</h4>
                        <div className="space-y-4">
                            <div>
                                <h5 className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2">주문자</h5>
                                <div className="text-xs space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500 w-12">성함</span>
                                        <span className="font-medium">{order.buyerName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500 w-12">연락처</span>
                                        <span className="font-medium font-mono">{order.buyerPhone}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h5 className="text-xs font-semibold text-slate-900 dark:text-slate-100 italic">수령인 정보</h5>
                                    {!isEditingRecipient ? (
                                        <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400" onClick={() => setIsEditingRecipient(true)}>
                                            <Pencil className="h-3 w-3" />
                                        </Button>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="icon" className="h-5 w-5 text-green-500" onClick={handleSaveRecipient}>
                                                <Save className="h-3 w-3" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-5 w-5 text-red-400" onClick={() => setIsEditingRecipient(false)}>
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className="text-xs space-y-3">
                                    <div className="flex items-start gap-2">
                                        <span className="text-slate-500 w-12 shrink-0">수령인</span>
                                        {isEditingRecipient ? (
                                            <Input
                                                className="h-7 text-xs py-1"
                                                value={recipientData.name}
                                                onChange={(e) => setRecipientData({ ...recipientData, name: e.target.value })}
                                            />
                                        ) : (
                                            <span className="font-medium italic">{order.recipient.name}</span>
                                        )}
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-slate-500 w-12 shrink-0">연락처</span>
                                        {isEditingRecipient ? (
                                            <Input
                                                className="h-7 text-xs py-1 font-mono"
                                                value={recipientData.phone}
                                                onChange={(e) => setRecipientData({ ...recipientData, phone: e.target.value })}
                                            />
                                        ) : (
                                            <span className="font-medium font-mono italic">{order.recipient.phone}</span>
                                        )}
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-slate-500 w-12 shrink-0">주소</span>
                                        {isEditingRecipient ? (
                                            <div className="flex-1 space-y-1">
                                                <Input
                                                    className="h-7 text-xs py-1"
                                                    value={recipientData.zipCode}
                                                    onChange={(e) => setRecipientData({ ...recipientData, zipCode: e.target.value })}
                                                    placeholder="우편번호"
                                                />
                                                <Input
                                                    className="h-7 text-xs py-1"
                                                    value={recipientData.address}
                                                    onChange={(e) => setRecipientData({ ...recipientData, address: e.target.value })}
                                                    placeholder="기본주소"
                                                />
                                                <Input
                                                    className="h-7 text-xs py-1"
                                                    value={recipientData.detailAddress}
                                                    onChange={(e) => setRecipientData({ ...recipientData, detailAddress: e.target.value })}
                                                    placeholder="상세주소"
                                                />
                                            </div>
                                        ) : (
                                            <div className="font-medium text-slate-700 dark:text-slate-300">
                                                ({order.recipient.zipCode}) {order.recipient.address} {order.recipient.detailAddress}
                                                <div className="mt-1 text-[11px] text-slate-400 font-normal">우리집</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-start gap-2 pt-1">
                                        {isEditingRecipient ? (
                                            <Input
                                                className="h-7 text-xs py-1 italic"
                                                value={recipientData.deliveryMemo || ""}
                                                onChange={(e) => setRecipientData({ ...recipientData, deliveryMemo: e.target.value })}
                                                placeholder="배송 메시지"
                                            />
                                        ) : (
                                            <span className="text-slate-400 italic">"{order.recipient.deliveryMemo || "메시지가 없습니다."}"</span>
                                        )}
                                    </div>

                                    <div
                                        className="pt-2 cursor-pointer group/pccc"
                                        onClick={() => onPCCClick?.(order)}
                                    >
                                        <div className="flex items-center gap-2">
                                            {isEditingRecipient ? (
                                                <Input
                                                    className="h-7 text-xs py-1 font-mono text-blue-600"
                                                    value={recipientData.pccc || ""}
                                                    onChange={(e) => setRecipientData({ ...recipientData, pccc: e.target.value })}
                                                    placeholder="개인통관고유부호 (P...)"
                                                />
                                            ) : (
                                                <>
                                                    <span className="font-mono text-slate-500 group-hover/pccc:text-slate-900 transition-colors">{order.recipient.pccc || 'P000000000000'}</span>
                                                    {!order.recipient.pccc ? (
                                                        <div className="flex items-center gap-1 bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full text-[10px] border border-red-100 font-medium group-hover/pccc:bg-red-100 transition-colors">
                                                            <AlertCircle className="h-3 w-3" />
                                                            <span>확인필요</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-1 bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full text-[10px] border border-green-100 font-medium group-hover/pccc:bg-green-100 transition-colors">
                                                            <CheckCircle2 className="h-3 w-3 fill-green-600 text-white" />
                                                            <span>확인완료</span>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* [NEW] 국내 배송 출발 (송장 정보) - SHIPPING 모드 && 송장 존재 시 노출 */}
                        {viewMode === 'SHIPPING' && order.domesticTracking && (
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Truck className="h-4 w-4 text-slate-900" />
                                        <h5 className="text-[13px] font-bold text-slate-900 leading-none">국내 배송 출발</h5>
                                    </div>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-md p-3 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[12px] font-bold text-slate-600">{order.domesticTracking.carrier}</span>
                                            <span className="text-[14px] font-bold text-slate-900 font-mono tracking-wide">{order.domesticTracking.trackingNumber}</span>
                                        </div>
                                        <Copy className="h-3 w-3 text-slate-300 cursor-pointer hover:text-slate-500" />
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="default"
                                        className="w-full h-8 text-[11px] font-bold bg-[#18181b] hover:bg-zinc-800 text-white"
                                        onClick={() => onDomesticTrackingClick?.(order)}
                                    >
                                        국내 송장 확인
                                    </Button>
                                    <p className="text-[10px] text-zinc-400 text-center">국내 배송이 출발되었습니다. 마켓에 송장을 등록해주세요.<br />마지막 확인: 2024.03.22 14:00</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:col-span-5 p-6 space-y-6 border-r border-dashed border-gray-100 dark:border-zinc-800 bg-slate-50/30">
                    <div className="space-y-4">
                        <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-tight">상세 내역</h4>

                        <div className="space-y-6">
                            {/* 2.1 주문 상품 섹션 */}
                            <div className="space-y-3">
                                <h5 className="text-[11px] font-bold text-slate-400">주문 상품</h5>
                                <div className="flex gap-4">
                                    <div className="relative h-16 w-16 flex-shrink-0 rounded bg-white border border-gray-100 overflow-hidden">
                                        <Image src={order.product.thumbnail} alt="" fill className="object-cover" />
                                        {order.product.isAiOption && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-blue-600/90 text-[8px] text-white text-center py-0.5 leading-none">
                                                AI 옵션 이미지
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h5 className="text-[13px] font-semibold leading-snug line-clamp-2">
                                            {order.product.name}
                                            <ExternalLink className="h-3 w-3 inline-block ml-1 text-slate-300" />
                                        </h5>
                                        <div className="text-[11px] text-slate-400">
                                            옵션: {order.product.optionName}
                                        </div>
                                        <div className="text-[11px] text-slate-500">
                                            수량: {order.product.quantity}개 | 단가: {order.product.unitPrice.toLocaleString()}원
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2 border-t border-dashed border-gray-200">
                                    <div className="flex justify-between text-xs items-center">
                                        <span className="text-slate-500">결제가격</span>
                                        <span className="font-bold">{order.paymentPrice.toLocaleString()}원</span>
                                    </div>
                                    <div className="flex justify-between text-xs items-center text-slate-400">
                                        <span>- 플랫폼 수수료</span>
                                        <span>-{order.platformFee.toLocaleString()}원</span>
                                    </div>
                                    <div className="flex justify-between text-sm items-center pt-1">
                                        <span className="font-semibold text-slate-900">정산예정금액</span>
                                        <span className="font-bold text-slate-900">{order.expectedSettlement.toLocaleString()}원</span>
                                    </div>
                                </div>
                            </div>

                            {/* 2.2 하위 섹션: 소싱 상품/이력 (Condition-based) */}
                            {viewMode === 'SHIPPING' ? (
                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center justify-between">
                                        <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                            <History className="h-3 w-3" />
                                            이전 소싱 이력
                                        </h5>
                                        <Badge variant="outline" className="text-[9px] h-4 px-1.5 font-bold border-slate-200 text-slate-400">총 {order.sourcingHistory?.length || 0}건</Badge>
                                    </div>

                                    <div className="space-y-3">
                                        {order.sourcingHistory?.map((item) => (
                                            <div key={item.attempt} className="bg-white border-2 border-slate-100 rounded-xl p-3 relative hover:border-slate-300 transition-all group">
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-[10px] font-black text-slate-400">소싱 주문 #{item.attempt}</span>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-[9px] font-bold text-slate-400">마지막 처리 - 2024. 01. 21. 18:22</span>
                                                        <Badge className={cn(
                                                            "text-[9px] h-4 px-1.5 border-none",
                                                            item.status === 'active' ? "bg-green-100 text-green-700" :
                                                                item.status === 'refunded' ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-500"
                                                        )}>
                                                            {item.status === 'active' ? '결제완료' : item.status === 'refunded' ? '환불됨' : '취소됨'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <div className="relative h-12 w-12 rounded-lg border overflow-hidden shrink-0 bg-slate-50">
                                                        <Image src={item.thumbnail} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                                                    </div>
                                                    <div className="flex-1 min-w-0 space-y-1">
                                                        <div className="flex justify-between items-start gap-2">
                                                            <p className="text-[11px] font-bold text-slate-800 line-clamp-1 flex-1">{item.productName}</p>
                                                            <span className="text-[10px] font-black text-blue-600 italic shrink-0">AI 매칭 {item.matchingRate}%</span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-400 truncate">선택 옵션: {item.optionName}</p>
                                                        <div className="flex justify-between items-end pt-1">
                                                            <div className="text-[10px] space-y-0.5">
                                                                <div className="text-slate-500">상품 금액: <span className="font-bold">₩{item.sourcingPriceKRW.toLocaleString()} (¥{item.sourcingPriceCNY})</span></div>
                                                                <div className="text-slate-500">총 소싱 비용: <span className="font-black text-slate-900">₩{(item.sourcingPriceKRW + item.sourcingFeeKRW + item.exchangeRatefee).toLocaleString()}</span></div>
                                                            </div>
                                                            <Button variant="ghost" className="h-6 px-2 text-[10px] font-black text-blue-600 hover:bg-blue-50">상세보기</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : viewMode === 'WAITING' && order.sourcingHistory && order.sourcingHistory.length > 0 ? (
                                <>
                                    {/* (Existing confirmed sourcing UI block ...) */}
                                    {(() => {
                                        const confirmed = order.sourcingHistory.find(h => h.status === 'active') || order.sourcingHistory[0];
                                        return (
                                            <div className="space-y-4">
                                                {/* Sourcing details implementation from previous step... */}
                                                <div className="bg-white border rounded-lg overflow-hidden p-3 shadow-sm">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200 text-[10px] h-5 px-1.5">결제 대기</Badge>
                                                            <span className="text-[11px] font-bold text-blue-600 italic">AI 매칭 {confirmed.matchingRate}%</span>
                                                        </div>
                                                        <ExternalLink className="h-3 w-3 text-slate-300" />
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <div className="relative h-14 w-14 rounded border border-gray-100 overflow-hidden flex-shrink-0">
                                                            <Image src={confirmed.thumbnail} alt="" fill className="object-cover" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-[11px] font-medium text-slate-700 line-clamp-2 leading-tight mb-1">
                                                                {confirmed.productName}
                                                            </div>
                                                            <div className="text-[10px] text-slate-400">
                                                                옵션: {confirmed.optionName}
                                                            </div>
                                                            <div className="text-[10px] text-slate-400">
                                                                수량: {order.product.quantity}개
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 pt-3 border-t border-gray-50 space-y-1.5">
                                                        <div className="flex justify-between text-[11px]">
                                                            <span className="text-slate-500 italic">상품 금액</span>
                                                            <span className="font-mono font-medium text-slate-700">
                                                                ¥{(confirmed.sourcingPriceCNY * order.product.quantity).toLocaleString()} (₩{(confirmed.sourcingPriceKRW * order.product.quantity).toLocaleString()})
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between text-[11px]">
                                                            <span className="text-slate-500 italic">소싱처 이용료</span>
                                                            <span className="font-mono font-medium text-slate-700">₩{confirmed.sourcingFeeKRW?.toLocaleString() || '35'}</span>
                                                        </div>
                                                        <div className="flex justify-between text-[11px]">
                                                            <span className="text-slate-500 italic">통화 환전 수수료</span>
                                                            <span className="font-mono font-medium text-slate-700">₩{confirmed.exchangeRatefee?.toLocaleString() || '30'}</span>
                                                        </div>
                                                        <div className="flex justify-between text-[11px]">
                                                            <span className="text-slate-500 italic">중국 내 배송비</span>
                                                            <span className="font-mono font-medium text-slate-700 italic">
                                                                ¥{confirmed.localShippingFeeCNY || 0} (₩{Math.round((confirmed.localShippingFeeCNY || 0) * 190.4).toLocaleString()})
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between text-[12px] font-bold pt-1 border-t border-gray-50 border-double">
                                                            <span className="text-slate-900">소싱 총비용</span>
                                                            <span className="text-slate-900">₩{((confirmed.sourcingPriceKRW * order.product.quantity) + (confirmed.sourcingFeeKRW || 35) + (confirmed.exchangeRatefee || 30)).toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-3 pt-2">
                                                    <h5 className="text-[11px] font-bold text-slate-400">마진 분석</h5>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-xs">
                                                            <span className="text-slate-500 flex items-center gap-1">정산예상금액 (+)</span>
                                                            <span className="font-bold text-slate-700 font-mono">₩{order.expectedSettlement.toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex justify-between text-[11px]">
                                                            <span className="text-slate-400 flex items-center gap-1 ml-2">- 상품 금액 (?)</span>
                                                            <span className="text-red-400 font-mono">-₩{(confirmed.sourcingPriceKRW * order.product.quantity).toLocaleString()} (¥{(confirmed.sourcingPriceCNY * order.product.quantity).toLocaleString()})</span>
                                                        </div>
                                                        <div className="flex justify-between text-[11px]">
                                                            <span className="text-slate-400 flex items-center gap-1 ml-2">- 소싱처 이용료 (?)</span>
                                                            <span className="text-red-400 font-mono">-₩{(confirmed.sourcingFeeKRW || 35).toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex justify-between text-[11px]">
                                                            <span className="text-slate-400 flex items-center gap-1 ml-2">- 통화 환전 수수료 (?)</span>
                                                            <span className="text-red-400 font-mono">-₩{(confirmed.exchangeRatefee || 30).toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex justify-between text-[11px]">
                                                            <span className="text-slate-400 flex items-center gap-1 ml-2">- 중국내 배송비</span>
                                                            <span className="text-red-400 font-mono">-₩{Math.round((confirmed.localShippingFeeCNY || 0) * 190.4).toLocaleString()} (¥{confirmed.localShippingFeeCNY || 0})</span>
                                                        </div>
                                                        <div className="flex justify-between text-[11px]">
                                                            <span className="text-slate-400 flex items-center gap-1 ml-2">- 배송대행지 운임료(예상)</span>
                                                            <span className="text-red-400 font-mono">-₩{(5000 + Math.max(0, (confirmed.estimatedWeight || 0.1) - 0.1) * 2000).toLocaleString()}</span>
                                                        </div>
                                                        <div className="pt-3 mt-3 border-t-2 border-slate-200 border-double flex justify-between items-baseline">
                                                            <div className="space-y-1">
                                                                <span className="text-[13px] font-bold text-slate-900 block uppercase">예상 순이익</span>
                                                                <span className="text-[11px] font-bold text-green-600 block">마진율</span>
                                                            </div>
                                                            <div className="text-right space-y-0.5">
                                                                <div className="text-xl font-bold text-slate-900 font-mono leading-none">
                                                                    ₩{(order.expectedSettlement - (confirmed.sourcingPriceKRW * order.product.quantity) - (confirmed.sourcingFeeKRW || 35) - (confirmed.exchangeRatefee || 31) - Math.round((confirmed.localShippingFeeCNY || 0) * 190.4) - (5000 + Math.max(0, (confirmed.estimatedWeight || 0.1) - 0.1) * 2000)).toLocaleString()}
                                                                </div>
                                                                <div className="text-[12px] font-bold text-green-600 leading-none">
                                                                    {(((order.expectedSettlement - (confirmed.sourcingPriceKRW * order.product.quantity) - (confirmed.sourcingFeeKRW || 35) - (confirmed.exchangeRatefee || 31) - Math.round((confirmed.localShippingFeeCNY || 0) * 190.4) - (5000 + Math.max(0, (confirmed.estimatedWeight || 0.1) - 0.1) * 2000)) / order.paymentPrice) * 100).toFixed(1)}%
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </>
                            ) : order.status === '결제 대기' ? (
                                /* [NEW] 결제 대기 상태 상세 내역 (Simplified for SHIPPING) */
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h5 className="text-[11px] font-bold text-slate-400">주문 상품</h5>
                                        <div className="flex gap-4">
                                            <div className="relative h-16 w-16 flex-shrink-0 rounded bg-white border border-gray-100 overflow-hidden">
                                                <Image src={order.product.thumbnail} alt="" fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <h5 className="text-[13px] font-semibold leading-snug line-clamp-2">
                                                    {order.product.name}
                                                    <ExternalLink className="h-3 w-3 inline-block ml-1 text-slate-300" />
                                                </h5>
                                                <div className="text-[11px] text-slate-400">
                                                    옵션: {order.product.optionName}
                                                </div>
                                                <div className="text-[11px] text-slate-500">
                                                    수량: {order.product.quantity}개 | 단가: {order.product.unitPrice.toLocaleString()}원
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-4 border-t border-slate-100">
                                        <div className="flex justify-between text-sm items-center">
                                            <span className="text-slate-500">결제가격</span>
                                            <span className="font-bold text-slate-900 font-mono">₩{order.paymentPrice.toLocaleString()}원</span>
                                        </div>
                                        <div className="flex justify-between text-sm items-center text-slate-400">
                                            <span>- 플랫폼 수수료</span>
                                            <span className="font-mono">-{order.platformFee.toLocaleString()}원</span>
                                        </div>
                                        <div className="flex justify-between text-base items-center pt-2 mt-2 border-t border-double border-slate-200">
                                            <span className="font-bold text-slate-900">정산예상금액</span>
                                            <span className="font-bold text-slate-900 font-mono">₩{order.expectedSettlement.toLocaleString()}원</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                (
                                    <Card className="bg-sky-50/50 border-sky-100 p-4 shadow-none">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h6 className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">AI 예상 마진</h6>
                                                <span className="text-[11px] font-bold text-sky-600">
                                                    적용된 무게: {order.warehouse?.weight || 0.2}kg
                                                </span>
                                            </div>
                                            {(() => {
                                                const currentWeight = order.warehouse?.weight || 0.2;
                                                const shippingCost = 5000 + Math.max(0, currentWeight - 0.2) * 5000;
                                                const sourcingPrice = order.warehouse?.shippingCost || 3605;
                                                const profit = order.expectedSettlement - sourcingPrice - shippingCost;
                                                const marginRate = (profit / order.paymentPrice) * 100;

                                                return (
                                                    <>
                                                        <div className="space-y-1.5 text-[11px]">
                                                            <div className="flex justify-between text-slate-600">
                                                                <span className="flex items-center gap-1">(+) 정산예상 금액</span>
                                                                <span className="font-mono">₩{order.expectedSettlement.toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex justify-between text-slate-600">
                                                                <span className="flex items-center gap-1">(-) 소싱상품 금액</span>
                                                                <span className="font-mono">₩{sourcingPrice.toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex justify-between text-slate-600">
                                                                <span className="flex items-center gap-1">(-) 배대지 예상비용</span>
                                                                <span className="font-mono">₩{shippingCost.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                        <div className="pt-2 mt-2 border-t border-sky-100 flex justify-between items-baseline">
                                                            <div className="space-y-1">
                                                                <span className="text-[11px] font-bold text-sky-700 block">순이익</span>
                                                                <span className="text-[10px] font-bold text-sky-600 block">마진율</span>
                                                            </div>
                                                            <div className="text-right space-y-0.5">
                                                                <div className="text-base font-bold text-sky-700 font-mono leading-none">
                                                                    ₩{profit.toLocaleString()}
                                                                </div>
                                                                <div className="text-[11px] font-bold text-sky-600 leading-none">
                                                                    {marginRate.toFixed(1)}%
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </Card>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. 우측: 처리 관련 (col-span-4) */}
                <div className="md:col-span-4 p-6 space-y-6">
                    <div className="space-y-4">
                        <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-tight">처리 관련</h4>

                        <div className="flex flex-col gap-2">
                            {viewMode === 'NEW' ? (
                                <div className="space-y-4 w-full">
                                    <div className="grid grid-cols-1 gap-2">
                                        {/* 1. 주문 히스토리 보기 */}
                                        <Button
                                            variant="outline"
                                            className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center"
                                            onClick={() => onHistoryClick?.(order)}
                                        >
                                            주문 히스토리 보기
                                        </Button>

                                        {/* 2. 발주 확인하기 */}
                                        <Button
                                            className="w-full h-11 text-[13px] font-bold bg-[#18181b] hover:bg-zinc-800 text-white transition-all shadow-md flex items-center justify-center"
                                            onClick={() => onTrackingClick?.(order)}
                                        >
                                            발주 확인하기
                                        </Button>

                                        {/* 3. 마진 검토하기 */}
                                        <Button
                                            variant="outline"
                                            className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center"
                                            onClick={() => onSourcingClick?.(order)}
                                        >
                                            마진 검토하기
                                        </Button>
                                    </div>

                                    {/* 4. 주문 취소하기 */}
                                    <div className="pt-2 border-t mt-2">
                                        <Button
                                            variant="ghost"
                                            className="w-full h-8 text-[11px] font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center"
                                            onClick={() => {
                                                const event = new CustomEvent('action-order-cancel', { detail: order });
                                                window.dispatchEvent(event);
                                            }}
                                        >
                                            주문 취소하기
                                        </Button>
                                    </div>
                                </div>
                            ) : viewMode === 'WAITING' ? (
                                /* WAITING (발송대기) 페이지 전용 액션 */
                                <div className="space-y-4 w-full">
                                    <div className="bg-white border rounded-lg p-4 shadow-sm space-y-4">
                                        <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">작업</h5>
                                        <div className="space-y-2">
                                            <div className="grid grid-cols-1 gap-2 pt-1">
                                                {/* 1. 주문 히스토리 보기 */}
                                                <Button
                                                    variant="outline"
                                                    className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center"
                                                    onClick={() => onHistoryClick?.(order)}
                                                >
                                                    주문 히스토리 보기
                                                </Button>

                                                {/* 2. 직접전달 처리하기 */}
                                                <Button
                                                    variant="outline"
                                                    className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center"
                                                    onClick={() => onTrackingClick?.(order)}
                                                >
                                                    직접전달 처리하기
                                                </Button>

                                                {/* 3 & 4. 소싱상품 등록하기 / 결제하기 (상태별 분기) */}
                                                {!order.sourcingHistory?.some(h => h.status === 'active') ? (
                                                    <Button
                                                        className="w-full h-11 text-[13px] font-bold bg-[#18181b] hover:bg-zinc-800 text-white transition-all shadow-md flex items-center justify-center"
                                                        onClick={() => onSourcingManagementClick?.(order)}
                                                    >
                                                        소싱상품 등록하기
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        className="w-full h-11 text-[13px] font-bold bg-[#18181b] hover:bg-zinc-800 text-white transition-all shadow-md flex items-center justify-center"
                                                        onClick={() => onSourcingClick?.(order)}
                                                    >
                                                        결제하기
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : viewMode === 'SHIPPING' ? (
                                /* SHIPPING (배송중) 페이지 전용 액션 리스트 */
                                <div className="space-y-4 w-full">
                                    <div className="bg-white border rounded-lg p-4 space-y-4 shadow-sm">
                                        <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">작업</h5>
                                        <div className="space-y-2">
                                            <div className="grid grid-cols-1 gap-2 pt-1">
                                                {/* 1. 국내 송장 확인 */}
                                                {order.domesticTracking && order.status !== '결제 대기' && (
                                                    <Button
                                                        className="w-full h-11 text-[13px] font-bold bg-[#18181b] hover:bg-zinc-800 text-white transition-all shadow-md flex items-center justify-center"
                                                        onClick={() => onDomesticTrackingClick?.(order)}
                                                    >
                                                        국내 송장 확인
                                                    </Button>
                                                )}

                                                {/* 2. 추가 소싱하기 */}
                                                {order.status !== '결제 대기' && (
                                                    <Button
                                                        variant="outline"
                                                        className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex justify-center items-center"
                                                        onClick={() => onAddSourcingClick?.(order)}
                                                    >
                                                        추가 소싱하기
                                                    </Button>
                                                )}

                                                {/* 3. 배송대행지 관리 */}
                                                {order.status !== '결제 대기' && (
                                                    ['오류입고', '입고 대기', '입고중'].includes(order.status) ? (
                                                        <Button
                                                            className="w-full h-11 text-[13px] font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow-md flex items-center justify-center"
                                                            onClick={() => onWarehouseClick?.(order)}
                                                        >
                                                            배송대행지 관리
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="outline"
                                                            className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-4"
                                                            onClick={() => onWarehouseClick?.(order)}
                                                        >
                                                            <span>배송대행지 관리</span>
                                                            <span className="text-slate-400 font-bold">처리현황</span>
                                                        </Button>
                                                    )
                                                )}

                                                {/* 4. 소싱주문 관리 */}
                                                {order.status !== '결제 대기' && (
                                                    <Button
                                                        variant="outline"
                                                        className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-4"
                                                        onClick={() => onSourcingManagementClick?.(order)}
                                                    >
                                                        <span>소싱주문 관리</span>
                                                        <span className="text-slate-400 font-bold">목록 확인</span>
                                                    </Button>
                                                )}

                                                {/* 5. 주문 히스토리 보기 */}
                                                <Button
                                                    variant="outline"
                                                    className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center"
                                                    onClick={() => onHistoryClick?.(order)}
                                                >
                                                    주문 히스토리 보기
                                                </Button>

                                                {/* 6. 결제하기 */}
                                                {(order.status === '견적 완료' || order.status === '결제 대기') && (
                                                    <Button
                                                        className="w-full h-11 text-[13px] font-bold bg-[#18181b] hover:bg-zinc-800 text-white transition-all shadow-md flex items-center justify-center"
                                                        onClick={() => onPayShippingClick?.(order)}
                                                    >
                                                        결제하기
                                                    </Button>
                                                )}

                                                {/* 7. 배송 추적 */}
                                                {order.status !== '결제 대기' && (
                                                    <Button
                                                        variant="outline"
                                                        className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center"
                                                        onClick={() => onTrackingClick?.(order)}
                                                    >
                                                        배송 추적
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : viewMode === 'CLAIMS' ? (
                                /* CLAIMS (클레임) 페이지 전용 액션 */
                                <div className="space-y-4 w-full">
                                    <Button
                                        className="w-full h-11 text-[13px] font-bold bg-[#18181b] hover:bg-zinc-800 text-white transition-all shadow-md flex items-center justify-center"
                                        onClick={() => {/* 처리 완료 로직 예정 */ }}
                                    >
                                        처리 완료
                                    </Button>
                                    <div className="grid grid-cols-1 gap-2">
                                        <Button
                                            variant="outline"
                                            className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center"
                                            onClick={() => onTrackingClick?.(order)}
                                        >
                                            배송 추적
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-4"
                                            onClick={() => onWarehouseClick?.(order)}
                                        >
                                            <span>배송대행지 관리</span>
                                            <span className="text-slate-400 font-bold">반품신청</span>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-4"
                                            onClick={() => onSourcingManagementClick?.(order)}
                                        >
                                            <span>소싱주문 관리</span>
                                            <span className="text-slate-400 font-bold">환불/분쟁</span>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center"
                                            onClick={() => onHistoryClick?.(order)}
                                        >
                                            주문 히스토리 보기
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                /* ALL / Default 액션 (전체 주문 등) */
                                <div className="space-y-4 w-full">
                                    <Button
                                        className="w-full h-11 text-[13px] font-bold bg-[#18181b] hover:bg-zinc-800 text-white transition-all shadow-md flex items-center justify-center"
                                        onClick={() => onTrackingClick?.(order)}
                                    >
                                        발주 확인하기
                                    </Button>
                                    <div className="grid grid-cols-1 gap-2">
                                        <Button
                                            variant="outline"
                                            className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center"
                                            onClick={() => onHistoryClick?.(order)}
                                        >
                                            주문 히스토리 보기
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full h-9 text-[11px] font-semibold bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center"
                                            onClick={() => onTrackingClick?.(order)}
                                        >
                                            배송 추적
                                        </Button>
                                    </div>
                                    <div className="pt-2 border-t mt-2">
                                        <Button
                                            variant="ghost"
                                            className="w-full h-8 text-[11px] font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center"
                                            onClick={() => {
                                                const event = new CustomEvent('action-order-cancel', { detail: order });
                                                window.dispatchEvent(event);
                                            }}
                                        >
                                            주문 취소하기
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

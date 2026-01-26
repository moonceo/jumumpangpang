import { ORDER_STATUSES } from "@/lib/constants/orders";
import { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
    Pencil,
    ExternalLink,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Save,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ExpandableRowContentProps {
    order: Order;
    onTrackingClick?: (order: Order) => void;
    onWarehouseClick?: (order: Order) => void;
    onSourcingClick?: (order: Order) => void;
    onHistoryClick?: (order: Order) => void;
    onSourcingManagementClick?: (order: Order) => void;
    viewMode?: 'NEW' | 'WAITING' | 'SHIPPING' | 'CLAIMS' | 'ALL';
}

export function ExpandableRowContent({
    order,
    onTrackingClick,
    onWarehouseClick,
    onSourcingClick,
    onHistoryClick,
    onSourcingManagementClick,
    viewMode
}: ExpandableRowContentProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const isPCCCMissing = !order.recipient.pccc;

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-6 bg-muted/20 border-t">
            {/* A. Information Section (4 cols) */}
            <div className="md:col-span-4 space-y-6 md:border-r pr-6 border-dashed border-gray-200 dark:border-gray-700">
                <div className="space-y-4">
                    <h4 className="text-sm font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100 italic non-italic">
                        주문자 정보
                    </h4>
                    <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">성함</span>
                            <span>{order.buyerName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">연락처</span>
                            <span>{order.buyerPhone}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">수령인 정보</h4>
                        {!isEditing ? (
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsEditing(true)}>
                                <Pencil className="h-3 w-3" />
                            </Button>
                        ) : (
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-green-600" onClick={() => setIsEditing(false)}>
                                    <Save className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-red-600" onClick={() => setIsEditing(false)}>
                                    <X className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-3 text-sm">
                        {!isEditing ? (
                            <>
                                <div>
                                    <span className="text-muted-foreground text-xs">성함 / 연락처</span>
                                    <div className="font-medium">{order.recipient.name} / {order.recipient.phone}</div>
                                </div>
                                <div>
                                    <span className="text-muted-foreground text-xs">주소</span>
                                    <div>({order.recipient.zipCode}) {order.recipient.address}</div>
                                    {order.recipient.detailAddress && <div>{order.recipient.detailAddress}</div>}
                                </div>
                                <div>
                                    <span className="text-muted-foreground text-xs">배송메모</span>
                                    <div className="text-muted-foreground truncate">{order.recipient.deliveryMemo || "-"}</div>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <Input defaultValue={order.recipient.name} className="h-8 text-xs" placeholder="성함" />
                                    <Input defaultValue={order.recipient.phone} className="h-8 text-xs" placeholder="연락처" />
                                </div>
                                <div className="flex gap-1">
                                    <Input defaultValue={order.recipient.zipCode} className="h-8 text-xs w-20" placeholder="우편번호" />
                                    <Button variant="outline" className="h-8 text-[10px] shrink-0">주소검색</Button>
                                </div>
                                <Input defaultValue={order.recipient.address} className="h-8 text-xs" placeholder="기본주소" />
                                <Input defaultValue={order.recipient.detailAddress} className="h-8 text-xs" placeholder="상세주소" />
                                <Textarea defaultValue={order.recipient.deliveryMemo} className="min-h-[60px] text-xs py-1" placeholder="배송메모" />
                            </div>
                        )}

                        {/* PCCC Logic */}
                        <div className="pt-2">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground text-xs">개인통관고유부호</span>
                                    {isPCCCMissing ? (
                                        <Badge variant="destructive" className="h-4 px-1 text-[10px]">확인 필요</Badge>
                                    ) : (
                                        <Badge variant="outline" className="h-4 px-1 text-[10px] bg-green-50 text-green-700 border-green-200">확인됨</Badge>
                                    )}
                                </div>
                            </div>
                            {isEditing ? (
                                <Input defaultValue={order.recipient.pccc} className="h-8 text-xs font-mono" placeholder="P000000000000" />
                            ) : (
                                <div className={cn(
                                    "flex items-center gap-2",
                                    isPCCCMissing && "text-red-500 font-bold"
                                )}>
                                    {isPCCCMissing ? (
                                        <>
                                            <span className="text-sm">수집되지 않음</span>
                                            <Button size="sm" variant="outline" className="h-7 text-xs border-blue-200 text-blue-600 hover:bg-blue-50">
                                                통관부호 확인
                                            </Button>
                                        </>
                                    ) : (
                                        <span className="font-mono">{order.recipient.pccc}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Shipping Info Section - Keep header consistent for Shipping Mode */}
                {viewMode === 'SHIPPING' && (
                    <div className="mt-6 pt-4 border-t border-dashed">
                        <h4 className="text-sm font-semibold mb-3">배송 정보</h4>
                        {order.domesticTracking ? (
                            <div className="rounded-lg border bg-slate-50 dark:bg-slate-900/50 p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">국내 배송 중</span>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 text-xs bg-white dark:bg-black"
                                        onClick={() => onTrackingClick?.(order)}
                                    >
                                        송장 확인
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    <div className="bg-white dark:bg-black border rounded p-2">
                                        <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">운송장 번호</div>
                                        <div className="font-mono font-bold text-base flex items-center gap-2">
                                            <span className="text-slate-500">{order.domesticTracking.carrier}</span>
                                            <span>{order.domesticTracking.trackingNumber}</span>
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-muted-foreground flex justify-between">
                                        <span>마지막 확인</span>
                                        <span>{order.domesticTracking.updatedAt}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed p-6 flex flex-col items-center justify-center text-center space-y-2 bg-muted/10">
                                <div className="text-muted-foreground text-xs italic">등록된 배송 정보가 없습니다.</div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-[10px]"
                                    onClick={() => onTrackingClick?.(order)}
                                >
                                    송장 등록하기
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* B. Detailed Breakdown Section (4 cols) */}
            <div className="md:col-span-4 space-y-6 md:border-r pr-6 border-dashed border-gray-200 dark:border-gray-700">
                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">상품 정보</h4>
                    <div className="flex gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border">
                            <Image
                                src={order.product.thumbnail}
                                alt={order.product.name}
                                fill
                                className="object-cover"
                            />
                            {order.product.isAiOption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-blue-600/90 text-[9px] text-white text-center py-0.5">
                                    AI 옵션 이미지
                                </div>
                            )}
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                                <h4 className="text-sm font-medium leading-tight line-clamp-2">
                                    {order.product.name}
                                </h4>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">{order.product.optionName}</p>
                            <div className="text-sm font-medium mt-1">
                                {new Intl.NumberFormat('ko-KR').format(order.product.unitPrice)}원
                                <span className="text-muted-foreground mx-1">x</span>
                                {order.product.quantity}개
                            </div>
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">비용 상세</h4>
                    <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">결제 가격</span>
                            <span className="font-medium">{new Intl.NumberFormat('ko-KR').format(order.paymentPrice)}원</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground text-xs italic">
                            <span>- 플랫폼 수수료</span>
                            <span>-{new Intl.NumberFormat('ko-KR').format(order.platformFee)}원</span>
                        </div>
                        <div className="border-t pt-1.5 mt-0.5 flex justify-between font-bold text-slate-900 dark:text-slate-100">
                            <span>정산 예정 금액</span>
                            <span>{new Intl.NumberFormat('ko-KR').format(order.expectedSettlement)}원</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <button
                        onClick={() => setHistoryOpen(!historyOpen)}
                        className="w-full flex items-center justify-between text-xs font-medium text-muted-foreground hover:text-foreground transition-colors p-2 bg-muted/40 rounded border"
                    >
                        <span>소싱 이력 ({order.sourcingHistory.length}건)</span>
                        {historyOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>

                    {historyOpen && (
                        <div className="space-y-2 mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                            {order.sourcingHistory.length > 0 ? (
                                order.sourcingHistory.map((history, idx) => (
                                    <div key={idx} className="text-[10px] border rounded p-2 bg-background space-y-1">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold">#{order.sourcingHistory.length - idx} 소싱</span>
                                            <Badge variant={history.status === 'refunded' ? "destructive" : "secondary"} className="text-[8px] h-3.5 px-1">
                                                {history.status === 'refunded' ? '환불됨' : '취소됨'}
                                            </Badge>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="relative h-8 w-8 rounded border overflow-hidden shrink-0">
                                                <Image src={history.thumbnail} alt="" fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <div className="truncate font-medium">{history.productName}</div>
                                                <div className="text-muted-foreground">매칭률: {history.matchingRate}% | {history.sourcingPriceKRW.toLocaleString()}원</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 text-muted-foreground text-xs italic">이전 소싱 이력이 없습니다.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* C. Workflow & Memo Section (4 cols) */}
            <div className="md:col-span-4 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">워크플로우</h4>
                    <div className="grid grid-cols-1 gap-2">
                        {/* 1. NEW ORDERS */}
                        {(viewMode === 'NEW' || (!viewMode && ORDER_STATUSES.NEW.includes(order.status as any) && !ORDER_STATUSES.WAITING.includes(order.status as any))) && (
                            <div className="grid grid-cols-1 gap-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-xs text-muted-foreground h-8"
                                    onClick={() => onHistoryClick?.(order)}
                                >
                                    주문 히스토리 보기
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-xs text-muted-foreground h-8"
                                    onClick={() => alert("발주 확인서 보기 기능은 준비중입니다.")}
                                >
                                    발주 확인서 보기
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8"
                                    onClick={() => onSourcingClick?.(order)}
                                >
                                    마진 검토하기
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-xs text-red-600 hover:text-red-700 hover:bg-red-50 h-8"
                                    onClick={() => alert("주문 취소 모달 준비중")}
                                >
                                    주문 취소하기
                                </Button>
                            </div>
                        )}

                        {/* 2. PENDING SHIPMENT (WAITING) */}
                        {(viewMode === 'WAITING' || (!viewMode && ORDER_STATUSES.WAITING.includes(order.status as any))) && (
                            <div className="space-y-2">
                                <Button
                                    className="w-full bg-slate-900 text-white hover:bg-slate-800"
                                    onClick={() => onWarehouseClick?.(order)}
                                >
                                    직접전달 처리하기
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                                    onClick={() => onSourcingClick?.(order)}
                                >
                                    소싱상품 등록하기
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-xs text-muted-foreground h-8"
                                    onClick={() => onHistoryClick?.(order)}
                                >
                                    주문 히스토리 보기
                                </Button>
                            </div>
                        )}

                        {/* 3. SHIPPING */}
                        {(viewMode === 'SHIPPING' || (!viewMode && ORDER_STATUSES.SHIPPING.includes(order.status as any))) && (
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        className="w-full bg-slate-900 text-white hover:bg-slate-800"
                                        onClick={() => onTrackingClick?.(order)}
                                    >
                                        국내 송장 확인
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                                        onClick={() => onSourcingClick?.(order)}
                                    >
                                        추가 소싱하기
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start text-xs text-muted-foreground h-8"
                                        onClick={() => onWarehouseClick?.(order)}
                                    >
                                        배송대행지 관리
                                        {order.warehouse && <Badge variant="secondary" className="ml-auto text-[9px] h-3.5 px-1">1</Badge>}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start text-xs text-muted-foreground h-8"
                                        onClick={() => onSourcingManagementClick?.(order)}
                                    >
                                        소싱 주문 관리
                                        <Badge variant="secondary" className="ml-auto text-[9px] h-3.5 px-1">{order.sourcingHistory.length}</Badge>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start text-xs text-muted-foreground h-8"
                                        onClick={() => onHistoryClick?.(order)}
                                    >
                                        주문 히스토리 보기
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start text-xs text-muted-foreground h-8"
                                        onClick={() => onTrackingClick?.(order)}
                                    >
                                        배송 추적
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* 4. CLAIMS */}
                        {(viewMode === 'CLAIMS' || (!viewMode && ORDER_STATUSES.CLAIMS.includes(order.status as any))) && (
                            <div className="grid grid-cols-1 gap-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-xs text-muted-foreground h-8"
                                    onClick={() => onHistoryClick?.(order)}
                                >
                                    주문 히스토리 보기
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-xs text-muted-foreground h-8"
                                    onClick={() => onTrackingClick?.(order)}
                                >
                                    배송 추적
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4 mt-auto">
                    <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">내부 관리 메모</h4>
                        <AlertCircle className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <Textarea
                        placeholder="메모를 입력하세요"
                        className="min-h-[80px] text-sm resize-none bg-white dark:bg-black"
                        defaultValue={order.internalMemo}
                    />
                    <div className="text-[10px] text-muted-foreground text-right font-mono mt-1">
                        ID: {order.id}
                    </div>
                </div>
            </div>
        </div>
    );
}

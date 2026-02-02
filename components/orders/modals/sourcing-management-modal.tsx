"use client";

import { Order } from "@/types/order";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    ShoppingBag,
    RefreshCw,
    AlertCircle,
    ArrowRight,
    FileText
} from "lucide-react";
import Image from "next/image";

interface SourcingManagementModalProps {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SourcingManagementModal({ order, open, onOpenChange }: SourcingManagementModalProps) {
    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[1240px] h-[85vh] p-0 overflow-hidden flex flex-col border-none shadow-2xl">
                <DialogHeader className="p-6 pb-4 bg-zinc-900 text-white shrink-0">
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-purple-400" />
                        소싱 주문 관리
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400 text-xs">
                        마켓 주문번호: <span className="font-bold text-white">{order.marketOrderId}</span> | 주문팡팡 AI 소싱 시스템 연동 중
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue={`sourcing-${order.sourcingHistory.length}`} className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 border-b bg-slate-50 dark:bg-zinc-900 flex items-center justify-between shrink-0">
                        <TabsList className="h-12 bg-transparent gap-6">
                            {order.sourcingHistory.sort((a, b) => a.attempt - b.attempt).map((history) => (
                                <TabsTrigger
                                    key={history.attempt}
                                    value={`sourcing-${history.attempt}`}
                                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none px-1 py-3 text-xs font-bold transition-all"
                                >
                                    #{history.attempt} 차 소싱 {history.status === 'active' ? '(진행중)' : '(종료)'}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 font-bold">
                            총 {order.sourcingHistory.length}개 소싱 이력
                        </Badge>
                    </div>

                    <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 bg-white dark:bg-zinc-950">
                        {/* COL 1: Market Order Info (3 cols) */}
                        <div className="md:col-span-3 border-r p-6 bg-slate-50/50 space-y-6 overflow-y-auto">
                            <section className="space-y-4">
                                <h3 className="font-bold text-sm flex items-center gap-2 text-slate-900 uppercase tracking-tight">
                                    <FileText className="h-4 w-4 text-slate-500" />
                                    마켓 주문 정보
                                </h3>
                                <div className="bg-white rounded-xl p-4 border shadow-sm space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase">수령인</p>
                                        <p className="text-sm font-bold">{order.recipient.name}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase">주문 상품</p>
                                        <p className="text-xs leading-relaxed">{order.product.name}</p>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center bg-blue-50/50 p-2 rounded-lg">
                                        <span className="text-[10px] font-bold text-blue-700">정산 예정액</span>
                                        <span className="text-sm font-black text-blue-800">{order.expectedSettlement.toLocaleString()}원</span>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 rounded-xl p-4 space-y-2">
                                <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1">
                                    <RefreshCw className="h-3 w-3" />
                                    물류 협업 가이드
                                </h4>
                                <div className="text-[10px] text-amber-700 leading-relaxed font-medium">
                                    품절 시 우측 채팅을 통해 대체 옵션을 제안하거나, '재발송 요청' 버튼을 활용해 송장을 재출력 하세요.
                                </div>
                            </section>
                        </div>

                        {/* COL 2: Sourcing & Margin (5 cols) */}
                        <div className="md:col-span-5 border-r p-6 space-y-6 overflow-y-auto">
                            {order.sourcingHistory.map((history) => (
                                <TabsContent key={history.attempt} value={`sourcing-${history.attempt}`} className="m-0 space-y-6">
                                    <section className="space-y-4">
                                        <h3 className="font-bold text-sm flex items-center gap-2 text-slate-900 uppercase">
                                            <ShoppingBag className="h-4 w-4 text-purple-600" />
                                            소싱 상품 디테일
                                        </h3>
                                        <div className="bg-slate-50 border rounded-xl p-5 space-y-4">
                                            <div className="flex gap-4">
                                                <div className="relative h-20 w-20 rounded-lg border overflow-hidden shrink-0 shadow-sm">
                                                    <Image src={history.thumbnail} alt="" fill className="object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0 space-y-1">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <p className="text-xs font-bold leading-snug">{history.productName}</p>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6"><RefreshCw className="h-3 w-3 text-slate-400" /></Button>
                                                    </div>
                                                    <p className="text-[10px] text-purple-600 font-bold">옵션: {history.optionName}</p>
                                                    <Button variant="link" className="h-auto p-0 text-[10px] text-blue-600 flex items-center gap-1 font-bold">
                                                        상품 원문 보기 (타오바오) <ArrowRight className="h-2.5 w-2.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <Separator className="bg-slate-200" />
                                            <div className="grid grid-cols-2 gap-4 text-xs">
                                                <div className="p-3 bg-white rounded-lg border border-slate-100">
                                                    <p className="text-[10px] text-muted-foreground font-bold mb-1 uppercase">소싱 단가</p>
                                                    <p className="font-black text-slate-900">{(history.sourcingPriceKRW).toLocaleString()}원</p>
                                                    <p className="text-[9px] text-muted-foreground">{history.sourcingPriceCNY} CNY</p>
                                                </div>
                                                <div className="p-3 bg-white rounded-lg border border-slate-100">
                                                    <p className="text-[10px] text-muted-foreground font-bold mb-1 uppercase">현지 운송비</p>
                                                    <p className="font-black text-slate-900">{(history.localShippingFeeCNY * 190).toLocaleString()}원</p>
                                                    <p className="text-[9px] text-muted-foreground">{history.localShippingFeeCNY} CNY</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <h3 className="font-bold text-sm flex items-center gap-2 text-slate-900 uppercase tracking-tight">
                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                            실시간 마진 시뮬레이션
                                        </h3>
                                        <div className="bg-zinc-900 text-white rounded-xl p-5 space-y-4 shadow-xl">
                                            <div className="flex justify-between text-xs items-center">
                                                <span className="text-zinc-400 font-bold uppercase tracking-widest">마켓 판매가</span>
                                                <span className="font-black text-lg">{order.paymentPrice.toLocaleString()}원</span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[11px] text-zinc-400">
                                                    <span>총 소싱 비용 (현지 배송 포함)</span>
                                                    <span className="text-zinc-200 font-bold">-{(history.sourcingPriceKRW + (history.localShippingFeeCNY * 190)).toLocaleString()}원</span>
                                                </div>
                                                <div className="flex justify-between text-[11px] text-zinc-400">
                                                    <span>플랫폼 판매 수수료</span>
                                                    <span className="text-zinc-200 font-bold">-{order.platformFee.toLocaleString()}원</span>
                                                </div>
                                            </div>
                                            <div className="h-px bg-zinc-800" />
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-green-500 tracking-widest uppercase">예상 순수익</span>
                                                    <span className="text-2xl font-black text-white">
                                                        {(order.paymentPrice - (history.sourcingPriceKRW + (history.localShippingFeeCNY * 190) + order.platformFee)).toLocaleString()}원
                                                    </span>
                                                </div>
                                                <Badge className="bg-green-600 h-8 px-4 text-xs font-black shadow-lg shadow-green-900/50">마진 12.4%</Badge>
                                            </div>
                                        </div>
                                    </section>
                                </TabsContent>
                            ))}
                        </div>

                        {/* COL 3: Chat Interface (4 cols) */}
                        <div className="md:col-span-4 flex flex-col bg-slate-50/30">
                            {/* Chat Header */}
                            <div className="p-4 border-b bg-white flex justify-between items-center shrink-0">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm font-black text-slate-900">Seller (왕사장)</span>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="outline" className="h-6 px-2 text-[10px] border-slate-200">번역설정</Button>
                                    <Button variant="ghost" size="icon" className="h-6 w-6"><RefreshCw className="h-3 w-3" /></Button>
                                </div>
                            </div>

                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4">
                                    <div className="flex justify-center my-4">
                                        <span className="text-[9px] font-bold bg-slate-200/50 text-slate-500 px-3 py-1 rounded-full uppercase tracking-tighter">Today</span>
                                    </div>
                                    <div className="flex flex-col items-end gap-1.5 ml-auto max-w-[85%]">
                                        <div className="bg-purple-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 text-[11px] shadow-md shadow-purple-100 leading-relaxed font-medium">
                                            상품이 아직 도착하지 않았습니다. 배송 상태 확인 부탁드립니다.
                                            <div className="text-[9px] opacity-70 mt-1.5 pt-1.5 border-t border-white/20">Item hasn't arrived yet. Please check shipping status.</div>
                                        </div>
                                        <span className="text-[8px] text-muted-foreground mr-1">오후 2:30</span>
                                    </div>
                                    <div className="flex flex-col items-start gap-1.5 max-w-[85%]">
                                        <span className="text-[9px] font-bold text-slate-500 ml-1">Seller</span>
                                        <div className="bg-white border rounded-2xl rounded-tl-none px-4 py-2.5 text-[11px] shadow-sm leading-relaxed text-slate-800">
                                            亲，这边已经发货了，请耐心等待一下.
                                            <div className="text-[9px] text-purple-600 mt-1.5 pt-1.5 border-t font-black">고객님, 이미 발송되었습니다. 잠시만 기다려주세요.</div>
                                        </div>
                                        <span className="text-[8px] text-muted-foreground ml-1">오후 2:32</span>
                                    </div>
                                </div>
                            </ScrollArea>

                            {/* Input Area & Quick Actions */}
                            <div className="p-4 bg-white border-t space-y-4 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                                <div className="flex gap-2">
                                    <Button className="flex-1 bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold h-9 text-[11px]" variant="outline">
                                        재발송 요청
                                    </Button>
                                    <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-9 text-[11px] shadow-lg shadow-red-100">
                                        환불 요청
                                    </Button>
                                </div>
                                <div className="relative group">
                                    <input
                                        className="w-full border-2 border-slate-100 rounded-full px-5 py-3 text-xs pr-14 focus:outline-none focus:border-purple-300 transition-all bg-slate-50 group-hover:bg-white"
                                        placeholder="메시지 입력 (한글 입력 시 자동 번역)"
                                    />
                                    <Button size="icon" className="absolute right-1.5 top-1.5 h-8 w-8 rounded-full bg-purple-600 shadow-lg shadow-purple-200 hover:scale-105 transition-transform">
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tabs>

                <div className="p-4 border-t bg-slate-50 flex justify-center shrink-0">
                    <Button variant="ghost" className="h-8 text-[11px] font-bold text-slate-500" onClick={() => onOpenChange(false)}>창 닫기</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

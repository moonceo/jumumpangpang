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
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
                <DialogHeader className="p-6 pb-2 border-b">
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-purple-500" />
                        소싱 주문 관리
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        마켓 주문번호: {order.marketOrderId} | 판매자와의 대화 및 주문 상태를 관리합니다.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue={`sourcing-${order.sourcingHistory.length}`} className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 border-b bg-muted/20 flex items-center justify-between">
                        <TabsList className="h-10 bg-transparent gap-4">
                            {order.sourcingHistory.sort((a, b) => a.attempt - b.attempt).map((history) => (
                                <TabsTrigger
                                    key={history.attempt}
                                    value={`sourcing-${history.attempt}`}
                                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none px-1 py-2 text-xs font-bold"
                                >
                                    #{history.attempt} 소싱 {history.status === 'active' ? '(진행중)' : '(종료)'}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            총 {order.sourcingHistory.length}회 시도
                        </Badge>
                    </div>

                    <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[500px]">
                        {/* Left: Order Info & Margin */}
                        <div className="md:col-span-4 border-r p-6 bg-slate-50 dark:bg-zinc-900/50 space-y-6 overflow-y-auto">
                            {order.sourcingHistory.map((history) => (
                                <TabsContent key={history.attempt} value={`sourcing-${history.attempt}`} className="m-0 space-y-6">
                                    <section className="space-y-3">
                                        <h3 className="font-bold text-sm flex items-center gap-2 text-slate-900">
                                            <FileText className="h-4 w-4 text-purple-600" />
                                            #{history.attempt} 소싱 정보
                                        </h3>
                                        <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 border shadow-sm space-y-3">
                                            <div className="flex gap-3">
                                                <div className="relative h-12 w-12 rounded-lg border overflow-hidden shrink-0">
                                                    <Image src={history.thumbnail} alt="" fill className="object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs font-bold truncate">{history.productName}</div>
                                                    <div className="text-[10px] text-muted-foreground">{history.optionName}</div>
                                                </div>
                                            </div>
                                            <Separator />
                                            <div className="space-y-1.5 text-xs">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">상품 금액</span>
                                                    <span>{history.sourcingPriceKRW.toLocaleString()}원</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">현지 배송비</span>
                                                    <span>{(history.localShippingFeeCNY * 190).toLocaleString()}원</span>
                                                </div>
                                                <div className="flex justify-between font-bold pt-1 text-sm">
                                                    <span>총 원가</span>
                                                    <span className="text-purple-600">{(history.sourcingPriceKRW + (history.localShippingFeeCNY * 190)).toLocaleString()}원</span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="space-y-3">
                                        <h3 className="font-bold text-sm flex items-center gap-2 text-slate-900">
                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                            마진 시뮬레이션
                                        </h3>
                                        <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 border shadow-sm space-y-2">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-muted-foreground">마켓 판매가</span>
                                                <span className="font-medium">{order.paymentPrice.toLocaleString()}원</span>
                                            </div>
                                            <div className="flex justify-between text-xs text-red-500">
                                                <span>판매 원가 합계</span>
                                                <span>-{(history.sourcingPriceKRW + (history.localShippingFeeCNY * 190) + order.platformFee).toLocaleString()}원</span>
                                            </div>
                                            <Separator className="my-1" />
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold">예상 마진</span>
                                                <div className="text-right">
                                                    <div className="text-sm font-black text-slate-900">
                                                        {(order.paymentPrice - (history.sourcingPriceKRW + (history.localShippingFeeCNY * 190) + order.platformFee)).toLocaleString()}원
                                                    </div>
                                                    <div className="text-[10px] text-green-600 font-bold">▲ 12.4%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 rounded-xl p-4 space-y-2">
                                        <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1">
                                            <RefreshCw className="h-3 w-3" />
                                            반품/환불 가이드
                                        </h4>
                                        <div className="text-[10px] text-amber-700 leading-relaxed">
                                            1. 상단 채팅을 통해 판매자에게 <b>반품 주소지</b>를 먼저 확인하세요.<br />
                                            2. 주소 확보 후 <b>배대지 신청서</b>에서 '반품 신청'을 작성하세요.
                                        </div>
                                    </section>
                                </TabsContent>
                            ))}

                            <div className="pt-2 space-y-2">
                                <Button className="w-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold h-10" variant="outline">
                                    재발송 요청
                                </Button>
                                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-10 shadow-lg shadow-red-100">
                                    환불 요청
                                </Button>
                            </div>
                        </div>

                        {/* Right: Chat Interface */}
                        <div className="md:col-span-8 flex flex-col bg-white dark:bg-zinc-950">
                            {/* Chat Header */}
                            <div className="p-3 border-b flex justify-between items-center bg-muted/5">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm font-bold">Seller (왕사장)</span>
                                </div>
                                <Button variant="ghost" size="icon" className="h-7 w-7"><RefreshCw className="h-3.5 w-3.5" /></Button>
                            </div>
                            <ScrollArea className="flex-1 p-4 bg-muted/5">
                                <div className="space-y-4">
                                    <div className="flex justify-center my-4">
                                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full">2024년 1월 26일</span>
                                    </div>
                                    {/* Mock Chat */}
                                    <div className="flex flex-col items-end space-y-1">
                                        <div className="bg-purple-600 text-white rounded-2xl rounded-tr-none px-4 py-2 text-sm max-w-[80%]">
                                            상품이 아직 도착하지 않았습니다. 배송 상태 확인 부탁드립니다.
                                            <div className="text-[10px] opacity-70 mt-1 pt-1 border-t border-white/20">Item hasn't arrived yet. Please check shipping status.</div>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground">오후 2:30</span>
                                    </div>
                                    <div className="flex flex-col items-start space-y-1">
                                        <div className="bg-white border rounded-2xl rounded-tl-none px-4 py-2 text-sm max-w-[80%] shadow-sm">
                                            <span className="font-bold block mb-1 text-[10px] text-muted-foreground">Seller</span>
                                            亲，这边已经发货了，请耐心等待一下.
                                            <div className="text-[10px] text-purple-600 mt-1 pt-1 border-t font-medium">고객님, 이미 발송되었습니다. 잠시만 기다려주세요.</div>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground">오후 2:32</span>
                                    </div>
                                </div>
                            </ScrollArea>
                            {/* Input Area */}
                            <div className="p-3 border-t">
                                <div className="relative">
                                    <input className="w-full border rounded-full px-4 py-2.5 text-sm pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="메시지를 입력하세요 (한국어로 입력 시 자동 번역)" />
                                    <Button size="icon" className="absolute right-1 top-1 h-7 w-7 rounded-full bg-purple-600"><ArrowRight className="h-3 w-3" /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

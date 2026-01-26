"use client";

import { Order } from "@/types/order";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Globe,
    Share2,
    Check,
    Copy,
    Truck,
    Warehouse,
    ShieldCheck,
    Home
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface TrackingModalProps {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TrackingModal({ order, open, onOpenChange }: TrackingModalProps) {
    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden flex flex-col gap-0 border-none">
                <DialogHeader className="p-6 pb-4 bg-zinc-900 text-white">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-xl flex items-center gap-2">
                                <Globe className="h-5 w-5 text-blue-400" />
                                배송 상세 추적
                            </DialogTitle>
                            <DialogDescription className="text-zinc-400 text-xs">
                                마켓 주문번호: {order.marketOrderId} | 시스템 ID: {order.id}
                            </DialogDescription>
                        </div>
                        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-8 text-xs shrink-0">
                            <Share2 className="h-3.5 w-3.5 mr-2" />
                            화면 공유
                        </Button>
                    </div>
                </DialogHeader>

                <ScrollArea className="flex-1 bg-slate-50 dark:bg-zinc-950">
                    <div className="p-6 space-y-4">
                        <Accordion type="multiple" defaultValue={["item-4"]} className="space-y-3">
                            {/* 1. China Local */}
                            <AccordionItem value="item-1" className="border rounded-lg bg-white dark:bg-zinc-900 px-4">
                                <AccordionTrigger className="hover:no-underline py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                            <Truck className="h-4 w-4 text-slate-500" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs font-bold">1단계: 중국 현지 배송</p>
                                            <p className="text-[10px] text-muted-foreground font-normal">배대지 도착 완료 (중국 육송)</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-4 border-t pt-4 space-y-4">
                                    <div className="flex justify-between items-center bg-muted/30 p-2 rounded text-[11px]">
                                        <span className="text-muted-foreground">운송장: 9874576944341342</span>
                                        <Button variant="ghost" size="icon" className="h-5 w-5"><Copy className="h-3 w-3" /></Button>
                                    </div>
                                    <div className="space-y-4 relative pl-4 border-l ml-2">
                                        <div className="relative">
                                            <div className="absolute -left-5 top-1 h-2 w-2 rounded-full bg-blue-500" />
                                            <p className="text-xs font-bold">배달 완료</p>
                                            <p className="text-[10px] text-muted-foreground">07/18 14:36 | 흔쾌히, 이미 배달완료</p>
                                        </div>
                                        <div className="relative opacity-60">
                                            <div className="absolute -left-5 top-1 h-2 w-2 rounded-full bg-slate-300" />
                                            <p className="text-xs font-normal">간선 하차</p>
                                            <p className="text-[10px] text-muted-foreground">07/18 10:00</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* 2. Warehouse Processing */}
                            <AccordionItem value="item-2" className="border rounded-lg bg-white dark:bg-zinc-900 px-4">
                                <AccordionTrigger className="hover:no-underline py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                            <Warehouse className="h-4 w-4 text-orange-500" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs font-bold">2단계: 배송대행지 처리</p>
                                            <p className="text-[10px] text-muted-foreground font-normal">출고 완료 (5/5 단계)</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-6 border-t pt-6">
                                    <div className="flex items-center justify-between px-2">
                                        {["입고대기", "입고중", "견적완료", "출고준비", "출고완료"].map((step, idx) => (
                                            <div key={step} className="flex flex-col items-center gap-2 relative">
                                                {idx < 4 && <div className="absolute left-[50%] top-3 w-full h-[2px] bg-blue-500" />}
                                                <div className="z-10 h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white ring-4 ring-white">
                                                    <Check className="h-3.5 w-3.5" />
                                                </div>
                                                <span className="text-[10px] font-bold">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* 3. Customs */}
                            <AccordionItem value="item-3" className="border rounded-lg bg-white dark:bg-zinc-900 px-4">
                                <AccordionTrigger className="hover:no-underline py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                            <ShieldCheck className="h-4 w-4 text-purple-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs font-bold">3단계: 통관 처리</p>
                                            <p className="text-[10px] text-muted-foreground font-normal">통관 목록 수리 완료 (유니패스 연동)</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-4 border-t pt-4 space-y-3">
                                    <div className="bg-slate-50 dark:bg-zinc-800 p-3 rounded-lg border text-[11px] space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">화물관리번호</span>
                                            <span className="font-mono font-bold">24-YZB4477000201</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">통관 상태</span>
                                            <Badge className="bg-purple-600 h-4 text-[9px]">통관완료</Badge>
                                        </div>
                                    </div>
                                    <div className="space-y-4 relative pl-4 border-l ml-2 pt-2 text-[11px]">
                                        <div className="relative">
                                            <div className="absolute -left-5 top-1 h-2 w-2 rounded-full bg-purple-600" />
                                            <p className="font-bold">통관목록 수리</p>
                                            <p className="text-muted-foreground italic">1월 27일 13:46</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* 4. Domestic */}
                            <AccordionItem value="item-4" className="border rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 px-4">
                                <AccordionTrigger className="hover:no-underline py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                            <Home className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs font-bold">4단계: 국내 배송</p>
                                            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">배송 완료 🏠</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-4 border-t border-blue-100 dark:border-blue-900 pt-4 space-y-4">
                                    <div className="flex justify-between items-center bg-white dark:bg-zinc-900 border p-2 rounded text-[11px]">
                                        <span className="text-muted-foreground">CJ대한통운: 509501161401</span>
                                        <Button variant="ghost" size="icon" className="h-5 w-5"><Copy className="h-3 w-3" /></Button>
                                    </div>
                                    <div className="space-y-5 relative pl-4 border-l ml-2">
                                        <div className="relative">
                                            <div className="absolute -left-[21px] -top-1 h-4 w-4 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center">
                                                <Check className="h-2 w-2 text-white" />
                                            </div>
                                            <p className="text-xs font-bold text-blue-700 dark:text-blue-400">배달 완료</p>
                                            <p className="text-[10px] text-muted-foreground">1월 23일 20:21 | 문 앞에 놓고 갑니다~</p>
                                        </div>
                                        <div className="relative opacity-70">
                                            <div className="absolute -left-5 top-1 h-2 w-2 rounded-full bg-slate-300" />
                                            <p className="text-xs font-normal">배달 출발</p>
                                            <p className="text-[10px] text-muted-foreground">1월 23일 10:26</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </ScrollArea>

                <div className="p-4 border-t bg-white dark:bg-zinc-900 text-center">
                    <p className="text-[10px] text-muted-foreground">배송 데이터는 마켓 및 택배사로부터 실시간 수집되며 실제 상황과 약간의 시차가 있을 수 있습니다.</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

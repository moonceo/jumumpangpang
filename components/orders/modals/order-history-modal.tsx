"use client";

import { Order } from "@/types/order";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    History,
    Search,
    X,
    Circle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderHistoryModalProps {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function OrderHistoryModal({ order, open, onOpenChange }: OrderHistoryModalProps) {
    if (!order) return null;

    // Mock timeline events based on benchmark
    const events = [
        {
            actor: "주문팡팡 AI",
            time: "약 3시간 전",
            title: "통관부호 입력 링크 생성",
            details: [
                { label: "링크 토큰", value: "E9BC.AIW" }
            ],
            type: "system"
        },
        {
            actor: "주문팡팡 AI",
            time: "약 3시간 전",
            title: "주문 수집 완료",
            details: [
                { label: "마켓", value: "네이버 스마트스토어" },
                { label: "마켓 주문번호", value: order.marketOrderId }
            ],
            type: "system"
        },
        {
            actor: "마켓",
            time: "약 3시간 전",
            title: "주문 생성됨",
            details: [
                { label: "마켓", value: "네이버 스마트스토어" },
                { label: "마켓 주문번호", value: order.marketOrderId },
                { label: "주문번호", value: order.id },
                { label: "상품 수", value: "1" }
            ],
            type: "market"
        }
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl h-[70vh] flex flex-col">
                <DialogHeader className="p-6 border-b border-slate-100 shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-lg font-bold text-slate-900">주문 히스토리</DialogTitle>
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] text-slate-400 font-mono">주문번호: {order.id}</span>
                                <span className="text-slate-200">|</span>
                                <span className="text-[11px] text-slate-400 font-bold">총 {events.length}개 이벤트</span>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-hidden bg-white">
                    <ScrollArea className="h-full px-6 py-8">
                        <div className="relative space-y-10 before:absolute before:inset-0 before:left-3 before:h-full before:w-[1.5px] before:bg-slate-100">
                            {events.map((event, idx) => (
                                <div key={idx} className="relative flex gap-6">
                                    {/* Timeline Marker */}
                                    <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white border-2 border-slate-200 shadow-sm">
                                        <div className={cn(
                                            "h-2 w-2 rounded-full",
                                            event.type === 'system' ? "bg-blue-500" : "bg-slate-400"
                                        )} />
                                    </div>

                                    {/* Event Card */}
                                    <div className="flex-1 space-y-2 pb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] font-bold text-slate-700">{event.actor}</span>
                                            <span className="text-[10px] text-slate-300 font-medium">약 3시간 전</span>
                                        </div>

                                        <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100/60 shadow-sm space-y-2">
                                            <h4 className="text-[13px] font-bold text-slate-800 break-all leading-tight">
                                                {event.title}
                                            </h4>

                                            {event.details && event.details.length > 0 && (
                                                <div className="space-y-1.5 pt-1 border-t border-slate-200/50">
                                                    {event.details.map((detail, dIdx) => (
                                                        <div key={dIdx} className="flex gap-2 text-[11px]">
                                                            <span className="text-slate-400 font-medium shrink-0 min-w-[70px]">{detail.label}</span>
                                                            <span className="text-slate-600 font-bold break-all">{detail.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Start Anchor */}
                            <div className="absolute bottom-0 left-[11px] h-2 w-2 border-2 border-slate-200 bg-white rounded-full -mb-2" />
                        </div>
                    </ScrollArea>
                </div>

                <div className="p-4 border-t bg-slate-50/50 text-center shrink-0">
                    <p className="text-[10px] text-slate-400 font-medium">
                        모든 시스템 로그는 기록 시점으로부터 1년간 안전하게 보관됩니다.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

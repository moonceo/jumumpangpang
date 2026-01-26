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
    ClipboardList,
    Warehouse,
    User,
    Cpu,
    Settings,
    ChevronRight,
    Search
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderHistoryModalProps {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function OrderHistoryModal({ order, open, onOpenChange }: OrderHistoryModalProps) {
    if (!order) return null;

    // Mock timeline events for demonstration
    const events = [
        {
            category: "배대지",
            icon: <Warehouse className="h-3 w-3" />,
            color: "text-orange-500 bg-orange-50",
            title: "국제 배송 시작",
            date: "3월 3일 14:20",
            details: "출발지: 중국도 -> 배송대행지 | 송장: Z4357046134342"
        },
        {
            category: "배대지",
            icon: <Warehouse className="h-3 w-3" />,
            color: "text-orange-500 bg-orange-50",
            title: "검수 완료",
            date: "2월 28일 09:15",
            details: "사진 8장 업로드 완료 | 검수 결과: 정상"
        },
        {
            category: "주문팡팡 AI",
            icon: <Cpu className="h-3 w-3" />,
            color: "text-purple-500 bg-purple-50",
            title: "오류 입고 무시됨",
            date: "2월 28일 08:30",
            details: "자동 처리 로그 | cause: Inbound_Error (사소한 박스 훼손)"
        },
        {
            category: "셀러",
            icon: <User className="h-3 w-3" />,
            color: "text-blue-500 bg-blue-50",
            title: "소싱 주문 환불",
            date: "2월 28일 07:44",
            details: "소싱 주문 ID: aQr1RCB1p7GT9wrZ | 환불 사유: 재고 부족"
        },
        {
            category: "시스템",
            icon: <Settings className="h-3 w-3" />,
            color: "text-slate-500 bg-slate-50",
            title: "마켓 주문 수집",
            date: "1월 24일 10:00",
            details: "네이버 스마트스토어로부터 주문 데이터 정상 수집 완료"
        }
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl max-h-[80vh] p-0 flex flex-col">
                <DialogHeader className="p-6 border-b flex flex-row items-center justify-between">
                    <div className="space-y-1">
                        <DialogTitle className="text-lg flex items-center gap-2">
                            <ClipboardList className="h-5 w-5 text-slate-500" />
                            주문 히스토리
                        </DialogTitle>
                        <p className="text-xs text-muted-foreground">총 {events.length}개의 이벤트가 기록되었습니다.</p>
                    </div>
                    <div className="relative w-40">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                        <input className="w-full h-8 pl-7 pr-2 text-[10px] border rounded bg-muted/20 outline-none" placeholder="로그 검색..." />
                    </div>
                </DialogHeader>

                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                        {events.map((event, idx) => (
                            <div key={idx} className="relative flex items-start gap-6 group">
                                <div className={cn(
                                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm z-10 transition-transform group-hover:scale-110",
                                    event.color
                                )}>
                                    {event.icon}
                                </div>
                                <div className="flex-1 space-y-1 pt-0.5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{event.category}</span>
                                            <Badge variant="outline" className="text-[9px] h-3.5 px-1 font-normal opacity-50">#ID-{1000 + idx}</Badge>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground tabular-nums">{event.date}</span>
                                    </div>
                                    <h4 className="text-sm font-bold">{event.title}</h4>
                                    <div className="bg-muted/30 p-2.5 rounded border border-dashed text-xs text-muted-foreground leading-relaxed">
                                        {event.details}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="p-4 border-t bg-slate-50 text-center">
                    <p className="text-[10px] text-muted-foreground">모든 시스템 작업과 사용자 피드백은 기록 후 1년간 보관됩니다.</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

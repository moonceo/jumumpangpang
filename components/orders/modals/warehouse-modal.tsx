"use client";

import { Order } from "@/types/order";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import {
    Package,
    MessageSquare,
    Camera,
    ShieldCheck
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface WarehouseModalProps {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function WarehouseModal({ order, open, onOpenChange }: WarehouseModalProps) {
    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
                <DialogHeader className="p-6 pb-2 border-b">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-xl flex items-center gap-2">
                                <Package className="h-5 w-5 text-orange-500" />
                                배송대행지 관리
                            </DialogTitle>
                            <DialogDescription className="text-xs">
                                배대지 입고 현황 및 정밀 검증 정보를 관리합니다.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <Tabs defaultValue="wh-1" className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 border-b bg-muted/20">
                        <TabsList className="h-10 bg-transparent gap-4">
                            <TabsTrigger
                                value="wh-1"
                                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 py-2 text-xs"
                            >
                                584997 - {order.status}
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
                        {/* Left Side: Info & Photos */}
                        <div className="md:col-span-7 border-r overflow-y-auto p-6 space-y-8">
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                                        <Package className="h-4 w-4 text-blue-500" />
                                        운송/통관 비용 내역
                                    </h3>
                                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 font-bold px-2 py-0.5 text-[10px]">
                                        {order.warehouse?.shippingMethod === 'air' ? '항공 운송' : '해상 운송 (인천)'}
                                    </Badge>
                                </div>
                                <div className="bg-slate-50 dark:bg-zinc-900 border border-dashed rounded-xl p-5 space-y-4 shadow-sm">
                                    <div className="flex justify-between items-end border-b pb-3 border-slate-200">
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">수입 통관 / 국내 배송비</span>
                                            <div className="text-2xl font-black text-slate-900 leading-none">
                                                {new Intl.NumberFormat('ko-KR').format(order.warehouse?.shippingCost || 0)}원
                                            </div>
                                        </div>
                                        <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-blue-200 shadow-md">결제하기</Button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>기본 운송료 ({order.warehouse?.weight}kg)</span>
                                            <span className="text-slate-900 font-medium">8,800원</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>통관 수수료/세금</span>
                                            <span className="text-slate-900 font-medium">+303원</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>정밀 검수</span>
                                            <span className="text-slate-900 font-medium">+2,000원</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>포장 대행료</span>
                                            <span className="text-slate-900 font-medium">+0원</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-green-500" />
                                    부가 서비스 현황
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className={cn(
                                        "flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer hover:border-blue-400 group",
                                        order.warehouse?.services?.inspection === 'precision' ? "bg-blue-50/50 border-blue-200" : "bg-white border-slate-200"
                                    )}>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-900">정밀 검수</span>
                                            <span className="text-[10px] text-muted-foreground">실물 사진 기반 상세 검수</span>
                                        </div>
                                        <div className={cn(
                                            "h-5 w-9 rounded-full relative transition-colors",
                                            order.warehouse?.services?.inspection === 'precision' ? "bg-blue-600" : "bg-slate-200"
                                        )}>
                                            <div className={cn(
                                                "h-3.5 w-3.5 bg-white rounded-full absolute top-[3px] transition-all",
                                                order.warehouse?.services?.inspection === 'precision' ? "right-[3.5px]" : "left-[3.5px]"
                                            )} />
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer hover:border-blue-400",
                                        order.warehouse?.services?.packaging === 'corner' ? "bg-blue-50/50 border-blue-200" : "bg-white border-slate-200"
                                    )}>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-900">안심 포장 (코너)</span>
                                            <span className="text-[10px] text-muted-foreground">충격 방지 보완 포장</span>
                                        </div>
                                        <div className={cn(
                                            "h-5 w-9 rounded-full relative transition-colors bg-blue-600"
                                        )}>
                                            <div className="h-3.5 w-3.5 bg-white rounded-full absolute top-[3px] right-[3.5px]" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white group cursor-not-allowed">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-900">작동 확인</span>
                                            <span className="text-[10px] text-muted-foreground">전원 및 기능 정상 작동 확인</span>
                                        </div>
                                        <div className="h-5 w-9 rounded-full relative bg-slate-200">
                                            <div className="h-3.5 w-3.5 bg-white rounded-full absolute top-[3px] left-[3.5px]" />
                                        </div>
                                    </div>
                                    {order.warehouse?.services?.etc?.map((extra, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-blue-200 bg-blue-50/50">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-900">{extra}</span>
                                                <span className="text-[10px] text-muted-foreground">신청 완료</span>
                                            </div>
                                            <div className="h-5 w-9 rounded-full relative bg-blue-600 font-black text-[8px] text-white flex items-center justify-center">ON</div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                                        <Camera className="h-4 w-4 text-orange-500" />
                                        검수 실물 사진
                                        <span className="text-[10px] text-muted-foreground font-normal ml-1">총 8장 수집됨</span>
                                    </h3>
                                    <Button variant="ghost" className="h-7 text-[10px] text-blue-600 font-bold hover:bg-blue-50">전체 다운로드</Button>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <div key={i} className="relative aspect-square rounded-lg border border-slate-200 overflow-hidden bg-slate-100 group cursor-pointer shadow-sm hover:ring-2 hover:ring-blue-400 transition-all">
                                            <Image
                                                src={order.warehouse?.inspectionPhotos?.[i % (order.warehouse?.inspectionPhotos?.length || 1)] || "https://images.unsplash.com/photo-1595246140625-573b715d1128?w=150&h=150&fit=crop"}
                                                alt=""
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                                <Camera className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <div className="pt-4 grid grid-cols-2 gap-2">
                                <Button variant="outline" className="h-10 text-xs font-bold shadow-sm border-slate-300">합배송/분할 신청</Button>
                                <Button variant="outline" className="h-10 text-xs font-bold shadow-sm border-slate-300 text-red-600 hover:bg-red-50 hover:border-red-200">반품 신청서 작성</Button>
                            </div>
                        </div>

                        {/* Right Side: Chat */}
                        <div className="md:col-span-5 flex flex-col bg-muted/5">
                            <div className="p-4 border-b bg-background/50 backdrop-blur">
                                <h3 className="font-semibold text-sm flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-blue-500" />
                                    배대지 1:1 문의
                                </h3>
                            </div>
                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4 text-xs">
                                    <div className="bg-white p-3 rounded-lg border max-w-[85%] shadow-sm">
                                        <p className="font-bold mb-1 text-slate-500">배대지 담당자</p>
                                        안녕하세요. 요청하신 정밀검수 완료되었습니다. 사진 확인 부탁드립니다.
                                    </div>
                                    <div className="bg-blue-600 text-white p-3 rounded-lg ml-auto max-w-[85%] shadow-sm">
                                        확인했습니다. 출고 진행해주세요.
                                    </div>
                                </div>
                            </ScrollArea>
                            <div className="p-3 border-t bg-background space-y-2">
                                <textarea className="w-full h-20 p-3 text-xs border rounded-lg outline-none resize-none focus:ring-1 focus:ring-blue-500" placeholder="문의 내용을 입력하세요..." />
                                <div className="flex justify-end">
                                    <Button size="sm" className="h-8 text-xs bg-blue-600 hover:bg-blue-700">전송</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

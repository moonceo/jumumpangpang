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
    Camera
} from "lucide-react";
import Image from "next/image";

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
                                    <h3 className="font-semibold text-sm">확정 배송대행비</h3>
                                    <Badge variant="secondary" className="bg-orange-50 text-orange-700">
                                        실무게 1.8kg (적용 2.0kg)
                                    </Badge>
                                </div>
                                <div className="bg-muted/40 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between items-center text-sm text-foreground font-bold">
                                        <span>합계</span>
                                        <span className="text-orange-600">11,103원</span>
                                    </div>
                                    <Separator />
                                    <div className="text-[11px] text-muted-foreground space-y-1">
                                        <div className="flex justify-between"><span>기본 배송비 (해운)</span><span>8,800원</span></div>
                                        <div className="flex justify-between"><span>정밀 검수</span><span>+2,000원</span></div>
                                        <div className="flex justify-between"><span>통관 수수료</span><span>+303원</span></div>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-sm flex items-center gap-2">
                                        <Camera className="h-4 w-4" />
                                        검수 사진 (8)
                                    </h3>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <div key={i} className="relative aspect-square rounded border overflow-hidden bg-slate-100">
                                            <Image
                                                src={order.warehouse?.inspectionPhotos?.[i % (order.warehouse?.inspectionPhotos?.length || 1)] || "https://images.unsplash.com/photo-1595246140625-573b715d1128?w=150&h=150&fit=crop"}
                                                alt=""
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" className="h-9 text-xs">합배송 하기</Button>
                                <Button variant="outline" className="h-9 text-xs">배대지 주문서 분할 관리</Button>
                                <Button variant="outline" className="h-9 text-xs">반품신청서 작성</Button>
                                <Button variant="outline" className="h-9 text-xs">포장 보완 요청</Button>
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

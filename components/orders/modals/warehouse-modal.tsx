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
                                        적용무게 {order.warehouse?.weight || "0.0"}kg
                                    </Badge>
                                </div>
                                <div className="bg-muted/40 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between items-center text-sm text-foreground font-bold">
                                        <span>합계</span>
                                        <span className="text-orange-600">11,103원</span>
                                    </div>
                                    <Separator />
                                    <div className="text-[10px] text-muted-foreground space-y-1">
                                        <div className="flex justify-between"><span>배송비용</span><span>8,600원</span></div>
                                        <div className="flex justify-between"><span>부가서비스</span><span>+5,000원</span></div>
                                        <div className="flex justify-between text-red-500"><span>결제 수수료</span><span>-497원</span></div>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-sm flex items-center gap-2">
                                        <Camera className="h-4 w-4" />
                                        검수 사진 ({order.warehouse?.inspectionPhotos?.length || 0})
                                    </h3>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {order.warehouse?.inspectionPhotos?.map((photo, i) => (
                                        <div key={i} className="relative aspect-square rounded border overflow-hidden">
                                            <Image src={photo} alt="" fill className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="shipping" className="border rounded px-4 py-1 mb-2">
                                    <AccordionTrigger className="text-sm font-medium">배송 방법</AccordionTrigger>
                                    <AccordionContent className="space-y-3">
                                        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">항공 배송을 추천합니다.</div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <Button size="sm" variant="outline" className="text-xs h-8 border-blue-500">항공</Button>
                                            <Button size="sm" variant="outline" className="text-xs h-8">해운(인)</Button>
                                            <Button size="sm" variant="outline" className="text-xs h-8">해운(평)</Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                        {/* Right Side: Chat */}
                        <div className="md:col-span-5 flex flex-col bg-muted/5">
                            <div className="p-4 border-b bg-background/50 backdrop-blur">
                                <h3 className="font-semibold text-sm flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-blue-500" />
                                    배대지 채팅
                                </h3>
                            </div>
                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4 text-xs">
                                    <div className="bg-white p-2 rounded border max-w-[80%]">안녕하세요, 박스가 훼손되어 사진 확인 부탁드립니다.</div>
                                    <div className="bg-blue-600 text-white p-2 rounded ml-auto max-w-[80%]">확인했습니다. 내용물은 멀쩡할까요?</div>
                                </div>
                            </ScrollArea>
                            <div className="p-4 border-t bg-background space-y-2">
                                <div className="flex gap-1 overflow-x-auto pb-1">
                                    <Button variant="outline" className="h-6 text-[10px] whitespace-nowrap">반품신청</Button>
                                    <Button variant="outline" className="h-6 text-[10px] whitespace-nowrap">포장보완</Button>
                                </div>
                                <textarea className="w-full h-16 p-2 text-xs border rounded outline-none resize-none" placeholder="내용 입력..." />
                                <Button className="w-full h-8 text-xs">전송</Button>
                            </div>
                        </div>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

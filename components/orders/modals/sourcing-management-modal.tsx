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
import { Checkbox } from "@/components/ui/checkbox";
import {
    ShoppingBag,
    MessageSquare,
    RefreshCw,
    AlertCircle,
    ArrowRight,
    MapPin,
    FileText
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SourcingManagementModalProps {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SourcingManagementModal({ order, open, onOpenChange }: SourcingManagementModalProps) {
    const [activeTab, setActiveTab] = useState("chat"); // chat (Step 1), warehouse (Step 2)
    const [isAddressSecured, setIsAddressSecured] = useState(false);

    if (!order) return null;

    const handleTabChange = (val: string) => {
        if (val === "warehouse" && !isAddressSecured) {
            toast.error("먼저 판매자와 채팅하여 반품지 주소를 확보해주세요.");
            return;
        }
        setActiveTab(val);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
                <DialogHeader className="p-6 pb-2 border-b">
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-purple-500" />
                        소싱주문 관리 (주문번호: 2025123091933711)
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        판매자와의 대화 및 주문 상태를 관리합니다.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[500px]">
                    {/* Left: Order Info & Margin */}
                    <div className="md:col-span-4 border-r p-6 bg-slate-50 dark:bg-zinc-900/50 space-y-6 overflow-y-auto">
                        <section className="space-y-3">
                            <h3 className="font-semibold text-sm flex items-center gap-2">
                                <FileText className="h-4 w-4 text-purple-600" />
                                소싱 주문 정보
                            </h3>
                            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border shadow-sm space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">상품 금액</span>
                                    <span>6,074원</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">현지 배송비</span>
                                    <span>0원</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold">
                                    <span>총 결제 금액</span>
                                    <span className="text-purple-600">6,074원</span>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-3">
                            <h3 className="font-semibold text-sm flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-red-500" />
                                수익 분석 (예상)
                            </h3>
                            <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 border border-red-200 dark:border-red-900 space-y-2 text-sm">
                                <div className="flex justify-between text-red-700 dark:text-red-400">
                                    <span>예상 순마진</span>
                                    <span className="font-bold">-399원</span>
                                </div>
                                <div className="flex justify-between text-xs text-red-600/80">
                                    <span>마진율</span>
                                    <span>-2.6%</span>
                                </div>
                            </div>
                        </section>

                        <div className="pt-4 space-y-2">
                            <Button className="w-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-50" variant="outline">
                                재발송 요청
                            </Button>
                            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
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
                                        亲，这边已经发货了，请耐心等待一下。
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
            </DialogContent>
        </Dialog>
    );
}

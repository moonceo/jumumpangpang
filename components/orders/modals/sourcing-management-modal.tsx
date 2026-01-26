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
                        소싱 반품 관리
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        중국 판매자 협의부터 배대지 반품 신청까지 2단계 프로세스를 진행합니다.
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 border-b bg-muted/20">
                        <TabsList className="h-12 bg-transparent gap-6">
                            <TabsTrigger
                                value="chat"
                                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 rounded-none px-2 py-3 text-sm"
                            >
                                1단계: 판매자 협의 (채팅)
                            </TabsTrigger>
                            <TabsTrigger
                                value="warehouse"
                                disabled={!isAddressSecured}
                                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 rounded-none px-2 py-3 text-sm disabled:opacity-40"
                            >
                                <div className="flex items-center gap-1.5">
                                    2단계: 배대지 반품 신청
                                    {!isAddressSecured && <AlertCircle className="h-3 w-3 text-muted-foreground" />}
                                </div>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        {/* Step 1: Chat & Address Security */}
                        <TabsContent value="chat" className="h-full m-0 p-0 grid grid-cols-1 md:grid-cols-12 h-full">
                            {/* Left: Guide & Check */}
                            <div className="md:col-span-4 border-r p-6 bg-slate-50 dark:bg-zinc-900/50 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-sm flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-purple-600" />
                                        반품 프로세스 안내
                                    </h3>
                                    <div className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                                        <p>1. 우측 채팅창을 통해 판매자에게 반품 의사를 밝히세요.</p>
                                        <p>2. 판매자가 제공하는 <strong>반품지 주소, 수취인, 전화번호</strong>를 확보하세요.</p>
                                        <p>3. 주소가 확보되었다면 아래 체크박스를 선택하여 다음 단계를 진행하세요.</p>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl border shadow-sm space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            id="address-check"
                                            checked={isAddressSecured}
                                            onCheckedChange={(c) => setIsAddressSecured(!!c)}
                                        />
                                        <label
                                            htmlFor="address-check"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-0.5 cursor-pointer"
                                        >
                                            반품지 주소를 확보했습니다.
                                        </label>
                                    </div>
                                    <Button
                                        className="w-full"
                                        disabled={!isAddressSecured}
                                        onClick={() => setActiveTab("warehouse")}
                                    >
                                        다음 단계로 이동 <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            </div>

                            {/* Right: Chat Interface */}
                            <div className="md:col-span-8 flex flex-col bg-white dark:bg-zinc-950">
                                {/* Chat Header */}
                                <div className="p-3 border-b flex justify-between items-center bg-muted/5">
                                    <span className="text-xs font-bold text-muted-foreground pl-2">실시간 번역 채팅</span>
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
                                                반품하고 싶습니다. 주소를 알려주세요.
                                                <div className="text-[10px] opacity-70 mt-1 pt-1 border-t border-white/20">I want to return it. Please give me the address.</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start space-y-1">
                                            <div className="bg-white border rounded-2xl rounded-tl-none px-4 py-2 text-sm max-w-[80%] shadow-sm">
                                                <span className="font-bold block mb-1 text-[10px] text-muted-foreground">Seller</span>
                                                亲，退货地址是：浙江省义乌市...
                                                <div className="text-[10px] text-purple-600 mt-1 pt-1 border-t font-medium">고객님, 반품 주소는: 저장성 이우시... 입니다.</div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollArea>
                                {/* Input Area */}
                                <div className="p-3 border-t">
                                    <div className="relative">
                                        <input className="w-full border rounded-full px-4 py-2.5 text-sm pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="메시지를 입력하세요 (자동 번역됨)" />
                                        <Button size="icon" className="absolute right-1 top-1 h-7 w-7 rounded-full bg-purple-600"><ArrowRight className="h-3 w-3" /></Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Step 2: Warehouse Application form */}
                        <TabsContent value="warehouse" className="h-full m-0 p-8 grid place-items-center bg-slate-50 dark:bg-zinc-950">
                            <div className="max-w-md w-full space-y-6 text-center">
                                <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                    <FileText className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">반품 신청서 작성</h3>
                                    <p className="text-muted-foreground text-sm mt-2">
                                        확보한 주소 정보를 바탕으로 배대지에 반품 신청서를 전송합니다.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-zinc-900 border rounded-xl p-4 text-left space-y-3 shadow-sm">
                                    <div className="flex justify-between text-sm py-1 border-b border-dashed">
                                        <span className="text-muted-foreground">반품 방식</span>
                                        <span className="font-medium">직접 택배 발송 (선불)</span>
                                    </div>
                                    <div className="flex justify-between text-sm py-1 border-b border-dashed">
                                        <span className="text-muted-foreground">수취인</span>
                                        <span className="font-medium">Wang Li (Seller)</span>
                                    </div>
                                    <div className="flex justify-between text-sm py-1">
                                        <span className="text-muted-foreground">반품 사유</span>
                                        <span className="font-medium">단순 변심</span>
                                    </div>
                                </div>

                                <Button size="lg" className="w-full font-bold bg-green-600 hover:bg-green-700" onClick={() => {
                                    toast.success("반품 신청서가 배대지로 전송되었습니다.");
                                    onOpenChange(false);
                                }}>
                                    신청서 전송하기
                                </Button>

                                <Button variant="ghost" className="text-xs text-muted-foreground" onClick={() => setActiveTab("chat")}>
                                    이전 단계로 돌아가기
                                </Button>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

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
            <DialogContent className="sm:max-w-[1240px] h-[85vh] p-0 overflow-hidden flex flex-col border-none shadow-2xl">
                <DialogHeader className="p-6 pb-4 bg-zinc-900 text-white shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-xl flex items-center gap-2">
                                <Package className="h-5 w-5 text-orange-400" />
                                배송대행지 관리 (Jumumpangpang Logistics)
                            </DialogTitle>
                            <DialogDescription className="text-zinc-400 text-xs">
                                마켓 주문번호: <span className="font-bold text-white">{order.marketOrderId}</span> | 화물관리번호: <span className="text-blue-400">24-YZB4477000201</span>
                            </DialogDescription>
                        </div>
                        <Badge variant="outline" className="px-3 py-1 bg-white/10 border-white/20 text-white font-bold">
                            {order.status}
                        </Badge>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 bg-white dark:bg-zinc-950">
                    {/* COL 1: Costs & Photos (4 cols) */}
                    <div className="md:col-span-4 border-r overflow-y-auto p-6 space-y-8 bg-slate-50/50">
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 uppercase">
                                    <Package className="h-4 w-4 text-blue-500" />
                                    운송/통관 비용 내역
                                </h3>
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 font-bold px-2 py-0.5 text-[10px]">
                                    {order.warehouse?.shippingMethod === 'air' ? '항공 운송' : '해상 운송 (인천)'}
                                </Badge>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 border rounded-xl p-5 space-y-4 shadow-sm">
                                <div className="flex justify-between items-end border-b pb-3 border-slate-100">
                                    <div className="space-y-1">
                                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">배송비 결제 요망</span>
                                        <div className="text-2xl font-black text-slate-900 leading-none">
                                            {new Intl.NumberFormat('ko-KR').format(order.warehouse?.shippingCost || 0)}원
                                        </div>
                                    </div>
                                    <Button size="sm" className="h-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg px-4 shadow-lg shadow-red-100">결제하기</Button>
                                </div>
                                <div className="space-y-2 text-xs">
                                    {[
                                        { label: "기본 운송료 (" + (order.warehouse?.weight || 0) + "kg)", price: "8,800원" },
                                        { label: "통관 수수료", price: "+303원" },
                                        { label: "정밀 검수 서비스", price: "+2,000원" },
                                        { label: "포장 보완료", price: "+0원" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-muted-foreground">
                                            <span>{item.label}</span>
                                            <span className="text-slate-900 font-medium">{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                                    <Camera className="h-4 w-4 text-orange-500" />
                                    검수 실물 사진
                                    <span className="text-[10px] text-muted-foreground font-normal ml-1">총 8장</span>
                                </h3>
                                <Button variant="ghost" className="h-7 text-[10px] text-blue-600 font-bold hover:bg-blue-50">전체 다운로드</Button>
                            </div>
                            <ScrollArea className="h-[300px] border rounded-lg p-2 bg-white">
                                <div className="grid grid-cols-2 gap-2">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <div key={i} className="relative aspect-square rounded-lg border border-slate-200 overflow-hidden bg-slate-100 group cursor-pointer shadow-sm hover:ring-2 hover:ring-blue-400 transition-all">
                                            <Image
                                                src={order.warehouse?.inspectionPhotos?.[i % (order.warehouse?.inspectionPhotos?.length || 1)] || `https://placehold.co/200x200?text=Photo+${i + 1}`}
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
                            </ScrollArea>
                        </section>
                    </div>

                    {/* COL 2: Info & Services (4 cols) */}
                    <div className="md:col-span-4 border-r overflow-y-auto p-6 space-y-8">
                        <section className="space-y-4">
                            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 uppercase">
                                <Package className="h-4 w-4 text-purple-500" />
                                주문 및 상품 정보
                            </h3>
                            <div className="bg-slate-50 rounded-xl p-4 border space-y-3">
                                <div className="flex gap-3">
                                    <div className="relative h-12 w-12 rounded-lg border overflow-hidden shrink-0">
                                        <Image src={order.product.thumbnail} alt="" fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold truncate">{order.product.name}</p>
                                        <p className="text-[10px] text-muted-foreground">{order.product.optionName} | {order.product.quantity}개</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-2 gap-y-2 text-[11px]">
                                    <div className="flex flex-col">
                                        <span className="text-muted-foreground">통관방식</span>
                                        <span className="font-medium">목록통관 (개인)</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-muted-foreground">HS CODE</span>
                                        <span className="font-medium text-blue-600">6109.10-1000</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 uppercase">
                                <ShieldCheck className="h-4 w-4 text-green-500" />
                                부가서비스 신청 (옵션)
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { id: "inspection", title: "정밀 검수", desc: "검수 사진 8장 이상 기본 제공", active: true },
                                    { id: "testing", title: "작동 검수", desc: "전자제품 전원 및 기능 확인", active: false },
                                    { id: "aircap", title: "에어캡 보완", desc: "완충재 추가 8겹 포장", active: true },
                                    { id: "corner", title: "코너 보호", desc: "박스 모서리 보호 보강", active: false },
                                    { id: "wood", title: "우드 패킹", desc: "파손 위험 큰 상품 나무 틀 고정", active: false }
                                ].map((service) => (
                                    <div key={service.id} className={cn(
                                        "flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer hover:border-blue-400 group",
                                        service.active ? "bg-blue-50/50 border-blue-200" : "bg-white border-slate-200"
                                    )}>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-900">{service.title}</span>
                                            <span className="text-[10px] text-muted-foreground">{service.desc}</span>
                                        </div>
                                        <div className={cn(
                                            "h-5 w-9 rounded-full relative transition-colors bg-slate-200",
                                            service.active && "bg-blue-600"
                                        )}>
                                            <div className={cn(
                                                "h-3.5 w-3.5 bg-white rounded-full absolute top-[3px] transition-all",
                                                service.active ? "right-[3.5px]" : "left-[3.5px]"
                                            )} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* COL 3: Chat (4 cols) */}
                    <div className="md:col-span-4 flex flex-col bg-slate-50/30">
                        <div className="p-4 border-b bg-white">
                            <h3 className="font-bold text-sm flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-blue-500" />
                                주문팡팡 물류 1:1 상담
                                <Badge className="ml-auto bg-green-500 animate-pulse h-2 w-2 rounded-full p-0" />
                            </h3>
                        </div>
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                <div className="flex flex-col items-start gap-1 max-w-[90%]">
                                    <span className="text-[9px] font-bold text-slate-500 ml-1">상담원 (현지 센터)</span>
                                    <div className="bg-white border p-3 rounded-2xl rounded-tl-none text-[11px] shadow-sm leading-relaxed">
                                        안녕하세요 셀러님, 해당 상품 입고 검수 중에 미세한 스크래치 발견되었습니다. 검수 사진 4번 참고 부탁드립니다. 진행할까요?
                                    </div>
                                    <span className="text-[8px] text-muted-foreground ml-1">오전 10:15</span>
                                </div>
                                <div className="flex flex-col items-end gap-1 ml-auto max-w-[90%]">
                                    <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none text-[11px] shadow-md shadow-blue-100 leading-relaxed">
                                        사진 확인했습니다. 이 정도는 괜찮으니 그대로 출고 진행 부탁드려요.
                                    </div>
                                    <span className="text-[8px] text-muted-foreground mr-1">오전 10:20</span>
                                </div>
                            </div>
                        </ScrollArea>
                        <div className="p-3 border-t bg-white m-4 rounded-xl shadow-sm border-slate-200">
                            <textarea
                                className="w-full h-20 text-[11px] bg-transparent outline-none resize-none placeholder:text-slate-400"
                                placeholder="물류센터 담당자에게 문의할 내용을 입력하세요..."
                            />
                            <div className="flex justify-end pt-2">
                                <Button size="sm" className="h-7 text-[10px] bg-blue-600 hover:bg-blue-700 font-bold px-4">전송</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t bg-slate-50 shrink-0 flex items-center justify-between gap-4">
                    <div className="flex gap-2">
                        <Button variant="outline" className="h-10 text-xs font-bold bg-white border-slate-200">합배송 하기</Button>
                        <Button variant="outline" className="h-10 text-xs font-bold bg-white border-slate-200">주문서 분할 관리</Button>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="h-10 text-xs font-bold bg-white border-red-200 text-red-600 hover:bg-red-50">반품신청서 작성</Button>
                        <Button variant="outline" className="h-10 text-xs font-bold bg-white border-slate-200">포장 보완 요청</Button>
                        <Separator orientation="vertical" className="h-10 mx-1" />
                        <Button variant="ghost" className="h-10 text-xs font-bold" onClick={() => onOpenChange(false)}>닫기</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

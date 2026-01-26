"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Clock, Smartphone, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NotificationsPage() {
    const [useEtiquette, setUseEtiquette] = useState(true);
    const [hideCancel, setHideCancel] = useState(false);
    const [includeFee, setIncludeFee] = useState(false);
    const [activeTemplate, setActiveTemplate] = useState("pccc"); // pccc, local_shipping, outbound

    // Mock template text
    const getTemplateText = (type: string) => {
        switch (type) {
            case 'pccc':
                return `[주문팡팡] 안녕하세요 고객님.\n주문하신 상품의 통관을 위해 '개인통관고유부호'가 필요합니다.\n\n아래 링크를 통해 입력해주시면 신속하게 발송해 드리겠습니다.`;
            case 'local_shipping':
                return `[주문팡팡] 고객님, 주문하신 상품이 현지 배송을 시작했습니다.\n\n꼼꼼하게 검수하여 안전하게 보내드리겠습니다.`;
            case 'outbound':
                return `[주문팡팡] 드디어 한국으로 출발했습니다! ✈️\n\n통관 완료 후 국내 택배사를 통해 배송될 예정입니다. 조금만 기다려주세요!`;
            default: return "";
        }
    };

    return (
        <div className="space-y-8 max-w-6xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">고객 알림 설정</h1>
                <p className="text-muted-foreground mt-2">
                    배송 단계별 알림톡 자동 발송을 설정하여 CS 문의를 줄이세요.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
                {/* Settings Column */}
                <div className="lg:col-span-7 space-y-6">
                    {/* 1. Triggers */}
                    <Card>
                        <CardHeader>
                            <CardTitle>자동 발송 단계</CardTitle>
                            <CardDescription>알림을 보낼 시점을 선택하세요.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">1. 통관부호 미입력 시 요청</Label>
                                    <p className="text-sm text-muted-foreground">누락된 고객에게 3회 자동 리마인드</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">2. 현지 배송 시작 알림</Label>
                                    <p className="text-sm text-muted-foreground">소싱 완료 및 트래킹 입력 시 발송</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">3. 배대지 출고 알림 (한국 발송)</Label>
                                    <p className="text-sm text-muted-foreground">국제 배송 시작 시 발송</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. Etiquette */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                발송 제한 시간 (에티켓)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-muted-foreground">야간 등 원치 않는 시간대에는 발송을 보류합니다.</span>
                                <Switch checked={useEtiquette} onCheckedChange={setUseEtiquette} />
                            </div>

                            {useEtiquette && (
                                <div className="flex items-center gap-4">
                                    <div className="grid gap-1.5 flex-1">
                                        <Label>발송 시작</Label>
                                        <Input type="time" defaultValue="09:00" />
                                    </div>
                                    <div className="grid gap-1.5 flex-1">
                                        <Label>발송 종료</Label>
                                        <Input type="time" defaultValue="20:00" />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* 3. Template Customization */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                메시지 문구 설정
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="pccc" onValueChange={setActiveTemplate} className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="pccc">통관부호 요청</TabsTrigger>
                                    <TabsTrigger value="local_shipping">현지배송 시작</TabsTrigger>
                                    <TabsTrigger value="outbound">배대지 출고</TabsTrigger>
                                </TabsList>

                                <div className="mt-4 space-y-4">
                                    <div className="space-y-2">
                                        <Label>템플릿 내용</Label>
                                        <Textarea
                                            className="min-h-[150px] resize-none font-sans"
                                            defaultValue={getTemplateText(activeTemplate)}
                                        />
                                        <p className="text-xs text-muted-foreground text-right">{activeTemplate === 'pccc' ? '입력 링크가 자동으로 하단에 첨부됩니다.' : '주문 정보가 자동으로 포함됩니다.'}</p>
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border p-3 bg-slate-50 dark:bg-slate-900">
                                        <div className="space-y-0.5">
                                            <Label>주문 취소 버튼 숨기기</Label>
                                            <p className="text-xs text-muted-foreground">단순 변심 취소를 방지합니다.</p>
                                        </div>
                                        <Switch checked={hideCancel} onCheckedChange={setHideCancel} />
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg border p-3 bg-slate-50 dark:bg-slate-900">
                                        <div className="space-y-0.5">
                                            <Label>관부가세/경동 택배비 안내 추가</Label>
                                            <p className="text-xs text-muted-foreground">발생 가능한 추가 비용을 안내합니다.</p>
                                        </div>
                                        <Switch checked={includeFee} onCheckedChange={setIncludeFee} />
                                    </div>
                                </div>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button size="lg" onClick={() => toast.success("설정이 저장되었습니다.")}>
                            설정 저장하기
                        </Button>
                    </div>
                </div>

                {/* Preview Column */}
                <div className="lg:col-span-5 hidden lg:block sticky top-8">
                    <div className="flex items-center justify-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
                        <Smartphone className="h-4 w-4" />
                        모바일 미리보기
                    </div>

                    <div className="mx-auto w-[320px] h-[640px] border-[8px] border-slate-900 rounded-[3rem] bg-slate-100 overflow-hidden relative shadow-2xl">
                        {/* Status Bar */}
                        <div className="h-6 bg-slate-900 w-full" />

                        {/* Chat Header */}
                        <div className="bg-[#aab0b7] p-3 text-xs text-center text-white/90 font-medium">
                            2024년 1월 23일 화요일
                        </div>

                        {/* Chat Bubble */}
                        <div className="p-4 space-y-2">
                            <div className="flex gap-2">
                                <div className="h-8 w-8 rounded-[12px] bg-yellow-400 flex-shrink-0" />
                                <div className="space-y-1 max-w-[75%]">
                                    <div className="text-[10px] text-gray-500 ml-1">주문팡팡 알림톡</div>
                                    <div className="bg-white rounded-[12px] rounded-tl-none p-3 shadow-sm text-[13px] leading-relaxed whitespace-pre-wrap">
                                        {getTemplateText(activeTemplate)}

                                        {/* Buttons */}
                                        <div className="mt-3 pt-3 border-t grid gap-1.5">
                                            <div className="bg-slate-100 py-2 text-center rounded text-xs font-medium text-slate-700">
                                                {activeTemplate === 'pccc' ? '통관부호 입력하기' : '배송 조회하기'}
                                            </div>
                                            {!hideCancel && (
                                                <div className="bg-slate-100 py-2 text-center rounded text-xs text-slate-500">
                                                    주문 취소하기
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="absolute bottom-0 w-full h-[60px] bg-white border-t flex items-center justify-center text-xs text-gray-300">
                            KakaoTalk
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

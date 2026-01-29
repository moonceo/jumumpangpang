"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Plus, Check, CreditCard, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketConnectionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function MarketConnectionModal({ open, onOpenChange }: MarketConnectionModalProps) {
    const [marketType, setMarketType] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCard, setSelectedCard] = useState("card1");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2 flex flex-row items-center gap-4">
                    <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center">
                        <div className="h-8 w-8 bg-slate-200 rounded" />
                    </div>
                    <div>
                        <DialogTitle className="text-xl font-bold">마켓 연동하기</DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            새로운 마켓을 추가합니다.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <div className="p-6 pt-2 space-y-8 max-h-[70vh] overflow-y-auto">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-800">기본 정보</h3>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">
                                    마켓플레이스 <span className="text-red-500">*</span>
                                </Label>
                                <Select onValueChange={setMarketType}>
                                    <SelectTrigger className="h-11">
                                        <SelectValue placeholder="선택하세요" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="naver">스마트스토어</SelectItem>
                                        <SelectItem value="coupang">쿠팡</SelectItem>
                                        <SelectItem value="11st">11번가</SelectItem>
                                        <SelectItem value="gmarket">G마켓</SelectItem>
                                        <SelectItem value="auction">옥션</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium">
                                    마켓 별명 <span className="text-red-500">*</span>
                                </Label>
                                <Input placeholder="마켓 이름을 입력하세요" className="h-11" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">
                                        마켓 로그인 ID <span className="text-red-500">*</span>
                                    </Label>
                                    <Input placeholder="cjstpsm98@gmail.com" className="h-11 bg-blue-50/30 border-blue-100" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">
                                        마켓 비밀번호 <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="h-11 pr-10 bg-blue-50/30 border-blue-100"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">
                                        사업자번호 (세무신고 기재용) <span className="text-red-500">*</span>
                                    </Label>
                                    <Input placeholder="000-00-00000" className="h-11" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">
                                        CS 전화번호 <span className="text-red-500">*</span>
                                    </Label>
                                    <Input placeholder="고객 문의 전화번호" className="h-11" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Card */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-800">결제 카드</h3>
                        <div className="space-y-3">
                            <div
                                onClick={() => setSelectedCard("card1")}
                                className={cn(
                                    "flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all",
                                    selectedCard === "card1"
                                        ? "border-emerald-400 bg-emerald-50/30"
                                        : "border-slate-100 hover:border-slate-200"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                                        selectedCard === "card1" ? "border-emerald-500 bg-emerald-500" : "border-slate-200"
                                    )}>
                                        {selectedCard === "card1" && <div className="h-2 w-2 rounded-full bg-white" />}
                                    </div>
                                    <div className="h-10 w-12 bg-white border rounded flex items-center justify-center">
                                        <CreditCard className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800">[비씨] ****6832</div>
                                        <div className="text-xs text-slate-400">debit</div>
                                    </div>
                                </div>
                                {selectedCard === "card1" && <Check className="h-5 w-5 text-emerald-500" />}
                            </div>

                            <Button variant="outline" className="w-full h-11 border-dashed border-2 text-slate-600">
                                <Plus className="h-4 w-4 mr-2" />
                                새 카드 등록
                            </Button>
                        </div>
                    </div>

                    {/* Authentication Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-800">인증 정보</h3>
                        {!marketType ? (
                            <p className="text-sm text-slate-400">마켓플레이스를 먼저 선택해주세요.</p>
                        ) : (
                            <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                {marketType === 'naver' && (
                                    <>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-500 uppercase">애플리케이션 ID (Client ID)</Label>
                                            <Input placeholder="API ID 입력" className="h-10 bg-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-500 uppercase">애플리케이션 시크릿 (Client Secret)</Label>
                                            <Input type="password" placeholder="API Secret 입력" className="h-10 bg-white" />
                                        </div>
                                    </>
                                )}
                                {marketType === 'coupang' && (
                                    <>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-500 uppercase">업체 코드 (Company Code)</Label>
                                            <Input placeholder="A00..." className="h-10 bg-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-500 uppercase">Access Key</Label>
                                            <Input type="password" placeholder="Access Key 입력" className="h-10 bg-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-500 uppercase">Secret Key</Label>
                                            <Input type="password" placeholder="Secret Key 입력" className="h-10 bg-white" />
                                        </div>
                                        <div className="flex gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100 text-amber-700 text-[11px]">
                                            <AlertTriangle className="h-4 w-4 shrink-0" />
                                            쿠팡 API 키는 보안 상 180일마다 만료됩니다. 만료 전 재발급하여 갱신이 필요합니다.
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="p-6 pt-4 border-t gap-2 flex-row sm:justify-end bg-slate-50/50">
                    <Button
                        variant="ghost"
                        className="h-11 px-8 border bg-white text-slate-600 hover:bg-slate-50"
                        onClick={() => onOpenChange(false)}
                    >
                        취소
                    </Button>
                    <Button
                        className="h-11 px-8 bg-slate-400 hover:bg-slate-500 text-white font-bold"
                        onClick={() => {
                            // Add logic
                            onOpenChange(false);
                        }}
                    >
                        추가
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

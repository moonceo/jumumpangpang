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
import { CreditCard, Info } from "lucide-react";

interface CardRegistrationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CardRegistrationModal({ open, onOpenChange }: CardRegistrationModalProps) {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryMonth, setExpiryMonth] = useState("");
    const [expiryYear, setExpiryYear] = useState("");
    const [passwordPrefix, setPasswordPrefix] = useState("");
    const [birthOrBusiness, setBirthOrBusiness] = useState("");

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "").slice(0, 16);
        const formatted = val.match(/.{1,4}/g)?.join(" ") || "";
        setCardNumber(formatted);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-xl font-bold">새 카드 등록</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground mt-1">
                        결제에 사용할 카드를 등록해주세요.<br />
                        카드 정보는 안전하게 암호화되어 저장됩니다.
                    </DialogDescription>
                </DialogHeader>

                <div className="p-6 pt-2 space-y-6">
                    <div className="flex items-center gap-2 text-sm font-semibold border-b pb-4">
                        <CreditCard className="h-4 w-4" />
                        카드 정보
                    </div>

                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="cardNumber" className="text-sm font-medium">
                                카드번호 <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="cardNumber"
                                placeholder="0000 0000 0000 0000"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                className="h-12 text-lg tracking-widest border-2 focus-visible:ring-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">
                                    유효기간 <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        placeholder="MM"
                                        value={expiryMonth}
                                        onChange={(e) => setExpiryMonth(e.target.value.replace(/\D/g, "").slice(0, 2))}
                                        className="h-12 text-center text-lg bg-slate-50 border-none focus-visible:ring-blue-500"
                                    />
                                    <span className="text-xl font-light text-slate-300">/</span>
                                    <Input
                                        placeholder="YY"
                                        value={expiryYear}
                                        onChange={(e) => setExpiryYear(e.target.value.replace(/\D/g, "").slice(0, 2))}
                                        className="h-12 text-center text-lg bg-blue-50/50 border-none focus-visible:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                카드 비밀번호 앞 2자리 <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="password"
                                    placeholder="**"
                                    value={passwordPrefix}
                                    onChange={(e) => setPasswordPrefix(e.target.value.replace(/\D/g, "").slice(0, 2))}
                                    className="h-12 w-24 text-center text-lg bg-blue-50/50 border-none focus-visible:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                생년월일(YYMMDD) 또는 사업자번호 <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                placeholder="950101 또는 1234567890"
                                value={birthOrBusiness}
                                onChange={(e) => setBirthOrBusiness(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                className="h-12 text-lg border-slate-200 focus-visible:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <Info className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            카드 정보는 안전하게 암호화되어 저장됩니다. 실제 결제는 주문 처리 시 진행됩니다.
                        </p>
                    </div>
                </div>

                <DialogFooter className="p-6 pt-2 gap-2 flex-row sm:justify-end">
                    <Button
                        variant="ghost"
                        className="h-12 px-8 border text-slate-600 hover:bg-slate-50"
                        onClick={() => onOpenChange(false)}
                    >
                        취소
                    </Button>
                    <Button
                        className="h-12 px-8 bg-[#333742] hover:bg-[#252932] text-white"
                        onClick={() => {
                            // Registration logic would go here
                            onOpenChange(false);
                        }}
                    >
                        카드 등록
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Order } from "@/types/order";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TrackingInputModalProps {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TrackingInputModal({ order, open, onOpenChange }: TrackingInputModalProps) {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [courier, setCourier] = useState("CJ대한통운");

    if (!order) return null;

    // Logic: Coupang/ESM are Auto-sync (Blocked), Others (Naver/11st) are Manual (Allowed)
    // Note: Spec says 11st/Naver API limit -> Manual update required.
    // Coupang/ESM -> Auto update.
    const isAutoSyncMarket = order.marketType === 'coupang' || order.marketType === 'esm'; // Assuming 'esm' is a type

    // Spec specific text: "스마트스토어/11번가: API 제약으로 인해 자동 업데이트 불가"
    const isManualMarket = ['naver', '11st'].includes(order.marketType);

    const handleSubmit = () => {
        if (!trackingNumber) {
            toast.error("운송장 번호를 입력해주세요.");
            return;
        }
        toast.success(`[${order.marketOrderId}] 송장정보가 저장되었습니다.`);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>운송장 번호 입력</DialogTitle>
                    <DialogDescription>
                        구매자에게 발송할 국내 택배 운송장을 입력합니다.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Market Constraint Alert */}
                    {isAutoSyncMarket && (
                        <div className="bg-blue-50 text-blue-700 p-3 rounded-md flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                            <div>
                                <span className="font-bold">자동 동기화 지원</span>
                                <p className="text-xs mt-1 opacity-90">
                                    {order.marketType === 'coupang' ? '쿠팡' : 'ESM'} 주문은 시스템이 자동으로 실송장으로 변환하여 업로드합니다. 별도 작업이 필요 없습니다.
                                </p>
                            </div>
                        </div>
                    )}

                    {isManualMarket && (
                        <div className="bg-orange-50 text-orange-700 p-3 rounded-md flex items-start gap-2 text-sm border border-orange-100">
                            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                            <div>
                                <span className="font-bold">직접 입력 필요 (API 미지원)</span>
                                <p className="text-xs mt-1 opacity-90">
                                    {order.marketType === 'naver' ? '스마트스토어' : '11번가'} 정책상 API를 통한 송장 수정이 불가능합니다. 판매자 센터에서 직접 수정해주세요.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="courier" className="text-right">
                            택배사
                        </Label>
                        <Input
                            id="courier"
                            value={courier}
                            onChange={(e) => setCourier(e.target.value)}
                            className="col-span-3"
                            disabled={isAutoSyncMarket}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tracking" className="text-right">
                            운송장번호
                        </Label>
                        <Input
                            id="tracking"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            className="col-span-3"
                            placeholder={isAutoSyncMarket ? "자동 입력됨" : "숫자만 입력"}
                            disabled={isAutoSyncMarket}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>취소</Button>
                    {!isAutoSyncMarket && (
                        <Button onClick={handleSubmit}>저장하기</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

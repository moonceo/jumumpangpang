"use client";

import { Order } from "@/types/order";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Truck,
    ExternalLink,
    Copy,
    MapPin,
    Clock,
    CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

interface DomesticTrackingConfirmModalProps {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onFullTrackingClick?: () => void;
}

export function DomesticTrackingConfirmModal({
    order,
    open,
    onOpenChange,
    onFullTrackingClick
}: DomesticTrackingConfirmModalProps) {
    if (!order) return null;

    const tracking = order.domesticTracking;

    const handleCopyTracking = () => {
        if (tracking?.trackingNumber) {
            navigator.clipboard.writeText(tracking.trackingNumber);
            toast.success("송장번호가 복사되었습니다.");
        }
    };

    const handleExternalTracking = () => {
        // CJ대한통운 기준 예시 URL
        const carrierUrls: Record<string, string> = {
            'CJ대한통운': `https://www.cjlogistics.com/ko/tool/parcel/tracking?gnbInvcNo=${tracking?.trackingNumber}`,
            '한진택배': `https://www.hanjin.com/kor/CMS/DeliveryMgr/WaybillResult.do?mession-open=false&wblnum=${tracking?.trackingNumber}`,
            '롯데택배': `https://www.lotteglogis.com/home/reservation/tracking/linkView?InvNo=${tracking?.trackingNumber}`,
            '우체국택배': `https://service.epost.go.kr/trace.RetrieveDomRi498.postal?sid1=${tracking?.trackingNumber}`,
            '로젠택배': `https://www.ilogen.com/web/personal/trace/${tracking?.trackingNumber}`,
        };
        const url = carrierUrls[tracking?.carrier || ''] || `https://www.google.com/search?q=${tracking?.carrier}+${tracking?.trackingNumber}`;
        window.open(url, '_blank');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden flex flex-col gap-0 border-none">
                {/* Header */}
                <div className="p-6 pb-2 space-y-2 relative">
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-blue-500 to-blue-700 opacity-10" />
                    <DialogHeader className="space-y-2">
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            <Truck className="h-5 w-5 text-blue-600" />
                            국내 송장 확인
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            마켓 주문번호: <span className="font-bold text-slate-800">{order.marketOrderId}</span>
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* Content */}
                <div className="p-6 pt-2 space-y-6">
                    {tracking ? (
                        <>
                            {/* Carrier & Tracking Number */}
                            <div className="bg-slate-50 dark:bg-zinc-900 rounded-lg p-5 space-y-4 border">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Truck className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{tracking.carrier}</p>
                                            <p className="text-xs text-muted-foreground">국내 배송</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        송장 등록됨
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between bg-white dark:bg-zinc-800 rounded-lg p-3 border">
                                    <div>
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold">송장번호</p>
                                        <p className="text-lg font-mono font-bold">{tracking.trackingNumber}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 text-xs"
                                        onClick={handleCopyTracking}
                                    >
                                        <Copy className="h-3.5 w-3.5 mr-1" />
                                        복사
                                    </Button>
                                </div>

                                {tracking.updatedAt && (
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Clock className="h-3.5 w-3.5" />
                                        마지막 업데이트: {tracking.updatedAt}
                                    </div>
                                )}
                            </div>

                            {/* Recipient Quick Info */}
                            <div className="flex items-start gap-3 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-medium">{order.recipient.name}</p>
                                    <p className="text-xs text-muted-foreground">{order.recipient.address}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <Truck className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground">국내 송장 정보가 아직 등록되지 않았습니다.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t flex gap-3">
                    <Button
                        variant="ghost"
                        className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                        onClick={() => onOpenChange(false)}
                    >
                        닫기
                    </Button>
                    {tracking && (
                        <>
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={handleExternalTracking}
                            >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                택배사 조회
                            </Button>
                            <Button
                                className="flex-[1.5] bg-[#18181b] hover:bg-zinc-800 text-white"
                                onClick={() => {
                                    onOpenChange(false);
                                    onFullTrackingClick?.();
                                }}
                            >
                                전체 배송 추적
                            </Button>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

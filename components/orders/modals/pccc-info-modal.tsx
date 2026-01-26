"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, User, Phone, MapPin, MessageSquare, Shield, Clock } from "lucide-react";
import { Order } from "@/types/order";
import { toast } from "sonner";

interface PcccInfoModalProps {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PcccInfoModal({ order, open, onOpenChange }: PcccInfoModalProps) {
    if (!order) return null;

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("복사되었습니다");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        통관부호 정보
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* 고객 통관부호 입력 링크 */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <ExternalLink className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm mb-1">고객 통관부호 입력 링크</h3>
                                <p className="text-xs text-muted-foreground mb-2">
                                    고객에게 이 링크를 전달하여 직접 통관부호를 입력받을 수 있습니다
                                </p>
                                <div className="bg-white rounded border p-2 text-xs font-mono break-all">
                                    https://oms.refundy.co/forms/customs/j5Kjfzqx7Sfny3W4k8R1?token=5NH12QY9
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-2 h-7 text-xs text-blue-600"
                                    onClick={() => handleCopy("https://oms.refundy.co/forms/customs/j5Kjfzqx7Sfny3W4k8R1?token=5NH12QY9")}
                                >
                                    <Copy className="h-3 w-3 mr-1" />
                                    복사
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* 수령인 정보 */}
                    <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm">수령인 정보</h3>
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                수정
                            </Button>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{order.recipient.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{order.recipient.phone}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div className="flex-1">
                                    <div>{order.recipient.address}</div>
                                    {order.recipient.zipCode && (
                                        <div className="text-xs text-muted-foreground">({order.recipient.zipCode})</div>
                                    )}
                                    {order.recipient.deliveryMemo && (
                                        <div className="text-xs text-muted-foreground mt-1">
                                            성지아파트 2동 1005호
                                        </div>
                                    )}
                                </div>
                            </div>
                            {order.recipient.deliveryMemo && (
                                <div className="flex items-start gap-2">
                                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <span className="text-muted-foreground">{order.recipient.deliveryMemo}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 pt-2 border-t">
                                <Shield className="h-4 w-4 text-green-600" />
                                <span className="font-mono font-semibold">{order.recipient.pccc}</span>
                                <Badge variant="outline" className="ml-auto text-[10px] bg-green-50 text-green-600 border-green-200">
                                    통관부호 확인
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* 변경 이력 */}
                    <div className="border rounded-lg p-4">
                        <h3 className="font-semibold text-sm mb-3">변경 이력</h3>
                        <div className="flex items-start gap-3 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div className="flex-1">
                                <div className="font-medium">통관부호 입력 링크 생성</div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                    2026-01-22 11:22
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    고객용 통관부호 입력 링크가 생성되었습니다
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

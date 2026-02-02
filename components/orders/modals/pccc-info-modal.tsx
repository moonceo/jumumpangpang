"use client";

import { Order } from "@/types/order";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Copy,
    ExternalLink,
    User,
    Phone,
    MapPin,
    MessageSquare,
    ShieldCheck,
    Pencil,
    History as HistoryIcon,
    Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface PCCCInfoModalProps {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PCCCInfoModal({ order, open, onOpenChange }: PCCCInfoModalProps) {
    if (!order) return null;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("링크가 클립보드에 복사되었습니다.");
    };

    const shareLink = `https://oms.jumumpangpang.co/forms/customs/${order.id}?token=EB8CJIUM`;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl bg-white">
                <DialogHeader className="p-6 border-b border-slate-100 shrink-0">
                    <DialogTitle className="text-xl font-bold text-slate-900">통관부호 정보</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-6">
                    {/* Customer Link Section */}
                    <div className="p-5 rounded-2xl border-2 border-blue-100 bg-blue-50/30 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-blue-500 rounded-lg">
                                <ExternalLink className="h-5 w-5 text-white" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-blue-900">고객 통관부호 입력 링크</h4>
                                <p className="text-[12px] text-blue-700/70 leading-relaxed">
                                    고객에게 이 링크를 전달하여 직접 통관부호를 입력받을 수 있습니다.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex-1 bg-white border border-blue-200 rounded-xl px-4 py-3 text-[12px] text-slate-600 font-mono break-all line-clamp-2">
                                {shareLink}
                            </div>
                            <Button
                                variant="outline"
                                className="h-auto px-4 border-blue-200 text-blue-600 hover:bg-blue-50 bg-white shrink-0 font-bold gap-2"
                                onClick={() => copyToClipboard(shareLink)}
                            >
                                <Copy className="h-4 w-4" />
                                복사
                            </Button>
                        </div>
                    </div>

                    {/* Recipient Info Section */}
                    <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h4 className="text-sm font-bold text-slate-900">수령인 정보</h4>
                            <Button variant="ghost" size="sm" className="h-8 text-slate-500 gap-1.5 font-bold hover:bg-slate-50">
                                <Pencil className="h-3.5 w-3.5" />
                                수정
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
                                    <User className="h-4 w-4" />
                                </div>
                                <span className="text-sm text-slate-700 font-medium pt-0.5">{order.recipient.name}</span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <span className="text-sm text-slate-700 font-medium pt-0.5">{order.recipient.phone}</span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <span className="text-sm text-slate-700 font-medium pt-0.5 leading-relaxed">
                                    {order.recipient.address} ({order.recipient.zipCode})
                                </span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
                                    <MessageSquare className="h-4 w-4" />
                                </div>
                                <span className="text-sm text-slate-500 font-medium pt-0.5 line-clamp-2">
                                    4층 방범창 앞에 두시면 됩니다~
                                </span>
                            </div>
                            <div className="flex gap-4 items-start pt-2 border-t border-slate-50">
                                <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
                                    <ShieldCheck className="h-4 w-4" />
                                </div>
                                <div className="flex items-center gap-3 pt-0.5">
                                    <span className="text-sm text-slate-800 font-bold tracking-wider">{order.recipient.pccc || "P210004999667"}</span>
                                    <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50 px-2 py-0.5 text-[11px] font-bold gap-1">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                        통관부호 확인
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* History Section */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <HistoryIcon className="h-4 w-4 text-slate-400" />
                            변경 이력
                        </h4>

                        <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                            <div className="flex gap-3">
                                <div className="mt-1 p-1 bg-white rounded-full border border-slate-200 shadow-sm">
                                    <Clock className="h-3 w-3 text-slate-400" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] font-bold text-slate-800">통관부호 입력 링크 생성</span>
                                        <span className="text-[11px] text-slate-400 tabular-nums">2026-01-27 12:22</span>
                                    </div>
                                    <p className="text-[12px] text-slate-500">고객용 통관부호 입력 링크가 생성되었습니다</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-6" /> {/* Bottom spacing */}
            </DialogContent>
        </Dialog>
    );
}

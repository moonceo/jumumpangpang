import { Inquiry } from "@/types/inquiry";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MessageCircle, Clock } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface InquiryListItemProps {
    inquiry: Inquiry;
    onReply: (inquiry: Inquiry) => void;
}

const getMarketBadge = (market: string) => {
    switch (market) {
        case 'naver': return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">네이버</Badge>;
        case 'coupang': return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">쿠팡</Badge>;
        case '11st': return <Badge variant="outline" className="text-red-800 border-red-300 bg-red-50">11번가</Badge>;
        case 'esm': return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">ESM</Badge>;
        default: return <Badge variant="outline">기타</Badge>;
    }
};

const maskUserId = (id: string) => {
    if (id.length <= 3) return id;
    return id.substring(0, 1) + "***" + id.substring(id.length - 1);
};

export function InquiryListItem({ inquiry, onReply }: InquiryListItemProps) {
    const timeAgo = formatDistanceToNow(new Date(inquiry.createdAt), { addSuffix: true, locale: ko });

    return (
        <div className="flex gap-4 p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
            {/* 1. Market & Product Thumbnail */}
            <div className="flex flex-col gap-2 items-center min-w-[80px]">
                {getMarketBadge(inquiry.marketType)}
                {inquiry.product && (
                    <div className="relative h-16 w-16 rounded overflow-hidden border bg-muted">
                        <Image src={inquiry.product.thumbnail} alt="Product" fill className="object-cover" />
                    </div>
                )}
            </div>

            {/* 2. Content */}
            <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{inquiry.type}</span>
                    <span>•</span>
                    <span>{inquiry.product?.name}</span>
                </div>

                <p className="text-sm font-medium line-clamp-2 leading-relaxed">
                    {inquiry.content}
                </p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                    <div className="flex items-center gap-1">
                        <span className="font-mono bg-muted px-1 rounded">{maskUserId(inquiry.writerId)}</span>
                        {inquiry.writerName && <span>({maskUserId(inquiry.writerName)})</span>}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {timeAgo}
                    </div>
                </div>
            </div>

            {/* 3. Action */}
            <div className="flex items-center self-center pl-2">
                {inquiry.status === 'answered' ? (
                    <Button variant="ghost" disabled className="text-green-600 bg-green-50">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        답변완료
                    </Button>
                ) : (
                    inquiry.isExternal ? (
                        <Button variant="outline" size="sm" onClick={() => window.open(inquiry.externalLink, '_blank')}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            문의 바로가기
                        </Button>
                    ) : (
                        <Button size="sm" onClick={() => onReply(inquiry)}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            답변하기
                        </Button>
                    )
                )}
            </div>
        </div>
    );
}

function CheckCircle({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}

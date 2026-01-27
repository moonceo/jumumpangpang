"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight, AlertCircle, Truck, CheckCircle2, StickyNote, ExternalLink } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Helper for status badge colors
const getStatusBadgeVariant = (status: string) => {
    // New Order: Black/White (Default)
    if (status === '신규 주문') return 'default';

    // Waiting Sourcing/Selection: Orange/Yellow
    if (status === '소싱상품 선택대기' || status === '발송대기' || status === '입고 대기' || status === '입고중' || status === '견적 완료') return 'secondary'; // Tailwind 'secondary' is usually gray/zinc. We might need custom classes if 'variant' is limited to shadcn presets. 
    // Actually, Shadcn Badge variants are usually: default, secondary, destructive, outline. 
    // For more colors, we might need to apply className directly in the cell.

    // Statuses generally:
    if (status.includes('취소') || status.includes('반품') || status.includes('오류') || status.includes('거절') || status.includes('불가') || status.includes('실패')) return 'destructive';

    if (status === '결제 대기' || status === '배송비 결제 대기') return 'outline'; // Blue-ish intent?

    if (status === '결제 완료' || status === '배송비 결제 완료') return 'outline'; // Green-ish intent?

    return 'outline';
};

// ... (getStatusBadgeVariant limitations handled in Cell)

const getStatusColorClass = (status: string) => {
    if (status === '신규 주문') return 'bg-zinc-900 text-white hover:bg-zinc-800 border-zinc-900';

    if (status === '소싱상품 선택대기' || status === '발송대기') return 'bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200';
    if (status === '입고 대기' || status === '입고중' || status === '견적 완료') return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200';

    if (status === '결제 대기' || status === '배송비 결제 대기') return 'bg-sky-100 text-sky-700 hover:bg-sky-100 border-sky-200';
    if (status === '결제 완료' || status === '배송비 결제 완료') return 'bg-green-100 text-green-700 hover:bg-green-100 border-green-200';

    if (status.includes('배송') || status.includes('통관') || status.includes('출고')) return 'bg-indigo-50 text-indigo-700 hover:bg-indigo-50 border-indigo-200';

    if (status.includes('취소') || status.includes('반품') || status.includes('오류') || status.includes('거절') || status.includes('불가') || status.includes('실패')) return 'bg-red-50 text-red-700 hover:bg-red-50 border-red-200';

    return 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200';
}

const getMarketIcon = (market: string) => {
    switch (market) {
        case 'naver':
            return <div className="w-5 h-5 bg-[#03C75A] text-white text-[10px] font-bold flex items-center justify-center rounded-sm">N</div>;
        case 'coupang':
            return <div className="w-5 h-5 bg-[#E61328] text-white text-[10px] font-bold flex items-center justify-center rounded-sm">C</div>;
        case '11st':
            return <div className="w-5 h-5 bg-[#F43142] text-white text-[10px] font-bold flex items-center justify-center rounded-sm">11</div>;
        case 'esm':
        case 'gmarket':
        case 'auction':
            return <div className="w-5 h-5 bg-[#02a94f] text-white text-[8px] font-bold flex items-center justify-center rounded-sm">ESM</div>;
        default:
            return <div className="w-5 h-5 bg-gray-500 text-white text-[10px] font-bold flex items-center justify-center rounded-sm">E</div>;
    }
};

// Helper removed as we use storeName directly


// Reordered columns based on documentation:
// Actions -> OrderDate -> Product -> Status -> Recipient -> Price -> Market -> Memo.

export const columns: ColumnDef<Order>[] = [
    // ... (select, expander columns remain same)
    {
        id: "select",
        // ... (existing code)
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "expander",
        header: () => null,
        cell: ({ row }) => {
            return (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0 hover:bg-muted"
                    onClick={() => row.toggleExpanded()}
                >
                    {row.getIsExpanded() ? (
                        <ChevronDown className="h-4 w-4" />
                    ) : (
                        <ChevronRight className="h-4 w-4" />
                    )}
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "작업",
        cell: ({ row }) => {
            const status = row.original.status;
            const marketType = row.original.marketType;

            // 1. 신규 주문 Actions
            if (status === '신규 주문') {
                return (
                    <div className="flex flex-col gap-1 w-full max-w-[150px]">
                        <Button
                            className="h-7 text-[11px] w-full bg-[#18181b] text-white hover:bg-[#27272a] rounded-md shadow-sm border border-zinc-800"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('action-tracking-input', { detail: row.original }));
                            }}
                        >
                            발주 확인하기
                        </Button>
                        <Button
                            variant="outline"
                            className="h-7 text-[11px] w-full bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-700 rounded-md shadow-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('action-review-margin', { detail: row.original }));
                            }}
                        >
                            마진 검토하기
                        </Button>
                        <Button
                            variant="outline"
                            className="h-7 text-[11px] w-full bg-white hover:bg-red-50 border-zinc-300 text-red-600 rounded-md shadow-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('action-cancel-order', { detail: row.original }));
                            }}
                        >
                            주문 취소하기
                        </Button>
                    </div>
                );
            }

            // 2. 발송 대기 Actions
            if (status === '발송대기') {
                return (
                    <div className="flex flex-col gap-1.5 w-full max-w-[150px]">
                        <Button
                            className="h-7 text-[11px] w-full bg-[#18181b] text-white hover:bg-[#27272a] rounded-md shadow-sm border border-zinc-800"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('action-register-invoice', { detail: row.original }));
                            }}
                        >
                            직접전달 처리하기
                        </Button>
                        <Button
                            className="h-7 text-[11px] w-full bg-[#18181b] text-white hover:bg-[#27272a] rounded-md shadow-sm border border-zinc-800"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('action-register-sourcing', { detail: row.original }));
                            }}
                        >
                            소싱상품 등록하기
                        </Button>
                    </div>
                );
            }

            // 3. 배송중 / 배송완료 등 Actions (Shipping Menu Focus)
            const shippingStatuses = ['배송중', '국내 배송중', '배송 완료', '현지 배송중', '통관중', '국내 입항', '출고 완료', '출고 준비'];

            if (shippingStatuses.some(s => status.includes(s)) || (status as string) === '배송 중') {
                return (
                    <div className="flex flex-col gap-1 w-full max-w-[140px]">
                        {status === '국내 배송중' && (
                            <Button
                                className="h-7 text-[10px] w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.dispatchEvent(new CustomEvent('action-check-tracking', { detail: row.original }));
                                }}
                            >
                                <Truck className="h-3 w-3 mr-1" />
                                국내 송장 확인
                            </Button>
                        )}

                        <Button
                            variant="outline"
                            className="h-7 text-[10px] w-full bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700 rounded-md"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('action-add-sourcing', { detail: row.original }));
                            }}
                        >
                            추가 소싱하기
                        </Button>
                    </div>
                );
            }

            // Default
            return (
                <div className="text-xs text-muted-foreground text-center">-</div>
            );
        },
    },
    {
        accessorKey: "orderDate",
        header: "주문일시",
        cell: ({ row }) => {
            const date = new Date(row.original.orderDate);
            const relativeTime = formatDistanceToNow(date, { addSuffix: true, locale: ko });

            return (
                <div className="flex flex-col text-xs text-muted-foreground whitespace-nowrap">
                    <span className="font-medium text-foreground">{row.original.orderDate.split(' ')[0]}</span>
                    <div className="flex items-center gap-1">
                        <span>{row.original.orderDate.split(' ')[1]}</span>
                        <span className="text-[10px] opacity-70">({relativeTime})</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "product",
        header: "상품정보",
        cell: ({ row }) => {
            const product = row.original.product;
            return (
                <div className="flex items-center gap-3 min-w-[300px]">
                    <div className="relative h-10 w-10 flex-shrink-0 rounded overflow-hidden border">
                        <Image src={product.thumbnail} alt={product.name} fill sizes="40px" className="object-cover" />
                        {product.isAiOption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-blue-600/90 text-[7px] text-white text-center py-0.5 leading-none">
                                AI 옵션 이미지
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                        <span className="text-sm font-medium truncate max-w-[300px]" title={product.name}>
                            {product.name}
                        </span>
                        <div className="text-xs text-muted-foreground truncate max-w-[300px]">
                            {product.optionName}
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] text-muted-foreground">
                                마켓 주문번호: {row.original.marketOrderId}
                            </span>
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "처리상태",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge variant="outline" className={`whitespace-nowrap ${getStatusColorClass(status)} border`}>
                    {status}
                </Badge>
            );
        },
    },

    {
        accessorKey: "recipient",
        header: "수령자",
        cell: ({ row }) => {
            const recipient = row.original.recipient;
            const isPccMissing = !recipient.pccc || recipient.pccc.length < 12;

            return (
                <div className="flex flex-col text-sm gap-0.5 min-w-[100px]">
                    <div className="font-medium whitespace-nowrap">
                        {recipient.name}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{recipient.phone}</span>
                    <div className="mt-1 flex items-center">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="cursor-pointer">
                                        {isPccMissing ? (
                                            <AlertCircle className="h-4 w-4 text-red-500 hover:text-red-600" />
                                        ) : (
                                            <CheckCircle2 className="h-4 w-4 text-green-500 hover:text-green-600" />
                                        )}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs">
                                        PCCC: {recipient.pccc || '미입력'}
                                        {isPccMissing && ' (수정필요)'}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "paymentPrice",
        header: "결제가격/마진",
        cell: ({ row }) => {
            const price = row.original.paymentPrice;
            const settlement = row.original.expectedSettlement;
            const quantity = row.original.product.quantity;

            // Calculate margin rate based on settlement (revenue after platform fee) vs something.
            // Documentation says: 판매가 - (매입가 + 배송비 + 마켓수수료)
            // For now, let's use (Settlement - SourcingPrice - WarehouseCost) / Settlement if we have it.
            // If we don't have all data, show a mock margin based on settlement/price.
            const marginRate = price > 0 ? ((settlement - (price * 0.7)) / price) * 100 : 0; // Mock calculation
            const isNegative = marginRate < 0;

            return (
                <div className="flex flex-col text-xs gap-0.5 whitespace-nowrap">
                    <div className="font-bold text-sm text-foreground">
                        {new Intl.NumberFormat('ko-KR').format(price)}원
                    </div>
                    <div className={cn(
                        "text-[10px] font-medium flex items-center gap-1",
                        isNegative ? "text-red-500" : "text-green-600"
                    )}>
                        {isNegative ? "▼" : "▲"} {Math.abs(marginRate).toFixed(1)}%
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "marketType",
        header: "마켓",
        cell: ({ row }) => {
            return (
                <div className="flex flex-col items-start gap-1">
                    {getMarketIcon(row.original.marketType)}
                    <span className="text-xs font-medium">{row.original.storeName}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "memo",
        header: "메모",
        cell: ({ row }) => {
            const memo = row.original.internalMemo;
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-1.5 cursor-help min-w-[80px]">
                                <StickyNote
                                    className={cn(
                                        "h-3.5 w-3.5 transition-colors shrink-0",
                                        memo ? "text-blue-500 fill-blue-50" : "text-muted-foreground/30"
                                    )}
                                />
                                {memo && (
                                    <span className="text-[10px] text-muted-foreground truncate max-w-[60px]">
                                        {memo}
                                    </span>
                                )}
                            </div>
                        </TooltipTrigger>
                        {memo && (
                            <TooltipContent side="left" className="max-w-[200px] break-all">
                                <p className="text-[11px] leading-relaxed">{memo}</p>
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
];

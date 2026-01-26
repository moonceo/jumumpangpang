"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight, AlertCircle, Truck } from "lucide-react";
import Image from "next/image";

// Helper for status badge colors
const getStatusBadgeVariant = (status: string) => {
    if (status === '신규 주문') return 'default'; // Primary (Black/White)
    if (status.includes('취소') || status.includes('반품') || status.includes('오류')) return 'destructive';
    if (status === '발송대기') return 'secondary';
    if (status === '배송 완료' || status === '정산 완료') return 'outline'; // Greenish usually better but outline for success
    return 'secondary';
};

const getMarketIcon = (market: string) => {
    // Simple text fallback for icons now
    switch (market) {
        case 'naver': return <span className="text-[10px] font-bold text-green-500 border border-green-500 rounded px-1">N</span>;
        case 'coupang': return <span className="text-[10px] font-bold text-red-500 border border-red-500 rounded px-1">C</span>;
        case '11st': return <span className="text-[10px] font-bold text-red-700 border border-red-700 rounded px-1">11</span>;
        default: return <span className="text-[10px] font-bold text-gray-500 border border-gray-500 rounded px-1">E</span>;
    }
};

const getMarketName = (market: string) => {
    switch (market) {
        case 'naver': return '네이버';
        case 'coupang': return '쿠팡';
        case '11st': return '11번가';
        case 'esm': return 'ESM';
        default: return market;
    }
};

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
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs border-zinc-200"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('action-tracking-input', { detail: row.original }));
                            }}
                        >
                            송장
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('action-review-margin', { detail: row.original }));
                            }}
                        >
                            마진
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('action-cancel-order', { detail: row.original }));
                            }}
                        >
                            취소
                        </Button>
                    </div>
                );
            }

            // 2. 발송 대기 Actions
            if (status === '발송대기') {
                const isAutoSync = ['coupang', 'esm'].includes(marketType);

                return (
                    <div className="flex items-center gap-2">
                        {!isAutoSync ? (
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs border-orange-200 text-orange-700 hover:bg-orange-50"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.dispatchEvent(new CustomEvent('action-register-invoice', { detail: row.original }));
                                }}
                            >
                                <AlertCircle className="h-3 w-3 mr-1" />
                                작업필요
                            </Button>
                        ) : (
                            <Badge variant="secondary" className="text-[10px] text-muted-foreground font-normal">
                                자동 동기화됨
                            </Badge>
                        )}
                    </div>
                );
            }

            // 3. 배송중 / 배송완료 등 Actions
            const shippingStatuses = ['배송중', '국내 배송중', '배송 완료', '현지 배송중', '통관중'];
            if (shippingStatuses.some(s => status.includes(s)) || (status as string) === '배송 중') {
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('action-add-sourcing', { detail: row.original }));
                            }}
                        >
                            추가소싱
                        </Button>

                        {status.includes('국내') && (
                            <Button
                                variant="default" // Primary color for domestic tracking
                                size="sm"
                                className="h-7 text-xs bg-blue-600 hover:bg-blue-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.dispatchEvent(new CustomEvent('action-check-tracking', { detail: row.original }));
                                }}
                            >
                                <Truck className="h-3 w-3 mr-1" />
                                송장확인
                            </Button>
                        )}
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
            return (
                <div className="flex flex-col text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{row.original.orderDate.split(' ')[0]}</span>
                    <div className="flex items-center gap-1">
                        <span>{row.original.orderDate.split(' ')[1]}</span>
                        <span className="text-[10px] opacity-70">(2시간 전)</span>
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
                    </div>
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium truncate max-w-[200px]" title={product.name}>
                                {product.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground shrink-0 border rounded px-1">
                                {row.original.marketOrderId}
                            </span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate max-w-[240px]">
                            {product.optionName}
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
                <Badge variant={getStatusBadgeVariant(status)} className="whitespace-nowrap">
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

            const handleSendAlert = (e: React.MouseEvent) => {
                e.stopPropagation();
                import("sonner").then(({ toast }) => {
                    toast.success(`[${recipient.name}] 고객님에게 PCCC 요청 알림톡을 발송했습니다.`);
                });
            };

            return (
                <div className="flex flex-col text-sm">
                    <div className="font-medium flex items-center gap-1">
                        {recipient.name}
                        {isPccMissing ? (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSendAlert}
                                className="h-5 px-1.5 text-[10px] bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
                            >
                                통관부호 요청
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const event = new CustomEvent('openPcccModal', { detail: row.original });
                                    window.dispatchEvent(event);
                                }}
                                className="h-5 px-1.5 text-[10px] bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
                            >
                                통관부호 확인
                            </Button>
                        )}
                    </div>
                    <span className="text-xs text-muted-foreground">{recipient.phone}</span>
                    {isPccMissing && (
                        <span className="text-[10px] text-red-500 font-medium">⚠️ 통관부호 누락</span>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "paymentPrice",
        header: "결제/마진정보",
        cell: ({ row }) => {
            const price = row.original.paymentPrice;
            const settlement = row.original.expectedSettlement;
            const platformFee = row.original.platformFee || 0;

            // Calculate margin (simplified)
            const sourcingCost = row.original.sourcingHistory[0]?.sourcingPriceKRW || 0;
            const shippingCost = row.original.warehouse?.shippingCost || 0;
            const totalCost = sourcingCost + shippingCost + platformFee;
            const margin = settlement - totalCost;
            const marginRate = settlement > 0 ? ((margin / settlement) * 100) : 0;

            const isNegative = margin < 0;
            const marginColor = isNegative ? 'text-red-600' : marginRate > 20 ? 'text-green-600' : 'text-orange-600';

            return (
                <div className="flex flex-col text-xs gap-0.5">
                    <div className="font-semibold text-sm">{new Intl.NumberFormat('ko-KR').format(price)}원</div>
                    <div className="text-muted-foreground">
                        정산: {new Intl.NumberFormat('ko-KR').format(settlement)}원
                    </div>
                    <div className={`font-medium ${marginColor}`}>
                        마진: {isNegative ? '-' : '+'}{marginRate.toFixed(1)}% = {isNegative ? '-' : '+'}{new Intl.NumberFormat('ko-KR').format(Math.abs(margin))}원
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "marketType",
        header: "마켓",
        cell: ({ row }) => {
            const marketName = getMarketName(row.original.marketType);
            return (
                <div className="flex flex-col items-start gap-1">
                    {getMarketIcon(row.original.marketType)}
                    <span className="text-xs font-medium">{marketName}</span>
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
                <div className="text-xs text-muted-foreground max-w-[100px] truncate" title={memo}>
                    {memo || '-'}
                </div>
            );
        },
    },
];

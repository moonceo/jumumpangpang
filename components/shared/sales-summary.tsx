"use client";

import { useDashboardMetrics } from "@/hooks/use-dashboard-data";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, CreditCard, TrendingUp, Wallet, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryItemProps {
    label: string;
    value: number;
    icon: React.ReactNode;
    valueClassName?: string;
    unit?: string;
}

function SummaryItem({ label, value, icon, valueClassName, unit = "원" }: SummaryItemProps) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/40 border">
            <div className="p-2 bg-background rounded-full border shadow-sm text-muted-foreground">
                {icon}
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
                <span className={cn("text-lg font-bold tracking-tight", valueClassName)}>
                    {new Intl.NumberFormat('ko-KR').format(value)}{unit}
                </span>
            </div>
        </div>
    );
}

export function SalesSummary() {
    const { data: metrics, isLoading } = useDashboardMetrics();

    if (isLoading) {
        return <SummarySkeleton />;
    }

    if (!metrics) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
            <SummaryItem
                label="총 매출"
                value={metrics.sales}
                icon={<DollarSign className="h-4 w-4" />}
            />
            <SummaryItem
                label="정산예정금"
                value={metrics.expectedSettlement}
                icon={<Wallet className="h-4 w-4" />}
            />
            <SummaryItem
                label="비용"
                value={metrics.costs}
                icon={<CreditCard className="h-4 w-4" />}
            />
            <SummaryItem
                label="예상마진"
                value={metrics.expectedMargin}
                icon={<TrendingUp className="h-4 w-4" />}
                valueClassName="text-blue-600 dark:text-blue-400"
            />
            <SummaryItem
                label="주문건수"
                value={metrics.orderCount}
                unit="건"
                icon={<ShoppingCart className="h-4 w-4" />}
            />
        </div>
    );
}

function SummarySkeleton() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-20 rounded-lg bg-muted/40 border animate-pulse" />
            ))}
        </div>
    );
}

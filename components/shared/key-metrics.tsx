import {
    DollarSign,
    CreditCard,
    ShoppingCart,
    TrendingUp,
    Wallet,
    Coins
} from "lucide-react";
import { MetricCard } from "./metric-card";
import { useDashboardMetrics } from "@/hooks/use-dashboard-data";
import { Skeleton } from "@/components/ui/skeleton";

export function KeyMetrics() {
    const { data: metrics, isLoading } = useDashboardMetrics();

    if (isLoading) {
        return <MetricsSkeleton />;
    }

    if (!metrics) return null;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <MetricCard
                label="매출"
                value={metrics.sales}
                icon={<DollarSign className="h-4 w-4" />}
                tooltip="해당 월의 총 결제 금액입니다."
            />
            <MetricCard
                label="정산예정금"
                value={metrics.expectedSettlement}
                icon={<Wallet className="h-4 w-4" />}
                tooltip="마켓 수수료를 제외하고 입금될 예정 금액입니다."
            />
            <MetricCard
                label="비용"
                value={metrics.costs}
                icon={<CreditCard className="h-4 w-4" />}
                tooltip="매입가와 배송비 등 지출 합계입니다."
            />
            <MetricCard
                label="예상마진"
                value={metrics.expectedMargin}
                icon={<TrendingUp className="h-4 w-4" />}
                tooltip="정산예정금에서 비용을 뺀 수익성 지표입니다."
                valueClassName="text-blue-600 dark:text-blue-400"
            />
            <MetricCard
                label="주문건수"
                value={metrics.orderCount}
                unit="건"
                icon={<ShoppingCart className="h-4 w-4" />}
                tooltip="해당 기간 발생한 총 주문 건수입니다."
            />
        </div>
    );
}

function MetricsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-4" />
                    </div>
                    <div className="mt-2">
                        <Skeleton className="h-8 w-32" />
                    </div>
                </div>
            ))}
        </div>
    );
}

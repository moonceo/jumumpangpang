import { format } from "date-fns";
import { ko } from "date-fns/locale";


export function DashboardHeader() {
    const today = format(new Date(), "yyyy-MM-dd", { locale: ko });

    return (
        <header className="flex items-center justify-between pb-6 pt-2">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                    최근 업데이트: {today}
                    <span className="inline-block w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-muted-foreground font-normal">실시간 동기화 중</span>
                </p>
            </div>
        </header >
    );
}

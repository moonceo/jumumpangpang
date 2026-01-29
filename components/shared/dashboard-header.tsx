import { format } from "date-fns";
import { ko } from "date-fns/locale";


export function DashboardHeader() {
    const today = format(new Date(), "yyyy-MM-dd", { locale: ko });

    return (
        <header className="flex items-center justify-between pb-6 pt-2">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
                <p className="text-sm text-muted-foreground">
                    최근 업데이트: {today}
                </p>
            </div>
        </header >
    );
}

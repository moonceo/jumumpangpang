import { usePendingTasks } from "@/hooks/use-dashboard-data";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Package, Truck, AlertCircle, RefreshCw } from "lucide-react";

export function PendingTasks() {
    const { data: tasks, isLoading } = usePendingTasks();

    const getIcon = (id: string) => {
        switch (id) {
            case 'new-orders': return <Package className="h-5 w-5 text-blue-500" />;
            case 'waiting-shipment': return <Truck className="h-5 w-5 text-indigo-500" />;
            case 'shipping-error': return <AlertCircle className="h-5 w-5 text-red-500" />;
            case 'claims': return <RefreshCw className="h-5 w-5 text-orange-500" />;
            default: return <Package className="h-5 w-5" />;
        }
    };

    if (isLoading) {
        return <TasksSkeleton />;
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tasks?.map((task) => (
                <Card key={task.id} className="relative overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-muted rounded-full">
                                {getIcon(task.id)}
                            </div>
                            <div className="text-2xl font-bold text-foreground">
                                {task.count}
                                <span className="text-sm font-normal text-muted-foreground ml-1">건</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm">{task.name}</h3>
                            <Link
                                href={task.url}
                                className="text-xs font-medium text-primary flex items-center hover:underline bg-primary/5 px-2 py-1 rounded-full"
                            >
                                처리하기 <ArrowRight className="h-3 w-3 ml-1" />
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function TasksSkeleton() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    label: string;
    value: number;
    icon?: React.ReactNode;
    tooltip?: string;
    unit?: string;
    className?: string;
    valueClassName?: string;
}

export function MetricCard({
    label,
    value,
    icon,
    tooltip,
    unit = "원",
    className,
    valueClassName
}: MetricCardProps) {
    // Format number with comma
    const formattedValue = new Intl.NumberFormat('ko-KR').format(value);

    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-1.5">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        {label}
                    </CardTitle>
                    {tooltip && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="h-3.5 w-3.5 text-muted-foreground/70 hover:text-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs">{tooltip}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
                {icon && <div className="text-muted-foreground">{icon}</div>}
            </CardHeader>
            <CardContent>
                <div className={cn("text-2xl font-bold", valueClassName)}>
                    {formattedValue}
                    <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
                </div>
            </CardContent>
        </Card>
    );
}

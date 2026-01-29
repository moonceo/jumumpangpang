import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Store, Check } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { Order } from "@/types/order";
import { cn } from "@/lib/utils";

export interface OrderSearchProps {
    baseData: Order[];
    onSearch: (filtered: Order[]) => void;
    statusOptions?: string[];
    middleContent?: React.ReactNode;
    action?: React.ReactNode;
    showMarketFilter?: boolean;
    placeholder?: string;
}

export function OrderSearch({ baseData, onSearch, statusOptions, action, middleContent, showMarketFilter = true, placeholder = "상품명, 주문번호, 수령인 검색..." }: OrderSearchProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [marketFilter, setMarketFilter] = useState("all");
    const [marketOpen, setMarketOpen] = useState(false);

    // Status Filter State (Multi-select)
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [statusOpen, setStatusOpen] = useState(false);

    // Unified filter logic
    useEffect(() => {
        const filtered = baseData.filter(order => {
            const matchesSearch =
                order.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.marketOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.recipient.name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesMarket = marketFilter === "all" || order.marketType === marketFilter;

            // Multi-select status logic: if empty, show all. else check inclusion.
            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(order.status);

            return matchesSearch && matchesMarket && matchesStatus;
        });
        onSearch(filtered);
    }, [searchTerm, marketFilter, selectedStatuses, baseData, onSearch]);

    const handleStatusToggle = (status: string) => {
        setSelectedStatuses(current => {
            if (current.includes(status)) {
                return current.filter(s => s !== status);
            } else {
                return [...current, status];
            }
        });
    };

    const clearStatusFilter = () => setSelectedStatuses([]);

    return (
        <div className="flex flex-col md:flex-row gap-2 bg-muted/20 p-4 rounded-lg border">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder={placeholder}
                    className="pl-9 bg-background"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {middleContent && (
                <div className="flex items-center">
                    {middleContent}
                </div>
            )}

            {/* Market Filter (Icon Trigger via Popover) */}
            {showMarketFilter && (
                <Popover open={marketOpen} onOpenChange={setMarketOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="icon" className={cn("bg-background", marketFilter !== 'all' && "border-primary text-primary bg-primary/10")}>
                            <Store className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[140px] p-0" align="end">
                        <Command>
                            <CommandList>
                                <CommandGroup>
                                    <CommandItem onSelect={() => { setMarketFilter("all"); setMarketOpen(false); }}>
                                        전체 마켓
                                        {marketFilter === "all" && <Check className="ml-auto h-4 w-4" />}
                                    </CommandItem>
                                    <CommandItem onSelect={() => { setMarketFilter("naver"); setMarketOpen(false); }}>
                                        네이버
                                        {marketFilter === "naver" && <Check className="ml-auto h-4 w-4" />}
                                    </CommandItem>
                                    <CommandItem onSelect={() => { setMarketFilter("coupang"); setMarketOpen(false); }}>
                                        쿠팡
                                        {marketFilter === "coupang" && <Check className="ml-auto h-4 w-4" />}
                                    </CommandItem>
                                    <CommandItem onSelect={() => { setMarketFilter("11st"); setMarketOpen(false); }}>
                                        11번가
                                        {marketFilter === "11st" && <Check className="ml-auto h-4 w-4" />}
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}

            {/* Status Filter (Icon Trigger + Multi-select Popover) */}
            {statusOptions && statusOptions.length > 0 && (
                <Popover open={statusOpen} onOpenChange={setStatusOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="icon" className={cn("bg-background relative", selectedStatuses.length > 0 && "border-primary text-primary bg-primary/10")}>
                            <Filter className="h-4 w-4" />
                            {selectedStatuses.length > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                    {selectedStatuses.length}
                                </span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="end">
                        <Command>
                            <CommandInput placeholder="상태 검색..." />
                            <CommandList>
                                <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                                <CommandGroup>
                                    {statusOptions.map((status) => (
                                        <CommandItem
                                            key={status}
                                            value={status}
                                            onSelect={() => handleStatusToggle(status)}
                                        >
                                            <div className="flex items-center gap-2 flex-1 pointer-events-none">
                                                <Checkbox
                                                    checked={selectedStatuses.includes(status)}
                                                    className="h-4 w-4"
                                                />
                                                <span>{status}</span>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                            {selectedStatuses.length > 0 && (
                                <div className="p-2 border-t bg-muted/50">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full h-8 text-xs font-medium"
                                        onClick={clearStatusFilter}
                                    >
                                        필터 초기화
                                    </Button>
                                </div>
                            )}
                        </Command>
                    </PopoverContent>
                </Popover>
            )}

            {action}
        </div>
    );
}

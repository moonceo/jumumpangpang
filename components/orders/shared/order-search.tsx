"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw, Filter, ChevronDown } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useState } from "react";
import { Order } from "@/types/order";
import { mockOrders } from "@/lib/mock-data/orders";

interface OrderSearchProps {
    baseData: Order[];
    onSearch: (filtered: Order[]) => void;
}

export function OrderSearch({ baseData, onSearch }: OrderSearchProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [marketFilter, setMarketFilter] = useState("all");

    const handleSearch = () => {
        const filtered = baseData.filter(order => {
            const matchesSearch =
                order.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.marketOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.recipient.name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesMarket = marketFilter === "all" || order.marketType === marketFilter;

            return matchesSearch && matchesMarket;
        });
        onSearch(filtered);
    };

    const handleReset = () => {
        setSearchTerm("");
        setMarketFilter("all");
        onSearch(baseData);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 bg-muted/20 p-4 rounded-lg border">
            <div className="flex-1 flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="상품명, 주문번호, 수령인 검색..."
                        className="pl-9 bg-background"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <Button onClick={handleSearch}>검색</Button>
            </div>

            <div className="flex gap-2">
                <Select value={marketFilter} onValueChange={setMarketFilter}>
                    <SelectTrigger className="w-[140px] bg-background">
                        <SelectValue placeholder="마켓 필터" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">전체 마켓</SelectItem>
                        <SelectItem value="naver">네이버</SelectItem>
                        <SelectItem value="coupang">쿠팡</SelectItem>
                        <SelectItem value="11st">11번가</SelectItem>
                    </SelectContent>
                </Select>

                <Button variant="outline" size="icon" onClick={handleReset} title="초기화">
                    <RotateCcw className="h-4 w-4" />
                </Button>


            </div>
        </div>
    );
}

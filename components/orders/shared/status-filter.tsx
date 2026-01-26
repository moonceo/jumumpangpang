"use client";

import * as React from "react";
import { Check, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const statuses = [
    "신규 주문", "통관부호 수집중", "결제 완료", "발주 확인", "발송대기",
    "현지 발송 대기중", "현지 배송중", "현지 배송 완료", "입고 대기",
    "입고중", "견적 완료", "배송비 결제 완료", "출고 준비", "출고 완료",
    "국내 입항", "통관중", "통관 완료", "국내 배송 시작", "국내 배송중",
    "배송 완료", "주문 취소", "취소 요청", "반품 요청", "반품 수거중",
    "반품 완료", "교환 요청", "오류입고"
];

interface StatusFilterProps {
    selectedValues: Set<string>;
    onSelect: (value: string) => void;
    onClear: () => void;
}

export function StatusFilter({ selectedValues, onSelect, onClear }: StatusFilterProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed">
                    <Filter className="mr-2 h-3.5 w-3.5" />
                    상태 필터
                    {selectedValues?.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.size} 선택됨
                                    </Badge>
                                ) : (
                                    Array.from(selectedValues).map((option) => (
                                        <Badge
                                            variant="secondary"
                                            key={option}
                                            className="rounded-sm px-1 font-normal"
                                        >
                                            {option}
                                        </Badge>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="상태 검색..." />
                    <CommandList>
                        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                        <CommandGroup>
                            {statuses.map((status) => {
                                const isSelected = selectedValues.has(status);
                                return (
                                    <CommandItem
                                        key={status}
                                        onSelect={() => onSelect(status)}
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <Check className={cn("h-4 w-4")} />
                                        </div>
                                        <span className="text-xs">{status}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={onClear}
                                        className="justify-center text-center text-xs"
                                    >
                                        필터 초기화
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileSpreadsheet, RefreshCw, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LedgerPage() {
    const [year, setYear] = useState("2024");
    const [month, setMonth] = useState("1");
    const [onlyConfirmed, setOnlyConfirmed] = useState(true);
    const [excludeCancel, setExcludeCancel] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);

    // Mock Summary Data
    const summary = {
        totalOrders: 154,
        totalSales: 4820000,
        totalMargin: 1250000,
        marginRate: 25.9
    };

    const handleDownload = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            toast.success(`장부 다운로드 완료: jumunpangpang_ledger_${year}${month.padStart(2, '0')}.xlsx`);
        }, 2000);
    };

    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">장부 다운로드</h1>
                <p className="text-muted-foreground mt-2">
                    세무 신고 및 정산 관리를 위한 주문 데이터를 추출합니다.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Controls */}
                <Card className="md:w-[350px] h-fit">
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                데이터 기간 및 필터
                            </h3>

                            <div className="grid grid-cols-2 gap-2">
                                <Select value={year} onValueChange={setYear}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2024">2024년</SelectItem>
                                        <SelectItem value="2023">2023년</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={month} onValueChange={setMonth}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                            <SelectItem key={m} value={m.toString()}>{m}월</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="margin-filter" className="cursor-pointer">마진 확정 주문만</Label>
                                    <Switch id="margin-filter" checked={onlyConfirmed} onCheckedChange={setOnlyConfirmed} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="cancel-filter" className="cursor-pointer">취소/반품 제외</Label>
                                    <Switch id="cancel-filter" checked={excludeCancel} onCheckedChange={setExcludeCancel} />
                                </div>
                            </div>
                        </div>

                        <Button className="w-full h-12 text-lg" onClick={handleDownload} disabled={isGenerating}>
                            {isGenerating ? (
                                <>
                                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                                    데이터 추출 중...
                                </>
                            ) : (
                                <>
                                    <Download className="h-5 w-5 mr-2" />
                                    엑셀 다운로드
                                </>
                            )}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                            * 5분 전까지 갱신된 데이터를 기준으로 합니다.
                        </p>
                    </CardContent>
                </Card>

                {/* Right: Preview */}
                <div className="flex-1 space-y-6">
                    {/* Summary Ribbon */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-zinc-900 border rounded-lg p-4 text-center shadow-sm">
                            <div className="text-muted-foreground text-xs mb-1">총 주문</div>
                            <div className="font-bold text-lg">{summary.totalOrders}건</div>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 border rounded-lg p-4 text-center shadow-sm">
                            <div className="text-muted-foreground text-xs mb-1">총 매출</div>
                            <div className="font-bold text-lg">{summary.totalSales.toLocaleString()}</div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg p-4 text-center shadow-sm">
                            <div className="text-blue-600 dark:text-blue-400 text-xs mb-1">순수익</div>
                            <div className="font-bold text-lg text-blue-700 dark:text-blue-300">{summary.totalMargin.toLocaleString()}</div>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 border rounded-lg p-4 text-center shadow-sm">
                            <div className="text-muted-foreground text-xs mb-1">마진율</div>
                            <div className="font-bold text-lg">{summary.marginRate}%</div>
                        </div>
                    </div>

                    {/* Preview Table */}
                    <div className="bg-white dark:bg-zinc-900 border rounded-lg overflow-hidden">
                        <div className="p-4 border-b bg-slate-50 dark:bg-slate-900/50 flex items-center gap-2">
                            <FileSpreadsheet className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-sm">추출 데이터 미리보기 (상위 5건)</span>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">주문일</TableHead>
                                    <TableHead>주문번호</TableHead>
                                    <TableHead>상품명</TableHead>
                                    <TableHead className="text-right">결제금액</TableHead>
                                    <TableHead className="text-right text-blue-600">이익금</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>2024-01-23</TableCell>
                                    <TableCell className="font-mono text-xs">ORD-2024-001</TableCell>
                                    <TableCell className="truncate max-w-[150px]">북유럽 거실장 2000</TableCell>
                                    <TableCell className="text-right">189,000</TableCell>
                                    <TableCell className="text-right text-blue-600 font-medium">+42,000</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2024-01-23</TableCell>
                                    <TableCell className="font-mono text-xs">ORD-2024-002</TableCell>
                                    <TableCell className="truncate max-w-[150px]">샤오미 로봇청소기</TableCell>
                                    <TableCell className="text-right">450,000</TableCell>
                                    <TableCell className="text-right text-blue-600 font-medium">+85,000</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2024-01-22</TableCell>
                                    <TableCell className="font-mono text-xs">ORD-2024-003</TableCell>
                                    <TableCell className="truncate max-w-[150px]">원목 캣타워 A형</TableCell>
                                    <TableCell className="text-right">120,000</TableCell>
                                    <TableCell className="text-right text-blue-600 font-medium">+22,000</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

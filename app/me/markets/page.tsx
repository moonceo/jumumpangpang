"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Plus, ExternalLink, Settings, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MarketConnectionModal } from "@/components/me/modals/market-connection-modal";

interface Market {
    id: string;
    type: 'naver' | 'coupang' | '11st' | 'esm';
    alias: string;
    loginId: string;
    businessNo: string;
    status: 'connected' | 'error';
    lastSync: string;
    card: string;
}

export default function MarketsPage() {
    const [markets, setMarkets] = useState<Market[]>([
        {
            id: "m_01",
            type: "naver",
            alias: "네이버 메인",
            loginId: "smart_seller_1",
            businessNo: "123-45-***** (주)주문팡팡",
            status: "connected",
            lastSync: "방금 전",
            card: "국민카드 (1234)"
        },
        {
            id: "m_02",
            type: "coupang",
            alias: "쿠팡 서브",
            loginId: "wing_master",
            businessNo: "123-45-***** (주)주문팡팡",
            status: "connected",
            lastSync: "10분 전",
            card: "국민카드 (1234)"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMarketType, setSelectedMarketType] = useState<string>("");
    const [isTesting, setIsTesting] = useState(false);

    const handleTestConnection = () => {
        if (!selectedMarketType) return;
        setIsTesting(true);
        setTimeout(() => {
            setIsTesting(false);
            toast.success("마켓 연동 테스트 성공! 설정을 저장합니다.");
            setIsModalOpen(false);
            // Mock Add
        }, 1500);
    };

    const getMarketBadge = (type: string) => {
        switch (type) {
            case 'naver': return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Naver</Badge>;
            case 'coupang': return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">Coupang</Badge>;
            case '11st': return <Badge variant="outline" className="text-red-800 border-red-300 bg-red-50">11st</Badge>;
            default: return <Badge variant="outline">기타</Badge>;
        }
    };

    return (
        <div className="space-y-8 max-w-5xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">마켓 연동하기</h1>
                    <p className="text-muted-foreground mt-2">
                        주문을 수집할 쇼핑몰을 주문팡팡과 연결합니다.
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    새 마켓 연동
                </Button>
            </div>

            {/* Connection Status Board */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">연동된 스토어</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{markets.length}개</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">상태</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-green-600 font-medium">
                            <CheckCircle2 className="h-5 w-5" />
                            모두 정상 가동 중
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">최근 수집</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-mono">2024-01-23 14:30</div>
                    </CardContent>
                </Card>
            </div>

            {/* Market List */}
            <div className="border rounded-md bg-white dark:bg-zinc-900">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>마켓</TableHead>
                            <TableHead>별명 (ID)</TableHead>
                            <TableHead>사업자 정보</TableHead>
                            <TableHead>연동 상태</TableHead>
                            <TableHead>결제 카드</TableHead>
                            <TableHead className="text-right">관리</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {markets.map((market) => (
                            <TableRow key={market.id}>
                                <TableCell>{getMarketBadge(market.type)}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{market.alias}</span>
                                        <span className="text-xs text-muted-foreground">{market.loginId}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm">{market.businessNo}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5 text-sm">
                                        <span className="h-2 w-2 rounded-full bg-green-500" />
                                        <span>연결됨 </span>
                                        <span className="text-xs text-muted-foreground">({market.lastSync})</span>
                                    </div>
                                </TableCell>
                                <TableCell>{market.card}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toast.info("설정 모달 오픈")}>
                                        <Settings className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => window.open(market.type === 'naver' ? 'https://sell.smartstore.naver.com' : 'https://wing.coupang.com', '_blank')}>
                                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <MarketConnectionModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </div>
    );
}

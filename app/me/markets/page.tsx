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

            {/* Add Market Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>새 마켓 연동하기</DialogTitle>
                        <DialogDescription>쇼핑몰 판매자 센터의 API 정보를 입력해주세요.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        <div className="space-y-2">
                            <Label>연동할 마켓 선택</Label>
                            <Select onValueChange={setSelectedMarketType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="마켓을 선택하세요" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="naver">네이버 스마트스토어</SelectItem>
                                    <SelectItem value="coupang">쿠팡 (Coupang Wing)</SelectItem>
                                    <SelectItem value="11st">11번가</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedMarketType && (
                            <>
                                <div className="space-y-4 border rounded-md p-4 bg-muted/40">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>마켓 별명</Label>
                                            <Input placeholder="예: 메인 스토어" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>로그인 ID</Label>
                                            <Input placeholder="판매자 센터 ID" />
                                        </div>
                                    </div>

                                    {/* Dynamic Fields */}
                                    {selectedMarketType === 'naver' ? (
                                        <>
                                            <div className="space-y-2">
                                                <Label>애플리케이션 ID (Client ID)</Label>
                                                <Input type="password" placeholder="API ID 입력" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>애플리케이션 시크릿 (Client Secret)</Label>
                                                <Input type="password" placeholder="API Secret 입력" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>배송 처리 방식</Label>
                                                <Select defaultValue="track">
                                                    <SelectTrigger className="h-8 text-xs">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="direct">직접전달 (가송장 방지)</SelectItem>
                                                        <SelectItem value="track">운송장 등록 (일반)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <p className="text-[10px] text-muted-foreground italic">가송장 패널티 방지를 위해 직접전달 모드를 권장합니다.</p>
                                            </div>
                                        </>
                                    ) : selectedMarketType === 'coupang' ? (
                                        <>
                                            <div className="space-y-2">
                                                <Label>업체 코드 (Company Code)</Label>
                                                <Input placeholder="A00..." />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Access Key</Label>
                                                <Input type="password" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Secret Key</Label>
                                                <Input type="password" />
                                            </div>
                                            <div className="flex gap-2 p-2 bg-amber-50 rounded border border-amber-100 text-amber-700 text-[10px]">
                                                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                                                쿠팡 API 키는 보안 상 180일마다 만료됩니다. 만료 전 재발급하여 갱신이 필요합니다.
                                            </div>
                                        </>
                                    ) : null}
                                </div>

                                <div className="space-y-2">
                                    <Label>결제 카드 선택</Label>
                                    <Select defaultValue="card1">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="card1">국민카드 (1234)</SelectItem>
                                            <SelectItem value="new">+ 새 카드 추가</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-[11px] text-muted-foreground">이 마켓의 주문 매입 시 사용할 카드입니다.</p>
                                </div>
                            </>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>취소</Button>
                        <Button onClick={handleTestConnection} disabled={!selectedMarketType || isTesting}>
                            {isTesting ? (
                                <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    테스트 중...
                                </>
                            ) : "연동 테스트 및 저장"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

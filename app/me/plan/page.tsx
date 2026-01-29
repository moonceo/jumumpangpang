"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, CreditCard, Plus, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { CardRegistrationModal } from "@/components/me/modals/card-registration-modal";
import { useState } from "react";

export default function PlanPage() {
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);

    const currentPlan = {
        name: "Standard",
        price: 39000,
        status: "active",
        nextBillingDate: "2024-02-23",
    };

    const paymentHistory = [
        { date: "2024-01-23", amount: 39000, status: "결제성공", card: "국민카드 (1234)" },
        { date: "2023-12-23", amount: 39000, status: "결제성공", card: "국민카드 (1234)" },
        { date: "2023-11-23", amount: 39000, status: "결제성공", card: "국민카드 (1234)" },
    ];

    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">플랜 결제하기</h1>
                <p className="text-muted-foreground mt-2">
                    이용 중인 플랜과 결제 수단을 관리합니다.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Current Plan */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>현재 이용 중인 플랜</CardTitle>
                                <CardDescription className="mt-1">
                                    다음 결제일: {currentPlan.nextBillingDate}
                                </CardDescription>
                            </div>
                            <Badge className="bg-green-600 hover:bg-green-700">이용 중</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-6">
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold">Standard</span>
                            <span className="text-xl text-muted-foreground">/ 월 39,000원</span>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-blue-500" />
                                <span>월 10,000건 주문 수집</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-blue-500" />
                                <span>무제한 마켓 연동</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-blue-500" />
                                <span>AI 소싱 추천 (고급)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-blue-500" />
                                <span>CS 자동 알림톡 발송</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t pt-6 gap-2">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => toast.info("상위 플랜 준비 중입니다.")}>
                            플랜 업그레이드
                        </Button>
                        <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => toast.warning("해지 시 모든 데이터가 삭제될 수 있습니다.")}>
                            해지하기
                        </Button>
                    </CardFooter>
                </Card>

                {/* Payment Methods */}
                <Card>
                    <CardHeader>
                        <CardTitle>결제 수단 관리</CardTitle>
                        <CardDescription>매월 자동 결제될 카드를 관리합니다.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-900 border-blue-200">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-14 bg-white border rounded flex items-center justify-center">
                                    <CreditCard className="h-6 w-6 text-slate-600" />
                                </div>
                                <div>
                                    <div className="font-medium">국민카드</div>
                                    <div className="text-sm text-muted-foreground">**** 1234</div>
                                </div>
                            </div>
                            <Badge variant="secondary">기본</Badge>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => setIsCardModalOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            새 카드 추가하기
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Payment History */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">결제 내역</h2>
                    <Badge variant="outline" className="font-normal text-muted-foreground">최근 1년</Badge>
                </div>

                <div className="border rounded-md bg-white dark:bg-zinc-900">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]">결제일시</TableHead>
                                <TableHead>플랜명</TableHead>
                                <TableHead>금액</TableHead>
                                <TableHead>결제수단</TableHead>
                                <TableHead className="text-right">상태</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paymentHistory.map((history, i) => (
                                <TableRow key={i}>
                                    <TableCell>{history.date}</TableCell>
                                    <TableCell>Standard 멤버십</TableCell>
                                    <TableCell>{history.amount.toLocaleString()}원</TableCell>
                                    <TableCell className="text-muted-foreground">{history.card}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
                                            {history.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <CardRegistrationModal
                open={isCardModalOpen}
                onOpenChange={setIsCardModalOpen}
            />
        </div>
    );
}

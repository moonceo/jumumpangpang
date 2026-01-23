import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="container mx-auto py-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">대시보드</h1>
                    <p className="text-muted-foreground">프로젝트 현황을 한눈에 확인하세요.</p>
                </div>
                <Button>새로 만들기</Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">총 매출</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">전월 대비 +20.1%</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">구독자</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2,350</div>
                        <p className="text-xs text-muted-foreground">전월 대비 +180.1%</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">판매</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">전월 대비 +19%</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">활성 사용자</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">전시간 대비 +201</p>
                    </CardContent>
                </Card>
            </div>

            {/* Content Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>최근 활동</CardTitle>
                        <CardDescription>최근 7일간의 활동 내역입니다.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Users className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">새로운 사용자 가입</p>
                                    <p className="text-sm text-muted-foreground">user@example.com</p>
                                </div>
                                <p className="text-sm text-muted-foreground">2시간 전</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                                    <CreditCard className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">결제 완료</p>
                                    <p className="text-sm text-muted-foreground">프리미엄 플랜 구독</p>
                                </div>
                                <p className="text-sm text-muted-foreground">5시간 전</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Activity className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">시스템 업데이트</p>
                                    <p className="text-sm text-muted-foreground">v2.1.0 배포 완료</p>
                                </div>
                                <p className="text-sm text-muted-foreground">1일 전</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>빠른 작업</CardTitle>
                        <CardDescription>자주 사용하는 작업을 빠르게 실행하세요.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2">
                            <Button variant="outline" className="justify-start">
                                <Users className="mr-2 h-4 w-4" />
                                사용자 관리
                            </Button>
                            <Button variant="outline" className="justify-start">
                                <CreditCard className="mr-2 h-4 w-4" />
                                결제 내역
                            </Button>
                            <Button variant="outline" className="justify-start">
                                <Activity className="mr-2 h-4 w-4" />
                                분석 리포트
                            </Button>
                            <Button variant="outline" className="justify-start">
                                <DollarSign className="mr-2 h-4 w-4" />
                                매출 현황
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

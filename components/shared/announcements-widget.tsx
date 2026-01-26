import { useAnnouncements } from "@/hooks/use-dashboard-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export function AnnouncementsWidget() {
    const { data: announcements, isLoading } = useAnnouncements();

    if (isLoading) {
        return <AnnouncementsSkeleton />;
    }

    // Take top 3 for the widget
    const recentAnnouncements = announcements?.slice(0, 3) || [];

    return (
        <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">공지사항</CardTitle>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-8 px-2">
                            더보기 →
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>공지사항 전체보기</DialogTitle>
                            <DialogDescription>
                                플랫폼의 중요 업데이트 및 이슈 사항을 확인하세요.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="max-h-[60vh] overflow-y-auto pr-2 mt-4 space-y-4">
                            {announcements?.map((item) => (
                                <div key={item.id} className="border rounded-lg p-4 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Badge variant={item.badge === 'important' ? "destructive" : "secondary"}>
                                            {item.badge === 'important' ? '중요' : '일반'}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">{item.date}</span>
                                    </div>
                                    <h4 className="font-medium text-sm sm:text-base">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                                        {item.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="space-y-4">
                    {recentAnnouncements.map((item) => (
                        <div key={item.id} className="flex flex-col space-y-1">
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant={item.badge === 'important' ? "destructive" : "secondary"}
                                    className="text-[10px] px-1.5 py-0 h-5"
                                >
                                    {item.badge === 'important' ? '중요' : '일반'}
                                </Badge>
                                <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground pl-1">{item.date}</p>
                        </div>
                    ))}

                    {recentAnnouncements.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full py-8 text-center text-muted-foreground">
                            <span className="text-sm">등록된 공지사항이 없습니다.</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

function AnnouncementsSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-12" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-10" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                            <Skeleton className="h-3 w-16" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

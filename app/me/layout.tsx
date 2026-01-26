"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyInfoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const items = [
        { title: "플랜 결제", href: "/me/plan" },
        { title: "마켓 연동", href: "/me/markets" },
        { title: "알림 설정", href: "/me/notifications" },
        { title: "장부 다운로드", href: "/me/ledger" },
        { title: "계정 설정", href: "/me/profile" },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Top Header & Navigation */}
            <div className="border-b bg-background px-6 py-4 flex items-center gap-6">
                <h2 className="text-2xl font-bold tracking-tight shrink-0">내 정보</h2>
                <div className="flex space-x-2 overflow-x-auto pb-0 no-scrollbar">
                    {items.map((item) => (
                        <Button
                            key={item.href}
                            variant={pathname === item.href ? "secondary" : "ghost"}
                            className={cn(
                                "rounded-full px-4 text-sm font-medium transition-colors h-9",
                                pathname === item.href
                                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                            asChild
                        >
                            <Link href={item.href}>
                                {item.title}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
                {children}
            </div>
        </div>
    );
}

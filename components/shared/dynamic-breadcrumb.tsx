"use client";

import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routeNameMap: Record<string, string> = {
    "/": "대시보드",
    "/dashboard": "대시보드",
    "/orders": "전체 주문",
    "/orders/new": "신규 주문",
    "/orders/waiting": "발송 대기",
    "/orders/shipping": "배송중",
    "/orders/claims": "취소/반품/교환",
    "/inquiries": "문의관리",
    "/me/profile": "프로필",
    "/me/markets": "마켓 연동",
    "/me/plan": "플랜 관리",
    "/me/notifications": "알림 설정",
    "/me/ledger": "장부 관리",
};

export function DynamicBreadcrumb() {
    const pathname = usePathname();
    const currentName = routeNameMap[pathname] || "대시보드";

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">주문팡팡</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage>{currentName}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

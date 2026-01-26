"use client"

import * as React from "react"
import {
    LayoutDashboard,
    ShoppingCart,
    MessageSquare,
    User,
    ChevronRight,
    MoreHorizontal,
    Home,
    Package,
    Truck,
    RotateCcw,
    ListOrdered,
    Clock,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

const navItems = [
    {
        title: "대시보드",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "주문관리",
        url: "/orders",
        icon: ShoppingCart,
        items: [
            { title: "전체", url: "/orders" },
            { title: "신규주문", url: "/orders/new" },
            { title: "발송대기", url: "/orders/waiting" },
            { title: "배송중", url: "/orders/shipping" },
            { title: "반품/교환/취소", url: "/orders/claims" },
        ],
    },
    {
        title: "문의관리",
        url: "/inquiries",
        icon: MessageSquare,
    },
    {
        title: "내정보",
        url: "/me/plan",
        icon: User,
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Home className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">주문팡팡</span>
                                    <span className="truncate text-xs">AI 주문 통합 관리</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) =>
                                item.items ? (
                                    <Collapsible
                                        key={item.title}
                                        asChild
                                        defaultOpen={true}
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    tooltip={item.title}
                                                    isActive={pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url))}
                                                    className="data-[active=true]:bg-sidebar-accent data-[active=true]:font-bold data-[active=true]:shadow-sm data-[active=true]:border-l-4 data-[active=true]:border-primary data-[active=true]:rounded-l-none"
                                                >
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                isActive={pathname === subItem.url}
                                                                className="data-[active=true]:font-semibold data-[active=true]:text-primary"
                                                            >
                                                                <Link href={subItem.url}>
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ) : (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                            isActive={pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url))}
                                            className="data-[active=true]:bg-sidebar-accent data-[active=true]:font-bold data-[active=true]:shadow-sm data-[active=true]:border-l-4 data-[active=true]:border-primary data-[active=true]:rounded-l-none"
                                        >
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" asChild>
                            <Link href="/me/profile">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg border">
                                    <User className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Moon CEO</span>
                                    <span className="truncate text-xs">moon@jumunpangpang.com</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

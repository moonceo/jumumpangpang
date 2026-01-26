"use client";

import { useNotifications } from "@/hooks/use-dashboard-data";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export function NotificationPopover() {
    const { data: notifications } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);

    // Simple unread count for demo
    const unreadCount = notifications?.filter(n => !n.isRead).length || 0;

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative h-9 w-9">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-background"></span>
                        </span>
                    )}
                    <span className="sr-only">알림</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <Tabs defaultValue="unread" className="w-full">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <h4 className="font-semibold text-sm">알림 센터</h4>
                        <TabsList className="h-8">
                            <TabsTrigger value="unread" className="text-xs h-7">새로운 채팅</TabsTrigger>
                            <TabsTrigger value="read" className="text-xs h-7">읽은 채팅</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="unread" className="m-0">
                        <ScrollArea className="h-[300px]">
                            {unreadCount === 0 ? (
                                <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                                    <Bell className="h-8 w-8 mb-2 opacity-20" />
                                    <p className="text-sm">새로운 알림이 없습니다.</p>
                                </div>
                            ) : (
                                <div className="divide-y">
                                    {notifications?.filter(n => !n.isRead).map((notification) => (
                                        <div key={notification.id} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer text-left">
                                            <div className="flex justify-between items-start mb-1">
                                                <h5 className="font-medium text-sm">{notification.title}</h5>
                                                <span className="text-[10px] text-muted-foreground">{notification.timestamp}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="read" className="m-0">
                        <ScrollArea className="h-[300px]">
                            <div className="divide-y">
                                {notifications?.filter(n => n.isRead).map((notification) => (
                                    <div key={notification.id} className="p-4 hover:bg-muted/50 transition-colors opacity-70">
                                        <div className="flex justify-between items-start mb-1">
                                            <h5 className="font-medium text-sm">{notification.title}</h5>
                                            <span className="text-[10px] text-muted-foreground">{notification.timestamp}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                                    </div>
                                ))}
                                {(!notifications || notifications.filter(n => n.isRead).length === 0) && (
                                    <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                                        <p className="text-sm">읽은 알림이 없습니다.</p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </PopoverContent>
        </Popover>
    );
}

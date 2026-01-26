import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "주문팡팡 - AI 주문 통합 관리 시스템",
  description: "네이버, 쿠팡 등 여러 마켓의 주문을 한 곳에서 관리하세요.",
};

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Providers } from "@/components/providers";

import { DynamicBreadcrumb } from "@/components/shared/dynamic-breadcrumb";
import { NotificationPopover } from "@/components/shared/notification-popover";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="flex-1">
                  <DynamicBreadcrumb />
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <NotificationPopover />
                </div>
              </header>
              <main className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}


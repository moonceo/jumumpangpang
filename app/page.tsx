"use client";


import { PendingTasks } from "@/components/shared/pending-tasks";
import { SalesCalendar } from "@/components/shared/sales-calendar";
import { SalesSummary } from "@/components/shared/sales-summary";
import { MonthlyStatsControl } from "@/components/shared/monthly-stats-control";
import { AnnouncementsWidget } from "@/components/shared/announcements-widget";

import { DashboardHeader } from "@/components/shared/dashboard-header";



export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* 1. Header with Controls */}
      <div className="space-y-4">
        <DashboardHeader />
        <MonthlyStatsControl />
      </div>

      {/* 2. Urgent Tasks (Counts) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">주문 현황</h2>
        </div>
        <PendingTasks />
      </section>



      {/* 4. Sales Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">매출</h2>
        </div>
        <SalesSummary />
        <SalesCalendar />
      </section>

      {/* 5. Announcements */}
      <section className="space-y-4">
        <AnnouncementsWidget />
      </section>
    </div>
  );
}

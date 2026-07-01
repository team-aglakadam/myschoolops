"use client";

import { Bot, Bell, Bus, Calendar, MessageSquare, TrendingUp, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BarChart } from "@/components/charts";
import { DashboardCard } from "@/components/layout";
import { Caption } from "@/components/typography";
import { slideIn } from "@/lib/animations";

interface LiveDashboardWidgetProps {
  attendance: number;
  revenue: number;
  notifIndex: number;
  notifications: string[];
  chartData?: number[];
}

export function LiveDashboardWidget({
  attendance,
  revenue,
  notifIndex,
  notifications,
  chartData = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88],
}: LiveDashboardWidgetProps) {
  return (
    <DashboardCard title="School Operations Center">
      <div className="flex items-center gap-2 border-b border-border px-6 py-4">
        <Badge variant="success" className="ml-auto gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          Live
        </Badge>
      </div>

      <div className="grid gap-4 p-6 lg:grid-cols-4">
        <div className="rounded-[var(--radius-lg)] bg-surface p-5 lg:col-span-1">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            Attendance Today
          </div>
          <motion.p key={attendance} className="text-4xl font-bold gradient-text">
            {attendance.toLocaleString()}
          </motion.p>
          <p className="mt-1 text-xs text-success">↑ 12% vs yesterday</p>
        </div>

        <div className="rounded-[var(--radius-lg)] bg-surface p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Revenue Analytics
            </div>
            <span className="text-sm font-semibold">{revenue}% collected</span>
          </div>
          <BarChart data={chartData} height="h-32" />
        </div>

        <div className="rounded-[var(--radius-lg)] bg-surface p-5 lg:col-span-1">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Today&apos;s Schedule
          </div>
          <div className="space-y-3">
            {[
              { time: "9:00 AM", event: "Staff Meeting", color: "bg-primary" },
              { time: "11:30 AM", event: "Parent-Teacher Meet", color: "bg-accent" },
              { time: "2:00 PM", event: "Sports Day Prep", color: "bg-success" },
            ].map((e) => (
              <div key={e.time} className="flex items-center gap-3">
                <div className={`h-8 w-1 rounded-full ${e.color}`} />
                <div>
                  <p className="text-xs font-medium">{e.event}</p>
                  <Caption>{e.time}</Caption>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] bg-surface p-5 lg:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Bus className="h-4 w-4" />
            Live Bus Tracking
          </div>
          <div className="relative h-28 overflow-hidden rounded-[var(--radius-md)] bg-primary/5">
            <svg viewBox="0 0 300 80" className="h-full w-full">
              <path d="M20,60 Q80,20 150,40 T280,30" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="6 4" />
              <motion.g animate={{ x: [0, 240] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                <rect x="0" y="-8" width="20" height="12" rx="3" fill="var(--warning)" />
              </motion.g>
            </svg>
            <div className="absolute bottom-2 left-3 text-xs">
              <span className="font-medium">Route 7</span>
              <span className="text-muted-foreground"> · ETA 8 min</span>
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] bg-surface p-5 lg:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Bot className="h-4 w-4" />
            AI Insights
          </div>
          <div className="space-y-2">
            {[
              "3 students flagged for chronic absenteeism",
              "Fee defaulter prediction: 12 families",
              "Grade 10 Math performance declining 8%",
            ].map((insight, i) => (
              <motion.div
                key={insight}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex items-start gap-2 rounded-[var(--radius-md)] bg-primary/10 p-2.5 text-xs"
              >
                <Bot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                {insight}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] bg-surface p-5 lg:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Bell className="h-4 w-4" />
            Live Notifications
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={notifIndex}
              variants={slideIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-center gap-3 rounded-[var(--radius-md)] bg-gradient-to-r from-primary/10 to-accent/10 p-4"
            >
              <MessageSquare className="h-5 w-5 text-primary" />
              <p className="text-sm">{notifications[notifIndex]}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </DashboardCard>
  );
}

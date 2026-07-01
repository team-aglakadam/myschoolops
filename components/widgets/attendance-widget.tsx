"use client";

import { Bot, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/charts";
import { DashboardCard } from "@/components/layout";
import { GradientText } from "@/components/typography/gradient-text";
import { Caption } from "@/components/typography";

interface AttendanceWidgetProps {
  count: number;
  delta?: string;
  stats?: { label: string; value: string; color: string }[];
  feeProgress?: number;
  aiAlert?: string;
}

export function AttendanceWidget({
  count,
  delta = "+45 today",
  stats = [
    { label: "Present", value: "94%", color: "bg-success" },
    { label: "Absent", value: "4%", color: "bg-destructive" },
    { label: "Late", value: "2%", color: "bg-warning" },
  ],
  feeProgress = 78,
  aiAlert = "3 students flagged for low attendance",
}: AttendanceWidgetProps) {
  return (
    <DashboardCard title="MySchoolOps Dashboard">
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <Caption>Live Attendance</Caption>
            <motion.p key={count} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-3xl font-bold">
              <GradientText>{count}</GradientText>
            </motion.p>
          </div>
          <Badge variant="success" className="gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {delta}
          </Badge>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-[var(--radius-md)] bg-surface p-3">
              <div className={`mb-2 h-1.5 w-full rounded-full ${s.color} opacity-80`} />
              <Caption>{s.label}</Caption>
              <p className="text-sm font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-4 rounded-[var(--radius-md)] bg-surface p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <Caption>Fee Collection</Caption>
            <span className="font-medium">{feeProgress}%</span>
          </div>
          <ProgressBar value={feeProgress} delay={0.5} />
        </div>

        <div className="flex items-center gap-2 rounded-[var(--radius-md)] bg-primary/10 p-3">
          <Bot className="h-4 w-4 text-primary" />
          <p className="text-xs">
            <span className="font-medium text-primary">AI Alert:</span> {aiAlert}
          </p>
        </div>
      </div>
    </DashboardCard>
  );
}

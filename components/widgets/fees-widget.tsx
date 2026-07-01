"use client";

import { Bell, CheckCircle2, CreditCard, Smartphone, Building2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/charts";
import { DashboardCard, MetricCard } from "@/components/layout";
import { slideIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface FeesWidgetProps {
  collected: number;
  showSuccess?: boolean;
  successMessage?: string;
  metrics?: { label: string; value: string; tone: "success" | "warning" | "destructive" }[];
}

const paymentMethods = [
  { icon: Smartphone, label: "UPI" },
  { icon: CreditCard, label: "Card" },
  { icon: Building2, label: "Net Banking" },
];

const toneMap = {
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
};

export function FeesWidget({
  collected,
  showSuccess = false,
  successMessage = "Payment Successful — ₹15,000",
  metrics = [
    { label: "Collected", value: "₹48.2L", tone: "success" as const },
    { label: "Pending", value: "₹12.8L", tone: "warning" as const },
    { label: "Overdue", value: "₹3.1L", tone: "destructive" as const },
  ],
}: FeesWidgetProps) {
  return (
    <DashboardCard className="relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            variants={slideIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-[var(--radius-md)] bg-success px-4 py-2 text-sm text-success-foreground shadow-lg"
          >
            <CheckCircle2 className="h-4 w-4" />
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-semibold">Fee Collection Overview</h3>
          <span className="text-2xl font-bold gradient-text">{collected}%</span>
        </div>

        <ProgressBar value={collected} className="mb-6 h-3" />

        <div className="mb-6 grid grid-cols-3 gap-3">
          {metrics.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} valueClassName={toneMap[m.tone]} />
          ))}
        </div>

        <div className="mb-4 flex gap-3">
          {paymentMethods.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-2 rounded-[var(--radius-lg)] bg-surface p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 rounded-[var(--radius-lg)] bg-warning/10 p-4">
          <Bell className="h-5 w-5 text-warning" />
          <div>
            <p className="text-sm font-medium">Payment Reminder Sent</p>
            <p className="text-xs text-muted-foreground">42 families notified via SMS & app</p>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}

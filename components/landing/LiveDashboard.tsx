"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Bot,
  Bus,
  Calendar,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const notifications = [
  "Parent message: Pickup delayed by 10 min",
  "Fee payment received — ₹25,000",
  "AI: 2 students at risk in Mathematics",
  "Bus Route 7 arriving in 5 minutes",
];

export function LiveDashboard() {
  const [attendance, setAttendance] = useState(1247);
  const [revenue, setRevenue] = useState(68);
  const [notifIndex, setNotifIndex] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setAttendance((p) => p + 1), 3000);
    const t2 = setInterval(() => setRevenue((p) => (p < 92 ? p + 1 : p)), 4000);
    const t3 = setInterval(() => setNotifIndex((p) => (p + 1) % notifications.length), 3500);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, []);

  const chartBars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-500">
            Live Dashboard
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Real-time insights at your fingertips
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Watch your school operations come alive with live data, AI alerts, and instant notifications.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass gradient-border overflow-hidden rounded-[24px] shadow-[var(--shadow-glow)]">
            <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              <span className="text-sm text-muted">School Operations Center</span>
              <div className="ml-auto flex items-center gap-2 text-xs text-emerald-500">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live
              </div>
            </div>

            <div className="grid gap-4 p-6 lg:grid-cols-4">
              <div className="rounded-[18px] bg-black/5 dark:bg-white/5 p-5 lg:col-span-1">
                <div className="mb-3 flex items-center gap-2 text-sm text-muted">
                  <Users className="h-4 w-4" />
                  Attendance Today
                </div>
                <motion.p key={attendance} className="text-4xl font-bold gradient-text">
                  {attendance.toLocaleString()}
                </motion.p>
                <p className="mt-1 text-xs text-emerald-500">↑ 12% vs yesterday</p>
                <div className="mt-4 space-y-2">
                  {["Grade 10-A", "Grade 9-B", "Grade 8-C"].map((g, i) => (
                    <div key={g} className="flex items-center justify-between text-xs">
                      <span className="text-muted">{g}</span>
                      <span className="font-medium">{[96, 91, 88][i]}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[18px] bg-black/5 dark:bg-white/5 p-5 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <TrendingUp className="h-4 w-4" />
                    Revenue Analytics
                  </div>
                  <span className="text-sm font-semibold">{revenue}% collected</span>
                </div>
                <div className="flex h-32 items-end gap-1.5">
                  {chartBars.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-blue-400 opacity-80"
                    />
                  ))}
                </div>
                <div className="mt-3 flex justify-between text-xs text-muted">
                  <span>Jan</span><span>Jun</span><span>Dec</span>
                </div>
              </div>

              <div className="rounded-[18px] bg-black/5 dark:bg-white/5 p-5 lg:col-span-1">
                <div className="mb-3 flex items-center gap-2 text-sm text-muted">
                  <Calendar className="h-4 w-4" />
                  Today&apos;s Schedule
                </div>
                <div className="space-y-3">
                  {[
                    { time: "9:00 AM", event: "Staff Meeting", color: "bg-indigo-500" },
                    { time: "11:30 AM", event: "Parent-Teacher Meet", color: "bg-purple-500" },
                    { time: "2:00 PM", event: "Sports Day Prep", color: "bg-emerald-500" },
                  ].map((e) => (
                    <div key={e.time} className="flex items-center gap-3">
                      <div className={`h-8 w-1 rounded-full ${e.color}`} />
                      <div>
                        <p className="text-xs font-medium">{e.event}</p>
                        <p className="text-xs text-muted">{e.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[18px] bg-black/5 dark:bg-white/5 p-5 lg:col-span-2">
                <div className="mb-3 flex items-center gap-2 text-sm text-muted">
                  <Bus className="h-4 w-4" />
                  Live Bus Tracking
                </div>
                <div className="relative h-28 overflow-hidden rounded-xl bg-indigo-500/5">
                  <svg viewBox="0 0 300 80" className="h-full w-full">
                    <path d="M20,60 Q80,20 150,40 T280,30" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="6 4" />
                    {[40, 120, 200].map((x, i) => (
                      <circle key={i} cx={x} cy={i === 0 ? 55 : i === 1 ? 35 : 32} r="4" fill="currentColor" opacity="0.2" />
                    ))}
                    <motion.g
                      animate={{ x: [0, 240] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <rect x="0" y="-8" width="20" height="12" rx="3" fill="#f59e0b" />
                      <text x="4" y="2" fontSize="6" fill="white">🚌</text>
                    </motion.g>
                  </svg>
                  <div className="absolute bottom-2 left-3 text-xs">
                    <span className="font-medium">Route 7</span>
                    <span className="text-muted"> · ETA 8 min</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[18px] bg-black/5 dark:bg-white/5 p-5 lg:col-span-2">
                <div className="mb-3 flex items-center gap-2 text-sm text-muted">
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
                      className="flex items-start gap-2 rounded-lg bg-indigo-500/10 p-2.5 text-xs"
                    >
                      <Bot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-500" />
                      {insight}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-[18px] bg-black/5 dark:bg-white/5 p-5 lg:col-span-2">
                <div className="mb-3 flex items-center gap-2 text-sm text-muted">
                  <Bell className="h-4 w-4" />
                  Live Notifications
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={notifIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-4"
                  >
                    <MessageSquare className="h-5 w-5 text-indigo-500" />
                    <p className="text-sm">{notifications[notifIndex]}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

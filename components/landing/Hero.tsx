"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Bot,
  Bus,
  Calendar,
  CheckCircle2,
  CreditCard,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { GradientMesh } from "@/components/ui/GradientMesh";
import { MagneticButton } from "@/components/ui/MagneticButton";

const floatingCards = [
  { icon: Users, label: "Student Attendance", value: "94.2%", color: "from-emerald-500 to-teal-500", delay: 0 },
  { icon: CreditCard, label: "Fee Collection", value: "₹12.4L", color: "from-blue-500 to-indigo-500", delay: 0.5 },
  { icon: Bus, label: "Bus Live Tracking", value: "3 Active", color: "from-orange-500 to-amber-500", delay: 1 },
  { icon: Bot, label: "AI Assistant", value: "Online", color: "from-purple-500 to-violet-500", delay: 1.5 },
  { icon: Bell, label: "Notifications", value: "12 New", color: "from-pink-500 to-rose-500", delay: 2 },
  { icon: TrendingUp, label: "Exam Results", value: "Published", color: "from-cyan-500 to-blue-500", delay: 2.5 },
];

export function Hero() {
  const [attendance, setAttendance] = useState(847);

  useEffect(() => {
    const interval = setInterval(() => {
      setAttendance((prev) => (prev < 892 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      <GradientMesh />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              AI-Powered Platform · Trusted by 500+ Schools
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            >
              The Complete{" "}
              <span className="gradient-text">AI-Powered</span> School Management Platform.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
            >
              Automate administration, academics, communication, finance, and transportation —
              all in one intelligent platform designed for modern schools.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <MagneticButton variant="primary" className="!px-8 !py-3.5 text-base">
                Get Started
              </MagneticButton>
              <MagneticButton variant="secondary" className="!px-8 !py-3.5 text-base">
                Book Demo
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-6 text-sm text-muted"
            >
              <div className="flex -space-x-2">
                {["A", "B", "C", "D"].map((l, i) => (
                  <div
                    key={l}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-indigo-400 to-blue-500 text-xs font-medium text-white"
                    style={{ zIndex: 4 - i }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <span>Join 500+ schools already transforming education</span>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative mx-auto max-w-lg"
            >
              <div className="glass gradient-border overflow-hidden rounded-[24px] shadow-[var(--shadow-glow)]">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="ml-2 text-xs text-muted">MySchoolOps Dashboard</span>
                </div>

                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted">Live Attendance</p>
                      <motion.p
                        key={attendance}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold gradient-text"
                      >
                        {attendance}
                      </motion.p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      +45 today
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-3 gap-3">
                    {[
                      { label: "Present", val: "94%", color: "bg-emerald-500" },
                      { label: "Absent", val: "4%", color: "bg-red-400" },
                      { label: "Late", val: "2%", color: "bg-amber-400" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl bg-black/5 dark:bg-white/5 p-3">
                        <div className={`mb-2 h-1.5 w-full rounded-full ${s.color} opacity-80`} />
                        <p className="text-xs text-muted">{s.label}</p>
                        <p className="text-sm font-semibold">{s.val}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4 rounded-xl bg-black/5 dark:bg-white/5 p-3">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-muted">Fee Collection</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "78%" }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-indigo-500/10 p-3">
                    <Bot className="h-4 w-4 text-indigo-500" />
                    <p className="text-xs">
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">AI Alert:</span>{" "}
                      3 students flagged for low attendance
                    </p>
                  </div>
                </div>
              </div>

              {floatingCards.map((card, i) => {
                const Icon = card.icon;
                const positions = [
                  "absolute -top-4 -left-8",
                  "absolute -top-2 -right-6",
                  "absolute top-1/3 -left-12",
                  "absolute top-1/2 -right-10",
                  "absolute -bottom-4 -left-4",
                  "absolute -bottom-2 -right-8",
                ];
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + card.delay * 0.2 }}
                    className={`${positions[i]} hidden lg:block`}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
                      className="glass rounded-2xl px-4 py-3 shadow-[var(--shadow-soft)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${card.color} text-white`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted">{card.label}</p>
                          <p className="text-sm font-semibold">{card.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

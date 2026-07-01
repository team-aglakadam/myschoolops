"use client";

import { motion } from "framer-motion";
import { Bot, CheckCircle2, TrendingUp } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const students = [
  { name: "Aarav S.", grade: "10-A", present: true, avatar: "AS" },
  { name: "Priya M.", grade: "10-A", present: true, avatar: "PM" },
  { name: "Rohan K.", grade: "10-B", present: true, avatar: "RK" },
  { name: "Sneha R.", grade: "9-A", present: false, avatar: "SR" },
  { name: "Vikram P.", grade: "9-B", present: true, avatar: "VP" },
  { name: "Ananya D.", grade: "8-C", present: true, avatar: "AD" },
];

const weekData = [88, 91, 94, 89, 96, 92, 94];

export function AttendanceSection() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-emerald-500">
            Smart Attendance
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Beautiful attendance management
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-2">
            <div className="glass gradient-border rounded-[24px] p-6 shadow-[var(--shadow-soft)]">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-semibold">Today&apos;s Attendance</h3>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  94.2% Present
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {students.map((student, i) => (
                  <motion.div
                    key={student.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 rounded-[18px] bg-black/5 dark:bg-white/5 p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 text-xs font-medium text-white">
                      {student.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{student.name}</p>
                      <p className="text-xs text-muted">{student.grade}</p>
                    </div>
                    {student.present ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      </motion.div>
                    ) : (
                      <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs text-red-500">Absent</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="left">
            <div className="space-y-4">
              <div className="glass rounded-[20px] p-6 text-center">
                <div className="relative mx-auto mb-4 h-32 w-32">
                  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="8" />
                    <motion.circle
                      cx="50" cy="50" r="42"
                      fill="none"
                      stroke="url(#ringGrad)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="264"
                      initial={{ strokeDashoffset: 264 }}
                      whileInView={{ strokeDashoffset: 264 * 0.058 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">94%</span>
                    <span className="text-xs text-muted">This Week</span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-[20px] p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  Weekly Analytics
                </div>
                <div className="flex h-20 items-end gap-1.5">
                  {weekData.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-emerald-600 to-teal-400"
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </div>

              <div className="glass rounded-[20px] p-5">
                <div className="flex items-start gap-3">
                  <Bot className="mt-0.5 h-5 w-5 text-indigo-500" />
                  <div>
                    <p className="text-sm font-medium">AI Insight</p>
                    <p className="mt-1 text-xs text-muted">
                      Grade 9-A shows 12% higher absenteeism on Mondays. Consider scheduling engaging activities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

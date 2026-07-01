"use client";

import { motion } from "framer-motion";
import { Bell, BookOpen, GraduationCap, LayoutDashboard, MessageSquare } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const apps = [
  {
    title: "Parent App",
    icon: MessageSquare,
    color: "from-pink-500 to-rose-500",
    features: ["Live bus tracking", "Fee payments", "Report cards"],
    rotate: -8,
  },
  {
    title: "Teacher App",
    icon: BookOpen,
    color: "from-indigo-500 to-blue-500",
    features: ["Attendance marking", "Grade entry", "Assignments"],
    rotate: -3,
  },
  {
    title: "Student App",
    icon: GraduationCap,
    color: "from-emerald-500 to-teal-500",
    features: ["Timetable", "Homework", "Results"],
    rotate: 3,
  },
  {
    title: "Admin Dashboard",
    icon: LayoutDashboard,
    color: "from-purple-500 to-violet-500",
    features: ["Analytics", "Reports", "Settings"],
    rotate: 8,
  },
];

function PhoneMockup({
  title,
  icon: Icon,
  color,
  features,
  rotate,
  delay,
}: (typeof apps)[0] & { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -10, rotate: 0 }}
      style={{ rotate: `${rotate}deg` }}
      className="relative"
    >
      <div className="glass gradient-border mx-auto w-48 overflow-hidden rounded-[28px] shadow-[var(--shadow-glow)]">
        <div className="flex justify-center pt-3">
          <div className="h-1.5 w-12 rounded-full bg-black/20 dark:bg-white/20" />
        </div>
        <div className="p-4">
          <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white`}>
            <Icon className="h-5 w-5" />
          </div>
          <h4 className="mb-3 text-sm font-semibold">{title}</h4>
          <div className="space-y-2">
            {features.map((f) => (
              <div key={f} className="rounded-lg bg-black/5 dark:bg-white/5 px-3 py-2 text-xs text-muted">
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -6, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, delay }}
        className="absolute -right-2 top-8 flex items-center gap-1.5 rounded-xl bg-indigo-600 px-2.5 py-1.5 text-[10px] text-white shadow-lg"
      >
        <Bell className="h-3 w-3" />
        New alert
      </motion.div>
    </motion.div>
  );
}

export function MobileShowcase() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-purple-500">
            Mobile Apps
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Apps for everyone in your school
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Native iOS and Android apps for parents, teachers, students, and administrators.
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap items-end justify-center gap-6 lg:gap-4">
          {apps.map((app, i) => (
            <PhoneMockup key={app.title} {...app} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Bell, BookOpen, GraduationCap, LayoutDashboard, MessageSquare } from "lucide-react";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { SectionContainer } from "@/components/layout";
import { cn } from "@/lib/utils";

const APPS = [
  { title: "Parent App", icon: MessageSquare, gradient: "feature-pink", features: ["Live bus tracking", "Fee payments", "Report cards"], rotate: -8 },
  { title: "Teacher App", icon: BookOpen, gradient: "feature-blue", features: ["Attendance marking", "Grade entry", "Assignments"], rotate: -3 },
  { title: "Student App", icon: GraduationCap, gradient: "feature-emerald", features: ["Timetable", "Homework", "Results"], rotate: 3 },
  { title: "Admin Dashboard", icon: LayoutDashboard, gradient: "feature-purple", features: ["Analytics", "Reports", "Settings"], rotate: 8 },
];

function PhoneMockup({ title, icon: Icon, gradient, features, rotate, delay }: (typeof APPS)[0] & { delay: number }) {
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
      <div className="glass gradient-border mx-auto w-48 overflow-hidden rounded-[28px] shadow-glow">
        <div className="flex justify-center pt-3">
          <div className="h-1.5 w-12 rounded-full bg-surface" />
        </div>
        <div className="p-4">
          <div className={cn("mb-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-primary-foreground", gradient)}>
            <Icon className="h-5 w-5" />
          </div>
          <h4 className="mb-3 text-sm font-semibold">{title}</h4>
          <div className="space-y-2">
            {features.map((f) => (
              <div key={f} className="rounded-[var(--radius-md)] bg-surface px-3 py-2 text-xs text-muted-foreground">{f}</div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        animate={{ y: [0, -6, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, delay }}
        className="absolute -right-2 top-8 flex items-center gap-1.5 rounded-[var(--radius-md)] bg-primary px-2.5 py-1.5 text-[10px] text-primary-foreground shadow-lg"
      >
        <Bell className="h-3 w-3" />
        New alert
      </motion.div>
    </motion.div>
  );
}

export function MobileShowcase() {
  return (
    <SectionContainer className="overflow-hidden">
      <ScrollReveal className="mb-16">
        <SectionTitle
          eyebrow="Mobile Apps"
          eyebrowClassName="text-accent"
          title="Apps for everyone in your school"
          description="Native iOS and Android apps for parents, teachers, students, and administrators."
        />
      </ScrollReveal>

      <div className="flex flex-wrap items-end justify-center gap-6 lg:gap-4">
        {APPS.map((app, i) => (
          <PhoneMockup key={app.title} {...app} delay={i * 0.15} />
        ))}
      </div>
    </SectionContainer>
  );
}

"use client";

import { motion } from "framer-motion";
import { Bot, CheckCircle2, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/common/glass-card";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { BarChart, RingChart } from "@/components/charts";
import { SectionContainer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { checkPop } from "@/lib/animations";

const STUDENTS = [
  { name: "Aarav S.", grade: "10-A", present: true, avatar: "AS" },
  { name: "Priya M.", grade: "10-A", present: true, avatar: "PM" },
  { name: "Rohan K.", grade: "10-B", present: true, avatar: "RK" },
  { name: "Sneha R.", grade: "9-A", present: false, avatar: "SR" },
  { name: "Vikram P.", grade: "9-B", present: true, avatar: "VP" },
  { name: "Ananya D.", grade: "8-C", present: true, avatar: "AD" },
];

const WEEK_DATA = [88, 91, 94, 89, 96, 92, 94];

export function AttendancePreview() {
  return (
    <SectionContainer className="overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-success/5 via-transparent to-transparent" />
      <div className="relative">
        <ScrollReveal className="mb-16">
          <SectionTitle eyebrow="Smart Attendance" eyebrowClassName="text-success" title="Beautiful attendance management" />
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-2">
            <GlassCard glow className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-semibold">Today&apos;s Attendance</h3>
                <Badge variant="success">94.2% Present</Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {STUDENTS.map((student, i) => (
                  <motion.div
                    key={student.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 rounded-[var(--radius-lg)] bg-surface p-4"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{student.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.grade}</p>
                    </div>
                    {student.present ? (
                      <motion.div variants={checkPop} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}>
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      </motion.div>
                    ) : (
                      <Badge variant="destructive">Absent</Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="left">
            <div className="space-y-4">
              <GlassCard className="p-6 text-center">
                <RingChart value={94} label="94%" sublabel="This Week" />
              </GlassCard>

              <GlassCard className="p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="h-4 w-4 text-success" />
                  Weekly Analytics
                </div>
                <BarChart data={WEEK_DATA} height="h-20" barClassName="bg-chart-bar" />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d) => <span key={d}>{d}</span>)}
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <Bot className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">AI Insight</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Grade 9-A shows 12% higher absenteeism on Mondays. Consider scheduling engaging activities.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </SectionContainer>
  );
}

"use client";

import { motion } from "framer-motion";
import { Bot, Trophy, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/common/glass-card";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { BarChart, HorizontalBar } from "@/components/charts";
import { SectionContainer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";

const SUBJECTS = [
  { name: "Mathematics", score: 88, gradient: "feature-indigo" },
  { name: "Science", score: 92, gradient: "feature-emerald" },
  { name: "English", score: 85, gradient: "feature-purple" },
  { name: "History", score: 78, gradient: "feature-orange" },
];

const LEADERBOARD = [
  { rank: 1, name: "Aarav Sharma", score: 96.2, change: "+2.1" },
  { rank: 2, name: "Priya Mehta", score: 94.8, change: "+1.5" },
  { rank: 3, name: "Rohan Kapoor", score: 93.1, change: "+0.8" },
  { rank: 4, name: "Sneha Reddy", score: 91.5, change: "-0.3" },
];

const GROWTH_DATA = [65, 70, 68, 75, 78, 82, 85, 88, 86, 90, 92, 94];

const RANK_STYLES: Record<number, string> = {
  1: "bg-warning/20 text-warning",
  2: "bg-muted/20 text-muted-foreground",
  3: "bg-[var(--feature-orange-from)]/20 text-[var(--feature-orange-from)]",
};

export function Analytics() {
  return (
    <SectionContainer>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="relative">
        <ScrollReveal className="mb-16">
          <SectionTitle eyebrow="Student Analytics" title="Data-driven academic insights" />
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-2">
            <GlassCard glow className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-semibold">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Academic Growth
                </h3>
                <Badge variant="success">+12% YoY</Badge>
              </div>
              <BarChart data={GROWTH_DATA} height="h-40" />
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <GlassCard className="p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <Trophy className="h-5 w-5 text-warning" />
                Leaderboard
              </h3>
              <div className="space-y-3">
                {LEADERBOARD.map((student, i) => (
                  <motion.div
                    key={student.rank}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 rounded-[var(--radius-lg)] bg-surface p-3"
                  >
                    <span className={`flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] text-xs font-bold ${RANK_STYLES[student.rank] ?? "bg-surface text-muted-foreground"}`}>
                      #{student.rank}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.score}% avg</p>
                    </div>
                    <span className={`text-xs font-medium ${student.change.startsWith("+") ? "text-success" : "text-destructive"}`}>
                      {student.change}
                    </span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="lg:col-span-2">
            <GlassCard className="p-6">
              <h3 className="mb-4 font-semibold">Subject Comparison</h3>
              <div className="space-y-4">
                {SUBJECTS.map((subject, i) => (
                  <HorizontalBar key={subject.name} label={subject.name} value={subject.score} gradient={subject.gradient} delay={i * 0.15} />
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <GlassCard className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">AI Predictions</h3>
              </div>
              <div className="space-y-3">
                {[
                  "Top 10% likely to score 95%+ in finals",
                  "3 students need Math intervention",
                  "Class average trending +4% this term",
                ].map((pred, i) => (
                  <motion.p key={pred} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="rounded-[var(--radius-md)] bg-primary/10 p-3 text-xs">
                    {pred}
                  </motion.p>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </SectionContainer>
  );
}

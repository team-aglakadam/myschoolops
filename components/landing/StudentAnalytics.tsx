"use client";

import { motion } from "framer-motion";
import { Bot, Trophy, TrendingUp } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const subjects = [
  { name: "Mathematics", score: 88, color: "from-indigo-500 to-blue-500" },
  { name: "Science", score: 92, color: "from-emerald-500 to-teal-500" },
  { name: "English", score: 85, color: "from-purple-500 to-violet-500" },
  { name: "History", score: 78, color: "from-orange-500 to-amber-500" },
];

const leaderboard = [
  { rank: 1, name: "Aarav Sharma", score: 96.2, change: "+2.1" },
  { rank: 2, name: "Priya Mehta", score: 94.8, change: "+1.5" },
  { rank: 3, name: "Rohan Kapoor", score: 93.1, change: "+0.8" },
  { rank: 4, name: "Sneha Reddy", score: 91.5, change: "-0.3" },
];

const growthData = [65, 70, 68, 75, 78, 82, 85, 88, 86, 90, 92, 94];

export function StudentAnalytics() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-500">
            Student Analytics
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Data-driven academic insights
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-2">
            <div className="glass gradient-border rounded-[24px] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-semibold">
                  <TrendingUp className="h-5 w-5 text-indigo-500" />
                  Academic Growth
                </h3>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-600 dark:text-emerald-400">
                  +12% YoY
                </span>
              </div>
              <div className="flex h-40 items-end gap-1">
                {growthData.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600/80 to-blue-400/80"
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="glass rounded-[24px] p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <Trophy className="h-5 w-5 text-amber-500" />
                Leaderboard
              </h3>
              <div className="space-y-3">
                {leaderboard.map((student, i) => (
                  <motion.div
                    key={student.rank}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 rounded-[18px] bg-black/5 dark:bg-white/5 p-3"
                  >
                    <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                      student.rank === 1 ? "bg-amber-500/20 text-amber-600" :
                      student.rank === 2 ? "bg-gray-400/20 text-gray-600" :
                      student.rank === 3 ? "bg-orange-600/20 text-orange-600" :
                      "bg-black/5 text-muted"
                    }`}>
                      #{student.rank}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{student.name}</p>
                      <p className="text-xs text-muted">{student.score}% avg</p>
                    </div>
                    <span className={`text-xs font-medium ${student.change.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}>
                      {student.change}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="lg:col-span-2">
            <div className="glass rounded-[24px] p-6">
              <h3 className="mb-4 font-semibold">Subject Comparison</h3>
              <div className="space-y-4">
                {subjects.map((subject, i) => (
                  <div key={subject.name}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span>{subject.name}</span>
                      <span className="font-medium">{subject.score}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${subject.score}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.8 }}
                        className={`h-full rounded-full bg-gradient-to-r ${subject.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="glass rounded-[24px] p-6">
              <div className="mb-3 flex items-center gap-2">
                <Bot className="h-5 w-5 text-indigo-500" />
                <h3 className="font-semibold">AI Predictions</h3>
              </div>
              <div className="space-y-3">
                {[
                  "Top 10% likely to score 95%+ in finals",
                  "3 students need Math intervention",
                  "Class average trending +4% this term",
                ].map((pred, i) => (
                  <motion.p
                    key={pred}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="rounded-xl bg-indigo-500/10 p-3 text-xs"
                  >
                    {pred}
                  </motion.p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Calendar,
  CreditCard,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const aiFeatures = [
  { icon: Users, title: "AI Attendance Prediction", desc: "Predict absenteeism patterns before they happen" },
  { icon: Target, title: "AI Risk Detection", desc: "Identify struggling students early with smart alerts" },
  { icon: MessageCircle, title: "AI Parent Chatbot", desc: "24/7 intelligent parent support assistant" },
  { icon: CreditCard, title: "AI Fee Defaulter Prediction", desc: "Forecast payment delays and automate reminders" },
  { icon: GraduationCap, title: "AI Exam Analysis", desc: "Deep performance insights from every assessment" },
  { icon: Calendar, title: "AI Timetable Generator", desc: "Optimal schedules generated in seconds" },
  { icon: TrendingUp, title: "AI Performance Insights", desc: "Personalized learning path recommendations" },
  { icon: Sparkles, title: "AI Learning Recommendations", desc: "Tailored content for every student" },
  { icon: Brain, title: "AI Admin Assistant", desc: "Automate reports, emails, and daily tasks" },
];

function NeuralNetwork() {
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    x: 10 + (i % 4) * 30,
    y: 15 + Math.floor(i / 4) * 35,
    delay: i * 0.1,
  }));

  return (
    <svg viewBox="0 0 120 100" className="absolute inset-0 h-full w-full opacity-20">
      {nodes.map((n, i) =>
        nodes.slice(i + 1).map((n2, j) => (
          <motion.line
            key={`${i}-${j}`}
            x1={n.x}
            y1={n.y}
            x2={n2.x}
            y2={n2.y}
            stroke="url(#grad)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, delay: n.delay }}
          />
        ))
      )}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="2"
          fill="#6366f1"
          animate={{ opacity: [0.3, 1, 0.3], r: [2, 3, 2] }}
          transition={{ duration: 2, repeat: Infinity, delay: n.delay }}
        />
      ))}
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AISection() {
  return (
    <section id="ai" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-purple-500/5" />
      <NeuralNetwork />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400">
            <Sparkles className="h-4 w-4" />
            Artificial Intelligence
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built with{" "}
            <span className="gradient-text">Artificial Intelligence.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Harness the power of AI to automate decisions, predict outcomes, and personalize education at scale.
          </p>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative overflow-hidden rounded-[20px] border border-indigo-500/10 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 p-6 transition-shadow hover:shadow-[var(--shadow-glow)]"
                >
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl transition-all group-hover:bg-indigo-500/20" />
                  <div className="relative">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted">{feature.desc}</p>
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

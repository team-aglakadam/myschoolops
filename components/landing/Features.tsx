"use client";

import { motion } from "framer-motion";
import {
  Award,
  Bell,
  BookOpen,
  Bot,
  Bus,
  Calendar,
  ClipboardList,
  CreditCard,
  Home,
  Library,
  MessageSquare,
  QrCode,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const features = [
  { icon: QrCode, title: "Smart Attendance", desc: "Face Recognition & QR scanning", color: "from-emerald-500 to-teal-500" },
  { icon: CreditCard, title: "Online Fee Payments", desc: "UPI, cards & net banking", color: "from-blue-500 to-indigo-500" },
  { icon: Bot, title: "AI Report Card Generator", desc: "Automated grade reports", color: "from-purple-500 to-violet-500" },
  { icon: BookOpen, title: "AI Homework Assistant", desc: "Smart assignment help", color: "from-cyan-500 to-blue-500" },
  { icon: TrendingUp, title: "Performance Analytics", desc: "Deep student insights", color: "from-orange-500 to-amber-500" },
  { icon: Bus, title: "Bus GPS Tracking", desc: "Real-time route monitoring", color: "from-red-500 to-rose-500" },
  { icon: MessageSquare, title: "Parent Portal", desc: "Seamless communication", color: "from-pink-500 to-rose-500" },
  { icon: ClipboardList, title: "Homework & Assignments", desc: "Digital submission tracking", color: "from-indigo-500 to-purple-500" },
  { icon: Calendar, title: "Timetable Automation", desc: "AI-powered scheduling", color: "from-teal-500 to-emerald-500" },
  { icon: Library, title: "Library Management", desc: "Catalog & issue tracking", color: "from-amber-500 to-orange-500" },
  { icon: Home, title: "Hostel Management", desc: "Room & mess management", color: "from-sky-500 to-blue-500" },
  { icon: Wallet, title: "Staff Payroll", desc: "Automated salary processing", color: "from-lime-500 to-green-500" },
  { icon: Users, title: "Admission Management", desc: "End-to-end enrollment", color: "from-fuchsia-500 to-purple-500" },
  { icon: Award, title: "Digital Certificates", desc: "Instant credential issuance", color: "from-violet-500 to-indigo-500" },
  { icon: Bell, title: "Smart Notifications", desc: "Multi-channel alerts", color: "from-rose-500 to-pink-500" },
];

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-500">
            Features
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything your school needs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            15 powerful modules designed to streamline every aspect of school management.
          </p>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.05}>
                <GlassCard glow hover className="group h-full cursor-default">
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="mb-1 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted">{feature.desc}</p>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

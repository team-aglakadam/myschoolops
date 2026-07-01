"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Cloud,
  Globe,
  Headphones,
  Lock,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const reasons = [
  {
    icon: Bot,
    title: "AI Automation",
    desc: "Intelligent workflows that save hours of manual work every day.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Cloud,
    title: "Cloud Based",
    desc: "Access from anywhere. No servers to maintain, always up to date.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lock,
    title: "Secure",
    desc: "Bank-grade encryption, role-based access, and GDPR compliance.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Zap,
    title: "Fast",
    desc: "Lightning-fast performance with 99.9% uptime guarantee.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    desc: "Native apps for iOS and Android with offline support.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Sparkles,
    title: "Easy to Use",
    desc: "Intuitive interface that requires zero training to get started.",
    color: "from-violet-500 to-indigo-500",
  },
  {
    icon: Headphones,
    title: "24×7 Support",
    desc: "Dedicated support team available round the clock.",
    color: "from-sky-500 to-blue-500",
  },
  {
    icon: Globe,
    title: "Multi-language",
    desc: "Support for 12+ Indian languages and regional customization.",
    color: "from-lime-500 to-green-500",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-500">
            Why Choose Us
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built for the future of education
          </h2>
        </ScrollReveal>

        <div className="space-y-16">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            const isEven = i % 2 === 0;
            return (
              <ScrollReveal key={reason.title} delay={0.1}>
                <div className={`grid items-center gap-12 lg:grid-cols-2 ${isEven ? "" : "lg:[direction:rtl]"}`}>
                  <div className={isEven ? "" : "lg:[direction:ltr]"}>
                    <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${reason.color} text-white shadow-lg`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold">{reason.title}</h3>
                    <p className="max-w-md text-muted">{reason.desc}</p>
                  </div>

                  <div className={`${isEven ? "" : "lg:[direction:ltr]"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass gradient-border relative overflow-hidden rounded-[24px] p-8 shadow-[var(--shadow-soft)]"
                    >
                      <div className={`absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-to-br ${reason.color} opacity-10 blur-3xl`} />
                      <div className="relative flex h-48 items-center justify-center">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className={`flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${reason.color} text-white shadow-2xl`}
                        >
                          <Icon className="h-12 w-12" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

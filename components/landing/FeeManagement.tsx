"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2, CreditCard, Smartphone, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const paymentMethods = [
  { icon: Smartphone, label: "UPI", color: "from-purple-500 to-indigo-500" },
  { icon: CreditCard, label: "Card", color: "from-blue-500 to-cyan-500" },
  { icon: Building2, label: "Net Banking", color: "from-emerald-500 to-teal-500" },
];

export function FeeManagement() {
  const [collected, setCollected] = useState(72);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const t1 = setInterval(() => setCollected((p) => (p < 89 ? p + 1 : p)), 3000);
    const t2 = setInterval(() => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    }, 6000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <ScrollReveal delay={0.2} direction="right">
            <div className="glass gradient-border relative overflow-hidden rounded-[24px] shadow-[var(--shadow-glow)]">
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm text-white shadow-lg"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Payment Successful — ₹15,000
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-semibold">Fee Collection Overview</h3>
                  <span className="text-2xl font-bold gradient-text">{collected}%</span>
                </div>

                <div className="mb-6 h-3 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                  <motion.div
                    animate={{ width: `${collected}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-blue-500"
                    transition={{ duration: 0.8 }}
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-3">
                  {[
                    { label: "Collected", value: "₹48.2L", color: "text-emerald-500" },
                    { label: "Pending", value: "₹12.8L", color: "text-amber-500" },
                    { label: "Overdue", value: "₹3.1L", color: "text-red-500" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-[18px] bg-black/5 dark:bg-white/5 p-4 text-center">
                      <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-muted">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-4 flex gap-3">
                  {paymentMethods.map(({ icon: Icon, label, color }) => (
                    <div key={label} className="flex flex-1 flex-col items-center gap-2 rounded-[18px] bg-black/5 dark:bg-white/5 p-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-medium">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 rounded-[18px] bg-amber-500/10 p-4">
                  <Bell className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-sm font-medium">Payment Reminder Sent</p>
                    <p className="text-xs text-muted">42 families notified via SMS & app</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-blue-500">
              Fee Management
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Seamless online{" "}
              <span className="gradient-text">fee collection</span>
            </h2>
            <p className="mt-4 text-muted">
              Accept payments via UPI, cards, and net banking. Automated reminders,
              real-time collection stats, and beautiful revenue analytics.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Bus, Clock, MapPin, Shield, User, Gauge } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function BusTracking() {
  return (
    <section id="solutions" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <ScrollReveal>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-orange-500">
              Live GPS Tracking
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Real-time bus tracking for{" "}
              <span className="gradient-text">parent peace of mind</span>
            </h2>
            <p className="mt-4 text-muted">
              Monitor every bus in real-time. Parents receive live ETA updates, arrival countdowns,
              and safety status notifications automatically.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: MapPin, text: "Live GPS visualization on interactive maps" },
                { icon: Clock, text: "Automatic ETA updates sent to parents" },
                { icon: Shield, text: "Safety status & speed monitoring" },
                { icon: User, text: "Driver profile & contact information" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="left">
            <div className="glass gradient-border overflow-hidden rounded-[24px] shadow-[var(--shadow-glow)]">
              <div className="relative h-64 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 p-6">
                <svg viewBox="0 0 400 200" className="h-full w-full">
                  <path
                    d="M30,150 Q100,50 200,80 T370,60"
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.2"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                  />
                  <path
                    d="M30,150 Q100,50 200,80 T370,60"
                    fill="none"
                    stroke="url(#routeGrad)"
                    strokeWidth="3"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                  >
                    <animate attributeName="stroke-dashoffset" from="400" to="0" dur="4s" repeatCount="indefinite" />
                  </path>
                  <defs>
                    <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  {[
                    { cx: 30, cy: 150, label: "School" },
                    { cx: 150, cy: 70, label: "Stop 1" },
                    { cx: 280, cy: 65, label: "Stop 2" },
                  ].map((stop) => (
                    <g key={stop.label}>
                      <circle cx={stop.cx} cy={stop.cy} r="6" fill="#6366f1" opacity="0.8" />
                      <text x={stop.cx} y={stop.cy + 18} textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.5">
                        {stop.label}
                      </text>
                    </g>
                  ))}
                  <motion.g
                    animate={{ offsetDistance: ["0%", "100%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    style={{ offsetPath: "path('M30,150 Q100,50 200,80 T370,60')" }}
                  >
                    <rect x="-12" y="-8" width="24" height="16" rx="4" fill="#f59e0b" />
                    <text x="-6" y="4" fontSize="10">🚌</text>
                  </motion.g>
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-4 p-5">
                <div className="rounded-[18px] bg-black/5 dark:bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <User className="h-4 w-4 text-muted" />
                    <span className="text-xs text-muted">Driver</span>
                  </div>
                  <p className="font-semibold">Rajesh Kumar</p>
                  <p className="text-xs text-muted">Route 7 · 12 yrs exp</p>
                </div>
                <div className="rounded-[18px] bg-black/5 dark:bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-muted" />
                    <span className="text-xs text-muted">Speed</span>
                  </div>
                  <p className="font-semibold">42 km/h</p>
                  <p className="text-xs text-emerald-500">Within limit</p>
                </div>
                <div className="rounded-[18px] bg-emerald-500/10 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs text-muted">Safety</span>
                  </div>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">All Clear</p>
                </div>
                <div className="rounded-[18px] bg-orange-500/10 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-xs text-muted">Arrival</span>
                  </div>
                  <motion.p
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="font-semibold text-orange-600 dark:text-orange-400"
                  >
                    8 min
                  </motion.p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

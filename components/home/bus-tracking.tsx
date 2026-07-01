"use client";

import { motion } from "framer-motion";
import { Bus, Clock, Gauge, MapPin, Shield, User } from "lucide-react";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { DashboardCard, SectionContainer } from "@/components/layout";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = [
  { icon: MapPin, text: "Live GPS visualization on interactive maps" },
  { icon: Clock, text: "Automatic ETA updates sent to parents" },
  { icon: Shield, text: "Safety status & speed monitoring" },
  { icon: User, text: "Driver profile & contact information" },
];

export function BusTracking() {
  return (
    <SectionContainer id="solutions">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <ScrollReveal>
          <SectionTitle
            align="left"
            eyebrow="Live GPS Tracking"
            eyebrowClassName="text-warning"
            title="Real-time bus tracking for"
            highlight="parent peace of mind"
            description="Monitor every bus in real-time. Parents receive live ETA updates, arrival countdowns, and safety status notifications automatically."
          />

          <div className="mt-8 space-y-4">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-warning/10 text-warning">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm">{text}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} direction="left">
          <DashboardCard glow className="overflow-hidden">
            <div className="relative h-64 bg-gradient-to-br from-primary/10 to-info/10 p-6">
              <svg viewBox="0 0 400 200" className="h-full w-full" aria-hidden="true">
                <path d="M30,150 Q100,50 200,80 T370,60" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" strokeDasharray="8 6" />
                <path d="M30,150 Q100,50 200,80 T370,60" fill="none" stroke="var(--primary)" strokeWidth="3" strokeDasharray="400" strokeDashoffset="400">
                  <animate attributeName="stroke-dashoffset" from="400" to="0" dur="4s" repeatCount="indefinite" />
                </path>
                {[
                  { cx: 30, cy: 150, label: "School" },
                  { cx: 150, cy: 70, label: "Stop 1" },
                  { cx: 280, cy: 65, label: "Stop 2" },
                ].map((stop) => (
                  <g key={stop.label}>
                    <circle cx={stop.cx} cy={stop.cy} r="6" fill="var(--primary)" opacity="0.8" />
                    <text x={stop.cx} y={stop.cy + 18} textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.5">{stop.label}</text>
                  </g>
                ))}
                <motion.g animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} style={{ offsetPath: "path('M30,150 Q100,50 200,80 T370,60')" }}>
                  <rect x="-12" y="-8" width="24" height="16" rx="4" fill="var(--warning)" />
                </motion.g>
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-4 p-5">
              <InfoCard icon={User} label="Driver" value="Rajesh Kumar" sub="Route 7 · 12 yrs exp" />
              <InfoCard icon={Gauge} label="Speed" value="42 km/h" sub="Within limit" subClass="text-success" />
              <InfoCard icon={Shield} label="Safety" value="All Clear" valueClass="text-success" className="bg-success/10" />
              <InfoCard icon={Clock} label="Arrival" value="8 min" valueClass="text-warning" className="bg-warning/10" pulse />
            </div>
          </DashboardCard>
        </ScrollReveal>
      </div>
    </SectionContainer>
  );
}

function InfoCard({
  icon: Icon, label, value, sub, subClass, valueClass, className, pulse,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
  subClass?: string;
  valueClass?: string;
  className?: string;
  pulse?: boolean;
}) {
  return (
    <div className={cn("rounded-[var(--radius-lg)] bg-surface p-4", className)}>
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      {pulse ? (
        <motion.p animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} className={cn("font-semibold", valueClass)}>
          {value}
        </motion.p>
      ) : (
        <p className={cn("font-semibold", valueClass)}>{value}</p>
      )}
      {sub && <p className={cn("text-xs text-muted-foreground", subClass)}>{sub}</p>}
    </div>
  );
}

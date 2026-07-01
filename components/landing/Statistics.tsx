"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const stats = [
  { value: 500, suffix: "+", label: "Schools" },
  { value: 250, suffix: "K+", label: "Students" },
  { value: 20, suffix: "K+", label: "Teachers" },
  { value: 10, suffix: "M+", label: "Attendance Records" },
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
];

export function Statistics() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="glass gradient-border rounded-[24px] px-8 py-16 shadow-[var(--shadow-glow)]">
          <ScrollReveal className="mb-12 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Trusted at scale
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1} className="text-center">
                <p className="text-3xl font-bold gradient-text sm:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

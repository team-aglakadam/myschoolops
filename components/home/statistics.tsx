"use client";

import { AnimatedCounter } from "@/components/common/animated-counter";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { GlassCard } from "@/components/common/glass-card";
import { StatCard, StatisticsLayout, SectionContainer } from "@/components/layout";
import { Heading } from "@/components/typography";
import { STATISTICS } from "@/lib/constants/home";

export function Statistics() {
  return (
    <SectionContainer>
      <GlassCard glow className="px-8 py-16">
        <ScrollReveal className="mb-12 text-center">
          <Heading size="md">Trusted at scale</Heading>
        </ScrollReveal>

        <StatisticsLayout>
          {STATISTICS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <StatCard
                value={
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={"decimals" in stat ? stat.decimals : 0}
                  />
                }
                label={stat.label}
              />
            </ScrollReveal>
          ))}
        </StatisticsLayout>
      </GlassCard>
    </SectionContainer>
  );
}

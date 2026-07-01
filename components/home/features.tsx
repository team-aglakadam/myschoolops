"use client";

import { FeatureCard } from "@/components/common/feature-card";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { FeatureGrid, SectionContainer } from "@/components/layout";
import { FEATURES } from "@/lib/constants/home";

export function Features() {
  return (
    <SectionContainer id="features">
      <ScrollReveal className="mb-16">
        <SectionTitle
          eyebrow="Features"
          title="Everything your school needs"
          description="15 powerful modules designed to streamline every aspect of school management."
        />
      </ScrollReveal>

      <FeatureGrid>
        {FEATURES.map((feature, i) => (
          <ScrollReveal key={feature.title} delay={i * 0.05}>
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
            />
          </ScrollReveal>
        ))}
      </FeatureGrid>
    </SectionContainer>
  );
}

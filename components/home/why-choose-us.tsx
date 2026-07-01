"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { GlassCard } from "@/components/common/glass-card";
import { SectionContainer } from "@/components/layout";
import { WHY_CHOOSE_US } from "@/lib/constants/home";
import { cn } from "@/lib/utils";

export function WhyChooseUs() {
  return (
    <SectionContainer>
      <ScrollReveal className="mb-16">
        <SectionTitle title="Built for the future of education" eyebrow="Why Choose Us" />
      </ScrollReveal>

      <div className="space-y-16">
        {WHY_CHOOSE_US.map((reason, i) => {
          const Icon = reason.icon;
          const isEven = i % 2 === 0;
          return (
            <ScrollReveal key={reason.title} delay={0.1}>
              <div className={cn("grid items-center gap-12 lg:grid-cols-2", !isEven && "lg:[direction:rtl]")}>
                <div className={cn(!isEven && "lg:[direction:ltr]")}>
                  <div className={cn("mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[var(--radius-xl)] text-primary-foreground shadow-brand", reason.gradient)}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">{reason.title}</h3>
                  <p className="max-w-md text-muted-foreground">{reason.description}</p>
                </div>

                <div className={cn(!isEven && "lg:[direction:ltr]")}>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <GlassCard glow className="relative overflow-hidden p-8">
                      <div className={cn("absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-10 blur-3xl", reason.gradient)} />
                      <div className="relative flex h-48 items-center justify-center">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className={cn("flex h-24 w-24 items-center justify-center rounded-3xl text-primary-foreground shadow-2xl", reason.gradient)}
                        >
                          <Icon className="h-12 w-12" />
                        </motion.div>
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}

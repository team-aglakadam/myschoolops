"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/common/magnetic-button";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { CTABanner, SectionContainer } from "@/components/layout";
import { Heading, Subheading } from "@/components/typography";

export function CTA() {
  return (
    <SectionContainer>
      <ScrollReveal>
        <CTABanner className="bg-gradient-cta animate-gradient">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary-foreground/10 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl"
          />

          <div className="relative">
            <Heading size="lg" className="text-primary-foreground">
              Transform Your School with AI.
            </Heading>
            <Subheading className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Join 500+ schools already using MySchoolOps to automate operations,
              improve outcomes, and delight parents.
            </Subheading>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton variant="secondary" size="lg" className="bg-background text-primary hover:shadow-xl">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton variant="ghost" size="lg" className="border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Schedule Demo
              </MagneticButton>
            </div>
          </div>
        </CTABanner>
      </ScrollReveal>
    </SectionContainer>
  );
}

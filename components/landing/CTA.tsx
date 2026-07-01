"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTA() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[24px] px-8 py-20 text-center sm:px-16">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 animate-gradient" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, delay: 2 }}
              className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-400/20 blur-3xl"
            />

            <div className="relative">
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Transform Your School with AI.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
                Join 500+ schools already using MySchoolOps to automate operations,
                improve outcomes, and delight parents.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton
                  variant="secondary"
                  className="!bg-white !text-indigo-600 hover:!shadow-xl"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                <MagneticButton
                  variant="ghost"
                  className="!border !border-white/30 !text-white hover:!bg-white/10"
                >
                  Schedule Demo
                </MagneticButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

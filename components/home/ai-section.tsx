"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { SectionContainer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { AI_FEATURES } from "@/lib/constants/home";
import { cn } from "@/lib/utils";

function NeuralNetwork() {
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    x: 10 + (i % 4) * 30,
    y: 15 + Math.floor(i / 4) * 35,
    delay: i * 0.1,
  }));

  return (
    <svg viewBox="0 0 120 100" className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
      {nodes.map((n, i) =>
        nodes.slice(i + 1).map((n2, j) => (
          <motion.line
            key={`${i}-${j}`}
            x1={n.x} y1={n.y} x2={n2.x} y2={n2.y}
            stroke="var(--primary)" strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, delay: n.delay }}
          />
        ))
      )}
      {nodes.map((n, i) => (
        <motion.circle
          key={i} cx={n.x} cy={n.y} r="2" fill="var(--primary)"
          animate={{ opacity: [0.3, 1, 0.3], r: [2, 3, 2] }}
          transition={{ duration: 2, repeat: Infinity, delay: n.delay }}
        />
      ))}
    </svg>
  );
}

export function AISection() {
  return (
    <SectionContainer id="ai" className="overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5" />
      <NeuralNetwork />

      <div className="relative">
        <ScrollReveal className="mb-16">
          <div className="text-center">
            <Badge variant="info" className="mb-4 gap-2">
              <Sparkles className="h-4 w-4" />
              Artificial Intelligence
            </Badge>
            <SectionTitle
              title="Built with"
              highlight="Artificial Intelligence."
              description="Harness the power of AI to automate decisions, predict outcomes, and personalize education at scale."
            />
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AI_FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative overflow-hidden rounded-[var(--radius-xl)] border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-6 transition-shadow hover:shadow-glow"
                >
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />
                  <div className="relative">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand text-primary-foreground shadow-brand">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-brand"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}

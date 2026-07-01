"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/common/glass-card";
import { cn } from "@/lib/utils";

export type FeatureGradient =
  | "feature-emerald"
  | "feature-blue"
  | "feature-purple"
  | "feature-cyan"
  | "feature-orange"
  | "feature-red"
  | "feature-pink"
  | "feature-indigo"
  | "feature-teal"
  | "feature-amber"
  | "feature-sky"
  | "feature-lime"
  | "feature-fuchsia"
  | "feature-violet"
  | "feature-rose";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: FeatureGradient;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, gradient, className }: FeatureCardProps) {
  return (
    <GlassCard glow hover className={cn("group h-full cursor-default", className)}>
      <motion.div
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.5 }}
        className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-xl)] text-primary-foreground shadow-brand", gradient)}
      >
        <Icon className="h-6 w-6" />
      </motion.div>
      <h3 className="mb-1 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </GlassCard>
  );
}

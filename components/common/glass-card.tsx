"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cardHover } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ children, className, hover = true, glow = false }: GlassCardProps) {
  return (
    <motion.div whileHover={hover ? cardHover : undefined} transition={{ duration: 0.3, ease: "easeOut" }}>
      <Card
        className={cn(
          "glass border-border bg-card/80 p-6 shadow-soft",
          glow && "gradient-border shadow-glow",
          className
        )}
      >
        {children}
      </Card>
    </motion.div>
  );
}

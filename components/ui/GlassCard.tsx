"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  glow = false,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? { y: -6, boxShadow: "0 20px 60px rgba(99, 102, 241, 0.15)" }
          : undefined
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`glass rounded-[20px] p-6 ${glow ? "gradient-border shadow-[var(--shadow-glow)]" : "shadow-[var(--shadow-soft)]"} ${className}`}
    >
      {children}
    </motion.div>
  );
}

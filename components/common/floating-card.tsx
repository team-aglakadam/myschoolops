"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  gradient: string;
  delay?: number;
  className?: string;
}

export function FloatingCard({ icon: Icon, label, value, gradient, delay = 0, className }: FloatingCardProps) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      className={cn("glass rounded-[var(--radius-xl)] px-4 py-3 shadow-soft", className)}
    >
      <div className="flex items-center gap-3">
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] text-primary-foreground", gradient)}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-sm font-semibold">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

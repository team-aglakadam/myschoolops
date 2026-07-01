"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full animate-blob opacity-20 blur-[var(--blur-3xl)]"
        style={{ background: "color-mix(in srgb, var(--primary) 20%, transparent)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 -right-1/4 h-[500px] w-[500px] rounded-full animate-blob opacity-15 blur-[100px]"
        style={{ background: "color-mix(in srgb, var(--info) 15%, transparent)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute -bottom-1/4 left-1/3 h-[450px] w-[450px] rounded-full animate-blob opacity-15 blur-[110px]"
        style={{ background: "color-mix(in srgb, var(--accent) 15%, transparent)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

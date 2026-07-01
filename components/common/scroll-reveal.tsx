"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { getDirectionOffset, scrollRevealTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const offset = getDirectionOffset(direction);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={scrollRevealTransition(delay)}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

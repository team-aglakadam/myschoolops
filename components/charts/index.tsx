"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BarChartProps {
  data: number[];
  className?: string;
  barClassName?: string;
  height?: string;
  animate?: boolean;
}

export function BarChart({
  data,
  className,
  barClassName = "bg-chart-bar",
  height = "h-32",
  animate = true,
}: BarChartProps) {
  return (
    <div className={cn("flex items-end gap-1.5", height, className)}>
      {data.map((h, i) => (
        <div key={i} className="flex h-full flex-1 flex-col justify-end">
          <motion.div
            initial={animate ? { height: 0 } : false}
            whileInView={animate ? { height: `${h}%` } : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
            className={cn("w-full min-h-[4px] rounded-t-md", barClassName)}
            style={!animate ? { height: `${h}%` } : undefined}
          />
        </div>
      ))}
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export function ProgressBar({ value, className, animate = true, delay = 0 }: ProgressBarProps) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-surface", className)}>
      <motion.div
        initial={animate ? { width: 0 } : false}
        animate={{ width: `${value}%` }}
        transition={{ duration: 2, delay, ease: "easeOut" }}
        className="h-full rounded-full bg-chart-bar-horizontal"
      />
    </div>
  );
}

interface HorizontalBarProps {
  label: string;
  value: number;
  gradient?: string;
  className?: string;
  delay?: number;
}

export function HorizontalBar({
  label,
  value,
  gradient = "feature-indigo",
  className,
  delay = 0,
}: HorizontalBarProps) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-surface">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.8, ease: "easeOut" }}
          className={cn("h-full rounded-full", gradient)}
        />
      </div>
    </div>
  );
}

interface RingChartProps {
  value: number;
  size?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function RingChart({ value, size = 128, label, sublabel, className }: RingChartProps) {
  const circumference = 264;
  const offset = circumference * (1 - value / 100);

  return (
    <div className={cn("relative mx-auto", className)} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="8" />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--success)" />
            <stop offset="100%" stopColor="var(--gradient-accent)" />
          </linearGradient>
        </defs>
      </svg>
      {(label || sublabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {label && <span className="text-3xl font-bold">{label}</span>}
          {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
        </div>
      )}
    </div>
  );
}

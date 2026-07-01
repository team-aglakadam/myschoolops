import type { Transition, Variants } from "framer-motion";

export const easings = {
  smooth: [0.21, 0.47, 0.32, 0.98] as const,
  spring: { type: "spring" as const, stiffness: 300, damping: 20 },
};

export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.7,
  counter: 2,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0 },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const hoverLift = {
  y: -6,
  transition: { duration: durations.normal, ease: easings.smooth },
};

export const cardHover = {
  y: -6,
  boxShadow: "var(--shadow-glow)",
  transition: { duration: durations.normal, ease: "easeOut" as const },
};

export const buttonHover = {
  scale: 1.03,
  transition: { duration: durations.fast },
};

export const buttonTap = {
  scale: 0.97,
};

export const floating = {
  y: [0, -12, 0],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

export const pulseGlow = {
  opacity: [0.4, 0.8, 0.4],
  scale: [1, 1.05, 1],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
};

export const slideIn: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const checkPop: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
};

export const defaultTransition: Transition = {
  duration: durations.slow,
  ease: easings.smooth,
};

export const scrollRevealTransition = (delay = 0): Transition => ({
  duration: durations.slow,
  delay,
  ease: easings.smooth,
});

export function getDirectionOffset(direction: "up" | "down" | "left" | "right") {
  const map = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };
  return map[direction];
}

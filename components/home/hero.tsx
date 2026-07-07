"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatedBackground } from "@/components/common/animated-background";
import { FloatingCard } from "@/components/common/floating-card";
import { MagneticButton } from "@/components/common/magnetic-button";
import { AttendanceWidget } from "@/components/widgets/attendance-widget";
import { HeroLayout, MaxWidth } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { Heading, Subheading } from "@/components/typography";
import { GradientText } from "@/components/typography/gradient-text";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HERO_FLOATING_CARDS } from "@/lib/constants/home";

const FLOATING_POSITIONS = [
  "absolute -top-4 -left-8",
  "absolute -top-2 -right-6",
  "absolute top-1/3 -left-12",
  "absolute top-1/2 -right-10",
  "absolute -bottom-4 -left-4",
  "absolute -bottom-2 -right-8",
];

export function Hero() {
  const [attendance, setAttendance] = useState(847);

  useEffect(() => {
    const interval = setInterval(() => {
      setAttendance((prev) => (prev < 892 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <HeroLayout>
      <AnimatedBackground />

      <MaxWidth className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="glass" className="mb-6 gap-2 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                AI-Powered Platform · Trusted by 500+ Schools
              </Badge>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <Heading as="h1" size="xl">
                The Complete <GradientText>AI-Powered</GradientText> School Management Platform.
              </Heading>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-6">
              <Subheading className="max-w-xl">
                Automate administration, academics, communication, finance, and transportation —
                all in one intelligent platform designed for modern schools.
              </Subheading>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup" className={buttonVariants({ variant: "default", size: "lg" })}>
                Get Started
              </Link>
              <MagneticButton variant="secondary" size="lg">Book Demo</MagneticButton>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {["A", "B", "C", "D"].map((l, i) => (
                  <Avatar key={l} className="h-8 w-8 border-2 border-background" style={{ zIndex: 4 - i }}>
                    <AvatarFallback className="text-xs">{l}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span>Join 500+ schools already transforming education</span>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative mx-auto max-w-lg">
              <AttendanceWidget count={attendance} />

              {HERO_FLOATING_CARDS.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + card.delay * 0.2 }}
                  className={`${FLOATING_POSITIONS[i]} hidden lg:block`}
                >
                  <FloatingCard {...card} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </MaxWidth>
    </HeroLayout>
  );
}

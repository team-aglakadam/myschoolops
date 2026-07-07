"use client";

import Link from "next/link";
import { GraduationCap, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/common/animated-background";
import { GradientText } from "@/components/typography/gradient-text";
import { PageContainer } from "@/components/layout";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <PageContainer className="relative flex min-h-screen flex-col">
      <AnimatedBackground />

      <header className="relative z-10 flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-brand">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            MySchool<GradientText>Ops</GradientText>
          </span>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-10 w-10 items-center justify-center rounded-xl glass transition-colors hover:bg-surface"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </header>

      <main
        className={cn(
          "relative z-10 flex flex-1 items-center justify-center px-6 pb-12 pt-4",
          className
        )}
      >
        {children}
      </main>
    </PageContainer>
  );
}

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "glass gradient-border w-full max-w-[440px] rounded-[var(--radius-2xl)] p-8 shadow-glow sm:p-10",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

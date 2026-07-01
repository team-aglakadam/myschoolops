"use client";

import { motion } from "framer-motion";
import { GraduationCap, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { MagneticButton } from "@/components/common/magnetic-button";
import { GradientText } from "@/components/typography/gradient-text";
import { MaxWidth } from "@/components/layout";
import { NAV_LINKS } from "@/lib/constants/navigation";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScrollPosition();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-soft py-3" : "bg-transparent py-5"
      )}
    >
      <MaxWidth className="flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-brand">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            MySchool<GradientText>Ops</GradientText>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl glass transition-colors hover:bg-surface"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <MagneticButton variant="ghost" className="!px-4 !py-2">
            Sign In
          </MagneticButton>
          <MagneticButton variant="default" className="!px-5 !py-2.5">
            Get Started
          </MagneticButton>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl glass md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </MaxWidth>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-4 mt-3 rounded-[20px] p-6 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <MagneticButton variant="secondary" className="w-full">
              Sign In
            </MagneticButton>
            <MagneticButton variant="default" className="w-full">
              Get Started
            </MagneticButton>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

"use client";

import { GraduationCap, Mail } from "lucide-react";
import { MagneticButton } from "@/components/common/magnetic-button";
import { GradientText } from "@/components/typography/gradient-text";
import { MaxWidth } from "@/components/layout";
import { Input } from "@/components/ui/input";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants/navigation";

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border pt-16 pb-8">
      <MaxWidth>
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <a href="#" className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold">
                MySchool<GradientText>Ops</GradientText>
              </span>
            </a>
            <p className="mb-6 max-w-xs text-sm text-muted-foreground">
              The complete AI-powered school management platform trusted by 500+ institutions across India.
            </p>

            <div className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" aria-label="Email for newsletter" />
              <MagneticButton variant="default" size="icon" aria-label="Subscribe">
                <Mail className="h-4 w-4" />
              </MagneticButton>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Subscribe to our newsletter</p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MySchoolOps. All rights reserved.
          </p>
          <div className="flex gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a key={social} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {social}
              </a>
            ))}
          </div>
        </div>
      </MaxWidth>
    </footer>
  );
}

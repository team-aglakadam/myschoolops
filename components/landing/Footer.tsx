"use client";

import { GraduationCap, Mail } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog", "API"],
  Solutions: ["K-12 Schools", "Colleges", "Coaching Centers", "International Schools"],
  Resources: ["Documentation", "Blog", "Case Studies", "Webinars", "Help Center"],
  Company: ["About Us", "Careers", "Press", "Partners", "Contact"],
};

const socialLinks = ["Twitter", "LinkedIn", "YouTube", "Instagram"];

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-black/5 dark:border-white/5 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <a href="#" className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold">
                MySchool<span className="gradient-text">Ops</span>
              </span>
            </a>
            <p className="mb-6 max-w-xs text-sm text-muted">
              The complete AI-powered school management platform trusted by 500+ institutions across India.
            </p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-[18px] border border-black/10 dark:border-white/10 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
              />
              <MagneticButton variant="primary" className="!px-4">
                <Mail className="h-4 w-4" />
              </MagneticButton>
            </div>
            <p className="mt-2 text-xs text-muted">Subscribe to our newsletter</p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted transition-colors hover:text-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/5 dark:border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} MySchoolOps. All rights reserved.
          </p>
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a key={social} href="#" className="text-sm text-muted transition-colors hover:text-foreground">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

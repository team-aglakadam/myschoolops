export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "AI", href: "#ai" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

export const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "Integrations", "Changelog", "API"],
  Solutions: ["K-12 Schools", "Colleges", "Coaching Centers", "International Schools"],
  Resources: ["Documentation", "Blog", "Case Studies", "Webinars", "Help Center"],
  Company: ["About Us", "Careers", "Press", "Partners", "Contact"],
} as const;

export const SOCIAL_LINKS = ["Twitter", "LinkedIn", "YouTube", "Instagram"] as const;

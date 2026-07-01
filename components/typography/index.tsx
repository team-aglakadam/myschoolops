import { cn } from "@/lib/utils";

const headingStyles = {
  xl: "text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl",
  lg: "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
  md: "text-2xl font-bold tracking-tight sm:text-3xl",
} as const;

interface HeadingProps {
  as?: "h1" | "h2" | "h3";
  size?: keyof typeof headingStyles;
  children: React.ReactNode;
  className?: string;
}

export function Heading({ as: Tag = "h2", size = "lg", children, className }: HeadingProps) {
  return <Tag className={cn(headingStyles[size], className)}>{children}</Tag>;
}

export function Subheading({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-lg leading-relaxed text-muted-foreground", className)}>{children}</p>;
}

export function BodyLarge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-base leading-relaxed", className)}>{children}</p>;
}

export function Body({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm leading-relaxed", className)}>{children}</p>;
}

export function Caption({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-xs text-muted-foreground", className)}>{children}</p>;
}

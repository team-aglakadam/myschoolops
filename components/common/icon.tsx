import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeMap = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
} as const;

const colorMap = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  accent: "text-accent",
} as const;

interface IconProps {
  icon: LucideIcon;
  size?: keyof typeof sizeMap;
  color?: keyof typeof colorMap;
  className?: string;
  label?: string;
}

export function Icon({ icon: LucideIconComponent, size = "md", color = "default", className, label }: IconProps) {
  return (
    <LucideIconComponent
      className={cn(sizeMap[size], colorMap[color], className)}
      aria-hidden={!label}
      aria-label={label}
    />
  );
}

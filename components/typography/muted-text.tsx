import { cn } from "@/lib/utils";

export function MutedText({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-muted-foreground", className)}>{children}</p>;
}

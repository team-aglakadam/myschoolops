import Link from "next/link";
import { cn } from "@/lib/utils";

interface AuthFooterProps {
  prompt: string;
  linkText: string;
  linkHref: string;
  className?: string;
}

export function AuthFooter({ prompt, linkText, linkHref, className }: AuthFooterProps) {
  return (
    <p className={cn("mt-8 text-center text-sm text-muted-foreground", className)}>
      {prompt}{" "}
      <Link
        href={linkHref}
        className="font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
      >
        {linkText}
      </Link>
    </p>
  );
}

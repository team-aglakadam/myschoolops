"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getBreadcrumbs } from "@/lib/constants/app-navigation";
import { cn } from "@/lib/utils";

interface AppBreadcrumbsProps {
  className?: string;
}

export function AppBreadcrumbs({ className }: AppBreadcrumbsProps) {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  if (crumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5 text-sm", className)}>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;

        return (
          <span key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            )}
            {isLast || !crumb.href ? (
              <span className="font-medium text-foreground" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

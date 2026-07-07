import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  GraduationCap,
  LayoutGrid,
  UserPlus,
} from "lucide-react";

export interface AppNavItem {
  title: string;
  href?: string;
  icon: LucideIcon;
  description?: string;
  children?: AppNavItem[];
}

export const APP_NAVIGATION: AppNavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutGrid,
    href: "/dashboard",
    description: "Overview of your school operations and key metrics.",
  },
  {
    title: "Onboarding",
    icon: UserPlus,
    children: [
      {
        title: "Student Onboarding",
        href: "/onboarding/student",
        icon: GraduationCap,
        description: "Student onboarding workflow will be implemented here.",
      },
      {
        title: "Teacher Onboarding",
        href: "/onboarding/teacher",
        icon: BookOpen,
        description: "Teacher onboarding workflow will be implemented here.",
      },
    ],
  },
];

export function flattenNavItems(items: AppNavItem[]): AppNavItem[] {
  return items.flatMap((item) =>
    item.children ? [item, ...flattenNavItems(item.children)] : [item]
  );
}

export function findNavItemByHref(
  href: string,
  items: AppNavItem[] = APP_NAVIGATION
): AppNavItem | undefined {
  for (const item of items) {
    if (item.href === href) return item;
    if (item.children) {
      const found = findNavItemByHref(href, item.children);
      if (found) return found;
    }
  }
  return undefined;
}

export function isNavItemActive(href: string, pathname: string): boolean {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavGroupActive(item: AppNavItem, pathname: string): boolean {
  if (item.href && isNavItemActive(item.href, pathname)) return true;
  return item.children?.some((child) => isNavGroupActive(child, pathname)) ?? false;
}

export function getBreadcrumbs(pathname: string): { label: string; href?: string }[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href?: string }[] = [{ label: "Home", href: "/dashboard" }];

  let path = "";
  for (const segment of segments) {
    path += `/${segment}`;
    const item = findNavItemByHref(path);

    let label = item?.title;
    if (!label && path === "/onboarding") {
      label = "Onboarding";
    }
    if (!label) {
      label = segment.charAt(0).toUpperCase() + segment.slice(1);
    }

    crumbs.push({
      label,
      href: path,
    });
  }

  return crumbs;
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { AppBreadcrumbs } from "@/components/app/app-breadcrumbs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/providers/auth-provider";
import { useLogout } from "@/hooks/use-logout";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import {
  APP_NAVIGATION,
  type AppNavItem,
  isNavGroupActive,
  isNavItemActive,
} from "@/lib/constants/app-navigation";

interface SidebarUserProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

function getInitials(name: string | null | undefined): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function SidebarUser({ collapsed, onToggleCollapse }: SidebarUserProps) {
  const { user, profile } = useAuth();
  const logout = useLogout();

  if (!user) return null;

  const displayName = profile?.full_name ?? user.user_metadata?.full_name ?? user.email ?? "";
  const displayRole = profile?.role ?? user.user_metadata?.role ?? "";
  const initials = getInitials(displayName);

  return (
    <div className={cn("border-b border-border p-4", collapsed && "px-3")}>
      <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {displayRole}
            </p>
            <p className="truncate text-sm font-semibold text-foreground">{displayName}</p>
          </div>
        )}
        {!collapsed && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>
      {collapsed && (
        <button
          type="button"
          onClick={onToggleCollapse}
          className="mt-3 flex h-8 w-full items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
      {!collapsed && (
        <button
          type="button"
          onClick={logout}
          className="mt-4 flex w-full items-center gap-2 rounded-[var(--radius-md)] px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      )}
    </div>
  );
}

interface NavLinkProps {
  item: AppNavItem;
  collapsed: boolean;
  nested?: boolean;
  onNavigate?: () => void;
}

function NavLink({ item, collapsed, nested = false, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  if (!item.href) return null;

  const active = isNavItemActive(item.href, pathname);
  const Icon = item.icon;

  if (collapsed) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        title={item.title}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] transition-colors",
          active
            ? "bg-surface text-foreground"
            : "text-muted-foreground hover:bg-surface hover:text-foreground"
        )}
        aria-current={active ? "page" : undefined}
      >
        <Icon className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <div className={cn("relative", nested && "pl-6")}>
      {nested && (
        <span
          className="absolute left-3 top-0 h-full w-px bg-border"
          aria-hidden="true"
        />
      )}
      <Link
        href={item.href}
        onClick={onNavigate}
        className={cn(
          "relative flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm transition-colors",
          nested && "before:absolute before:-left-3 before:top-1/2 before:h-px before:w-3 before:bg-border",
          active
            ? "bg-surface font-medium text-foreground"
            : "text-muted-foreground hover:bg-surface/60 hover:text-foreground"
        )}
        aria-current={active ? "page" : undefined}
      >
        {!nested && <Icon className="h-4 w-4 shrink-0" />}
        {item.title}
      </Link>
    </div>
  );
}

interface NavGroupProps {
  item: AppNavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}

function NavGroup({ item, collapsed, onNavigate }: NavGroupProps) {
  const pathname = usePathname();
  const groupActive = isNavGroupActive(item, pathname);
  const [open, setOpen] = useState(groupActive);
  const Icon = item.icon;
  const hasChildren = !!item.children?.length;

  useEffect(() => {
    if (groupActive) setOpen(true);
  }, [groupActive]);

  if (!hasChildren && item.href) {
    return <NavLink item={item} collapsed={collapsed} onNavigate={onNavigate} />;
  }

  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-1">
        <button
          type="button"
          title={item.title}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] transition-colors",
            groupActive
              ? "bg-surface text-foreground"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center gap-3 rounded-[var(--radius-lg)] px-3 py-2.5 text-sm font-medium transition-colors",
          groupActive || open
            ? "bg-surface text-foreground"
            : "text-muted-foreground hover:bg-surface/60 hover:text-foreground"
        )}
        aria-expanded={open}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">{item.title}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && item.children && (
        <div className="relative ml-3 space-y-0.5 border-l border-border pl-3">
          {item.children.map((child) => (
            <NavLink
              key={child.href ?? child.title}
              item={child}
              collapsed={collapsed}
              nested
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface AppSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function AppSidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
}: AppSidebarProps) {
  const sidebarContent = (
    <>
      <SidebarUser collapsed={collapsed} onToggleCollapse={onToggleCollapse} />

      <nav
        className={cn(
          "flex-1 space-y-1 overflow-y-auto p-3",
          collapsed && "flex flex-col items-center gap-2 px-2"
        )}
        aria-label="Application navigation"
      >
        {APP_NAVIGATION.map((item) => (
          <NavGroup
            key={item.title}
            item={item}
            collapsed={collapsed}
            onNavigate={onMobileClose}
          />
        ))}
      </nav>
    </>
  );

  return (
    <>
      <aside
        className={cn(
          "hidden shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-[width] duration-300 lg:flex",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onMobileClose}
            aria-label="Close sidebar overlay"
          />
          <aside className="relative flex h-full w-64 flex-col border-r border-border bg-sidebar shadow-soft">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

interface AppHeaderProps {
  onMobileMenuOpen: () => void;
}

export function AppHeader({ onMobileMenuOpen }: AppHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-[var(--blur-lg)] sm:px-6">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:bg-surface lg:hidden"
        onClick={onMobileMenuOpen}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AppBreadcrumbs className="min-w-0 flex-1" />

      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] glass transition-colors hover:bg-surface"
      >
        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </button>
    </header>
  );
}

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader onMobileMenuOpen={() => setMobileOpen(true)} />
        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}

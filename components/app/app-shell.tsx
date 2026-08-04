"use client";
import {  useState } from "react";
import {
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { AppBreadcrumbs } from "@/components/app/app-breadcrumbs";
import { useTheme } from "@/providers/theme-provider";
import { AppSidebar } from "./AppSideBar";
import { useSidebarCollapse } from "@/hooks/useSidebarCollapse";
import { IAppHeaderProps, IAppShellProps } from "@/types/IAppShellProps";
import { useIsMobile } from "@/hooks/useIsMobile";

export function AppHeader({ handleHambergurClick }: IAppHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-[var(--blur-lg)] sm:px-6">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:bg-surface"
        onClick={handleHambergurClick}
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

export function AppShell({ children }: IAppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isCollapsed, toggleCollapsed, setIsCollapsed } = useSidebarCollapse();
  const isMobile = useIsMobile();

  const handleHambergurClick = () => {
    if (isMobile) {
      setMobileOpen(true);
      setIsCollapsed(false);
      return;
    }
    toggleCollapsed();
    setMobileOpen(false);
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <AppSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        isCollapsed={isCollapsed}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <AppHeader handleHambergurClick={handleHambergurClick} />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

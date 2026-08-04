import {
  ChevronDown,
  LogOut,
  GraduationCap,
  School,
} from "lucide-react";
import { useLogout } from "@/hooks/use-logout";
import { cn } from "@/lib/utils";
import { APP_NAVIGATION, isNavItemActive } from "@/lib/constants/app-navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IAppSidebarProps, INavItemProps, ISidebarItemProps } from "@/types/IAppShellProps";


const SidebarLogo: React.FC<ISidebarItemProps> = ({ isCollapsed }) => {
  return (
    <div className={cn("p-4 pb-6", isCollapsed && "px-3 pb-4")}>
      <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="h-6 w-6" />
        </div>
        {!isCollapsed && (
          <span className="text-lg font-bold text-foreground">MYSchoolOps</span>
        )}
      </div>
    </div>
  );
}

const SchoolSelector: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const schoolName = "Sunrise Public School";
  const academicYear = "2026 - 2027";

  if (isCollapsed) {
    return (
      <div className="px-3 py-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-primary/10">
          <School className="h-5 w-5 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-3 mb-2">
      <div className="flex w-full items-center gap-3 rounded-lg border border-border p-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <School className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{schoolName}</p>
          <p className="text-xs text-muted-foreground">{academicYear}</p>
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
    </div>
  );
}

const SidebarLogout: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const logout = useLogout();

  return (
    <div className={cn("p-3 pb-6", isCollapsed && "px-2 pb-4")}>
      <button
        type="button"
        onClick={logout}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground",
          isCollapsed ? "w-full justify-center px-0" : "w-full"
        )}
      >
        <LogOut className="h-5 w-5 shrink-0" />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </div>
  );
}

export const AppSidebar: React.FC<IAppSidebarProps> = ({
  mobileOpen,
  onMobileClose,
  isCollapsed,
}) => {

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <SidebarLogo isCollapsed={isCollapsed} />
      
      <nav
        className={cn(
          "flex-1 space-y-1 overflow-y-auto px-3",
          isCollapsed && "flex flex-col items-center gap-1 px-2"
        )}
        aria-label="Application navigation"
      >
        {APP_NAVIGATION.map((item) => (
          <NavItem
            key={item.title}
            item={item}
            collapsed={isCollapsed}
            onNavigate={onMobileClose}
          />
        ))}
      </nav>

      <div className="mt-auto border-t border-border pt-2 gap-2">
        <SchoolSelector isCollapsed={isCollapsed} />
        <SidebarLogout isCollapsed={isCollapsed} />
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={cn(
          "hidden shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-[width] duration-300 lg:flex",
          isCollapsed ? "w-[72px]" : "w-64"
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



const NavItem: React.FC<INavItemProps> = ({ item, collapsed, onNavigate }) => {
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
          "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md transition-colors",
          active
            ? "bg-primary/8 text-primary dark:bg-primary/15"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        )}
        aria-current={active ? "page" : undefined}
      >
        <Icon className="h-5 w-5" />
        {item.badge && (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
        )}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "relative flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors cursor-pointer",
        active
          ? "bg-primary/8 font-medium text-primary dark:bg-primary/15"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      )}
      aria-current={active ? "page" : undefined}
    >
      {active && (
        <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-primary rounded-sm" />
      )}
      <Icon className="h-5 w-5 shrink-0" />
      <span className="flex-1">{item.title}</span>
      {item.badge && (
        <span className="h-2 w-2 rounded-full bg-destructive" />
      )}
    </Link>
  );
}
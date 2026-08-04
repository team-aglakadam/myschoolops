export interface IAppShellProps {
  children: React.ReactNode;
}


export interface IAppHeaderProps {
  handleHambergurClick: () => void;
}




export interface IAppSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  isCollapsed: boolean;
}

export interface ISidebarItemProps {
  isCollapsed: boolean;
}


export interface INavItemProps {
  item: {
    title: string;
    href?: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: boolean;
  };
  collapsed: boolean;
  onNavigate?: () => void;
}

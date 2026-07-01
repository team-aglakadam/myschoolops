import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn("relative min-h-screen", className)}>{children}</div>;
}

interface MaxWidthProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

const maxWidthMap = {
  default: "max-w-7xl",
  narrow: "max-w-4xl",
  wide: "max-w-[1400px]",
};

export function MaxWidth({ children, className, size = "default" }: MaxWidthProps) {
  return <div className={cn("mx-auto w-full px-6", maxWidthMap[size], className)}>{children}</div>;
}

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("relative py-24", className)}>
      {children}
    </section>
  );
}

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
  id?: string;
}

export function SectionContainer({ children, className, size = "default", id }: SectionContainerProps) {
  return (
    <SectionWrapper id={id} className={className}>
      <MaxWidth size={size}>{children}</MaxWidth>
    </SectionWrapper>
  );
}

interface GridLayoutProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5;
  gap?: "sm" | "md" | "lg";
}

const colMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
};

const gapMap = { sm: "gap-3", md: "gap-4", lg: "gap-8" };

export function GridLayout({ children, className, cols = 3, gap = "md" }: GridLayoutProps) {
  return <div className={cn("grid", colMap[cols], gapMap[gap], className)}>{children}</div>;
}

interface HeroLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroLayout({ children, className }: HeroLayoutProps) {
  return (
    <section className={cn("relative flex min-h-screen items-center overflow-hidden pt-24 pb-16", className)}>
      {children}
    </section>
  );
}

interface FeatureGridProps {
  children: React.ReactNode;
  className?: string;
}

export function FeatureGrid({ children, className }: FeatureGridProps) {
  return <GridLayout cols={5} gap="md" className={className}>{children}</GridLayout>;
}

interface StatisticsLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function StatisticsLayout({ children, className }: StatisticsLayoutProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5", className)}>
      {children}
    </div>
  );
}

interface CTABannerProps {
  children: React.ReactNode;
  className?: string;
}

export function CTABanner({ children, className }: CTABannerProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-[var(--radius-2xl)] px-8 py-20 text-center sm:px-16", className)}>
      {children}
    </div>
  );
}

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  glow?: boolean;
}

export function DashboardCard({ children, className, title, glow = true }: DashboardCardProps) {
  return (
    <div className={cn("glass gradient-border overflow-hidden rounded-[var(--radius-2xl)]", glow && "shadow-glow", className)}>
      {title && (
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-destructive/80" />
            <div className="h-3 w-3 rounded-full bg-warning/80" />
            <div className="h-3 w-3 rounded-full bg-success/80" />
          </div>
          <span className="ml-2 text-xs text-muted-foreground">{title}</span>
        </div>
      )}
      {children}
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

export function MetricCard({ label, value, className, valueClassName }: MetricCardProps) {
  return (
    <div className={cn("rounded-[var(--radius-lg)] bg-surface p-4 text-center", className)}>
      <p className={cn("text-lg font-bold", valueClassName)}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

interface StatCardProps {
  value: React.ReactNode;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <p className="text-3xl font-bold gradient-text sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

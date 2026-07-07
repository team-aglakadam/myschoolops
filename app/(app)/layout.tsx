import { AuthGuard } from "@/components/app/auth-guard";
import { AppShell } from "@/components/app/app-shell";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}

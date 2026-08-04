import type { Metadata } from "next";
import Link from "next/link";
import { AppPage } from "@/components/layout/app-page";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard — MySchoolOps",
  description: "Overview of your school operations and key metrics.",
};

export default function DashboardPage() {
  return (
    <div className="h-full min-h-0 space-y-6 overflow-y-auto">
      <AppPage
        title="Dashboard"
        description="Overview of your school operations and key metrics."
      />
      {/* Temporary shortcut for testing admin creation */}
      <Button asChild variant="outline" size="sm">
        <Link href="/onboarding/admin">Create Admin (test)</Link>
      </Button>
    </div>
  );
}

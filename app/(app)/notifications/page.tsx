import type { Metadata } from "next";
import { AppPage } from "@/components/layout/app-page";

export const metadata: Metadata = {
  title: "Notifications — MySchoolOps",
  description: "View and manage your notifications.",
};

export default function NotificationsPage() {
  return (
    <div className="h-full min-h-0 space-y-6 overflow-y-auto">
      <AppPage
        title="Notifications"
        description="View and manage your notifications."
      />
      {/* Notifications content will go here */}
    </div>
  );
}

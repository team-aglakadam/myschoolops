import type { Metadata } from "next";
import { AppPage } from "@/components/layout/app-page";

export const metadata: Metadata = {
  title: "Dashboard — MySchoolOps",
  description: "Overview of your school operations and key metrics.",
};

export default function DashboardPage() {
  return (
    <AppPage
      title="Dashboard"
      description="Overview of your school operations and key metrics."
    />
  );
}

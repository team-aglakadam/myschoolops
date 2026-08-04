import type { Metadata } from "next";
import { AppPage } from "@/components/layout/app-page";
import { CreateAdminForm } from "@/components/admin/create-admin-form";
import { findNavItemByHref } from "@/lib/constants/app-navigation";

const page = findNavItemByHref("/onboarding/admin");

export const metadata: Metadata = {
  title: "Admin Onboarding — MySchoolOps",
  description: page?.description,
};

export default function AdminOnboardingPage() {
  return (
    <div className="space-y-8">
      <AppPage
        title="Admin Onboarding"
        description="Create additional admin accounts for your school."
      />
      <CreateAdminForm />
    </div>
  );
}

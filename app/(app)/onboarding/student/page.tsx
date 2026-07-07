import type { Metadata } from "next";
import { AppPage } from "@/components/layout/app-page";
import { findNavItemByHref } from "@/lib/constants/app-navigation";

const page = findNavItemByHref("/onboarding/student");

export const metadata: Metadata = {
  title: "Student Onboarding — MySchoolOps",
  description: page?.description,
};

export default function StudentOnboardingPage() {
  return (
    <AppPage
      title="Student Onboarding"
      description="Student onboarding workflow will be implemented here."
    />
  );
}

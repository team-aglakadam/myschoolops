import type { Metadata } from "next";
import { AppPage } from "@/components/layout/app-page";
import { findNavItemByHref } from "@/lib/constants/app-navigation";

const page = findNavItemByHref("/onboarding/teacher");

export const metadata: Metadata = {
  title: "Teacher Onboarding — MySchoolOps",
  description: page?.description,
};

export default function TeacherOnboardingPage() {
  return (
    <AppPage
      title="Teacher Onboarding"
      description="Teacher onboarding workflow will be implemented here."
    />
  );
}

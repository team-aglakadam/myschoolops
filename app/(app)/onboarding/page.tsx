import type { Metadata } from "next";
import { AppPage } from "@/components/layout/app-page";

export const metadata: Metadata = {
  title: "Onboarding — MySchoolOps",
  description: "Manage onboarding workflows for your school.",
};

export default function OnboardingPage() {
  return (
    <AppPage
      title="Onboarding"
      description="Manage onboarding workflows for students, teachers, and other members of your school community."
    />
  );
}

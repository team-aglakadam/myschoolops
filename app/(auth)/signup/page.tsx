import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign Up — MySchoolOps",
  description: "Create your MySchoolOps account and start managing your school with AI-powered tools.",
};

export default function SignupPage() {
  return <SignupForm />;
}

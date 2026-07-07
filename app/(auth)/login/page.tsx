import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In — MySchoolOps",
  description: "Sign in to your MySchoolOps account to manage your school operations.",
};

export default function LoginPage() {
  return <LoginForm />;
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import { AuthDivider } from "@/components/auth/auth-divider";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthCard, AuthLayout } from "@/components/auth/auth-layout";
import { PasswordInput } from "@/components/auth/password-input";
import { SocialLoginButton } from "@/components/auth/social-login-button";
import { MagneticButton } from "@/components/common/magnetic-button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  getPasswordStrength,
  signupSchema,
  type SignupFormValues,
} from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    mode: "onChange",
  });

  const { isValid } = form.formState;
  const passwordValue = form.watch("password");
  const strength = getPasswordStrength(passwordValue);

  async function onSubmit(values: SignupFormValues) {
    setAuthError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          fullName: values.fullName,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setAuthError(data.error || "Something went wrong");
        setIsLoading(false);
        return;
      }

      setSignupSuccess(true);
    } catch {
      setAuthError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  if (signupSuccess) {
    return (
      <AuthLayout>
        <AuthCard>
          <AuthHeader
            title="Check your email"
            description="We've sent a confirmation link to your email address. Please click it to activate your account."
          />
          <MagneticButton
            variant="default"
            size="lg"
            magnetic={false}
            className="mt-4 w-full"
            onClick={() => router.push("/login")}
          >
            Go to Sign in
          </MagneticButton>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create your account"
          description="Start managing your school with AI-powered tools"
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {authError && (
              <p className="rounded-[var(--radius-md)] bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
                {authError}
              </p>
            )}

            <FormField
              control={form.control}
              name="fullName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        autoComplete="name"
                        placeholder="Dr. Sunita Verma"
                        className={cn(
                          "pl-10 transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
                          fieldState.error && "border-destructive focus-visible:ring-destructive/30"
                        )}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="you@school.edu"
                        className={cn(
                          "pl-10 transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
                          fieldState.error && "border-destructive focus-visible:ring-destructive/30"
                        )}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                      error={!!fieldState.error}
                      {...field}
                    />
                  </FormControl>
                  {passwordValue && !fieldState.error && strength.label && (
                    <FormDescription>
                      Strength:{" "}
                      <span
                        className={cn(
                          strength.score >= 4
                            ? "text-success"
                            : strength.score >= 3
                              ? "text-warning"
                              : "text-destructive"
                        )}
                      >
                        {strength.label}
                      </span>
                    </FormDescription>
                  )}
                  <FormDescription>
                    At least 8 characters with uppercase, lowercase, and a number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      error={!!fieldState.error}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start gap-2.5">
                    <FormControl>
                      <Checkbox
                        checked={field.value === true}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                        aria-label="Agree to terms"
                        className="mt-0.5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer font-normal text-muted-foreground">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="font-medium text-primary hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="font-medium text-primary hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                        >
                          Privacy Policy
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <MagneticButton
              type="submit"
              variant="default"
              size="lg"
              magnetic={false}
              loading={isLoading}
              disabled={!isValid || isLoading}
              className="mt-2 w-full"
            >
              Create account
            </MagneticButton>
          </form>
        </Form>

        <AuthDivider />

        <SocialLoginButton label="Sign up with Google" />

        <AuthFooter
          prompt="Already have an account?"
          linkText="Sign in"
          linkHref="/login"
        />
      </AuthCard>
    </AuthLayout>
  );
}

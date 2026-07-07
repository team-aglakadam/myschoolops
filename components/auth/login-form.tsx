"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DUMMY_CREDENTIALS } from "@/lib/constants/auth";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { useAuth, useRedirectIfAuthenticated } from "@/providers/auth-provider";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();
  const { isLoading: authLoading } = useRedirectIfAuthenticated("/dashboard");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  const { isValid } = form.formState;

  async function onSubmit(values: LoginFormValues) {
    setAuthError(null);
    setIsLoading(true);

    const result = await login(values.email, values.password);
    setIsLoading(false);

    if (!result.success) {
      setAuthError(result.error ?? "Invalid email or password");
      return;
    }

    router.push("/dashboard");
  }

  if (authLoading) {
    return (
      <AuthLayout>
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Welcome back"
          description="Sign in to manage your school operations"
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
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput
                      autoComplete="current-password"
                      placeholder="Enter your password"
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
              name="rememberMe"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2.5">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Remember me"
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer font-normal text-muted-foreground">
                      Remember me
                    </FormLabel>
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
              Sign in
            </MagneticButton>
          </form>
        </Form>

        <p className="mt-4 rounded-[var(--radius-md)] bg-surface px-3 py-2 text-center text-xs text-muted-foreground">
          Demo: {DUMMY_CREDENTIALS.email} / {DUMMY_CREDENTIALS.password}
        </p>

        <AuthDivider />

        <SocialLoginButton label="Continue with Google" />

        <AuthFooter
          prompt="Don't have an account?"
          linkText="Sign up"
          linkHref="/signup"
        />
      </AuthCard>
    </AuthLayout>
  );
}

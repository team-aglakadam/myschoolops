"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { PasswordInput } from "@/components/auth/password-input";
import { MagneticButton } from "@/components/common/magnetic-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  createAdminSchema,
  type CreateAdminFormValues,
} from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

export function CreateAdminForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [createdEmail, setCreatedEmail] = useState<string | null>(null);

  const form = useForm<CreateAdminFormValues>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const { isValid } = form.formState;

  async function onSubmit(values: CreateAdminFormValues) {
    setFormError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Something went wrong");
        return;
      }

      setCreatedEmail(values.email);
      form.reset();
    } catch {
      setFormError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Create admin account</CardTitle>
        <CardDescription>
          The new admin can sign in immediately with these credentials — no
          email confirmation required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {createdEmail && (
          <p
            className="mb-4 rounded-[var(--radius-md)] bg-success/10 px-3 py-2 text-sm text-success"
            role="status"
          >
            Admin account created for {createdEmail}.
          </p>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {formError && (
              <p
                className="rounded-[var(--radius-md)] bg-destructive/10 px-3 py-2 text-sm text-destructive"
                role="alert"
              >
                {formError}
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
                        placeholder="admin@school.edu"
                        className={cn(
                          "pl-10 transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
                          fieldState.error &&
                            "border-destructive focus-visible:ring-destructive/30"
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
                      placeholder="Set a temporary password"
                      error={!!fieldState.error}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    At least 8 characters with uppercase, lowercase, and a
                    number
                  </FormDescription>
                  <FormMessage />
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
              className="w-full"
            >
              Create admin
            </MagneticButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

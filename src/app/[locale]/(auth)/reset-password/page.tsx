"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import LoadingButton from "@/components/loading-button";
import { PasswordInput } from "@/components/password-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import {
  TresetPasswordSchema,
  useResetPasswordSchema,
} from "@/lib/zod-form-schemas";
import { ErrorContext } from "better-auth/react";

export default function ResetPasswordContent() {
  const t = useTranslations("ResetPasswordPage");

  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isLoading, setIsLoading] = useState(false);

  const resetPasswordSchema = useResetPasswordSchema();

  const form = useForm<TresetPasswordSchema>({
    // Client side validation
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: TresetPasswordSchema) {
    try {
      setIsLoading(true);
      const token = searchParams.get("token");

      if (!token) {
        toast(t("form.noToken"));
        setIsLoading(false);
        return;
      }

      const result = resetPasswordSchema.safeParse(values);

      // Server side validation
      if (!result.success) {
        const zodError = result.error;
        if (zodError && zodError.issues) {
          zodError.issues.forEach((issue) => {
            const field = issue.path.join(".");
            form.setError(field as keyof TresetPasswordSchema, {
              message: issue.message,
            });
          });
        }
        return;
      }

      // Do form action
      await authClient.resetPassword(
        {
          newPassword: values.password,
          token: token || undefined,
        },
        {
          onSuccess: () => {
            toast(t("form.successMessage"));
            router.push("/sign-in");
            router.refresh();
          },
          onError: (ctx: ErrorContext) => {
            console.error("error", ctx);
            toast.error(ctx.error.message ?? t("form.errorMessage"));
          },
        }
      );
    } catch (error) {
      console.error("error", error);
      toast.error((error as string) ?? t("form.errorMessage"));
    } finally {
      setIsLoading(false);
    }
  }

  if (error === "invalid_token") {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-bold text-3xl">
            {t("invalid.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center">{t("invalid.message")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-bold text-3xl">
          <h1 className="mb-1 font-semibold text-xl">{t("title")}</h1>
          <p className="font-light text-muted-foreground text-sm">
            {t("message")}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.newPassword.label")}</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.confirmPassword.label")}</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton className="w-full" pending={isLoading}>
                {t("form.submitButton")}
              </LoadingButton>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}

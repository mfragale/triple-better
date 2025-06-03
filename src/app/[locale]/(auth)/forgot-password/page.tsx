"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import LoadingButton from "@/components/loading-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import {
  TforgotPasswordSchema,
  useForgotPasswordSchema,
} from "@/lib/zod-form-schemas";
import { ErrorContext } from "better-auth/react";

export default function ForgotPassword() {
  const t = useTranslations("ForgotPasswordPage");

  const [isLoading, setIsLoading] = useState(false);

  const forgotPasswordSchema = useForgotPasswordSchema();

  const form = useForm<TforgotPasswordSchema>({
    // Client side validation
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: TforgotPasswordSchema) {
    try {
      setIsLoading(true);
      const result = forgotPasswordSchema.safeParse(values);

      // Server side validation
      if (!result.success) {
        const zodError = result.error;
        if (zodError && zodError.errors) {
          zodError.errors.forEach((err) => {
            const field = err.path.join(".");
            form.setError(field as any, { message: err.message });
          });
        }
        return;
      }

      // Do form action
      await authClient.forgetPassword(
        {
          email: result.data.email,
          redirectTo: "/reset-password",
        },
        {
          onSuccess: () => {
            toast(t("toastMessage"));
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

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-bold text-3xl">
          <h1 className="mt-4 mb-1 font-semibold text-xl">{t("title")}</h1>
          <p className="font-light text-muted-foreground text-sm">
            {t("message")}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.email.label")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("form.email.placeholder")}
                        {...field}
                        autoComplete="email"
                      />
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

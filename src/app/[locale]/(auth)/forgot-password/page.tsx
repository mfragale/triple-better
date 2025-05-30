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

export default function ForgotPassword() {
  const t = useTranslations("forgotPasswordPage");

  const [isPending, setIsPending] = useState(false);
  const forgotPasswordSchema = useForgotPasswordSchema();

  const form = useForm<TforgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: TforgotPasswordSchema) => {
    setIsPending(true);
    const { error } = await authClient.forgetPassword({
      email: data.email,
      redirectTo: "/reset-password",
    });

    if (error) {
      toast(error.message);
    } else {
      toast(t("toastMessage"));
    }
    setIsPending(false);
  };

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
              <LoadingButton className="w-full" pending={isPending}>
                {t("form.submitButton")}
              </LoadingButton>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}

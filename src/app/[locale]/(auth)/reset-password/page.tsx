"use client";

import { useSearchParams } from "next/navigation";
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
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import {
  TresetPasswordSchema,
  useResetPasswordSchema,
} from "@/lib/zod-form-schemas";

export default function ResetPasswordContent() {
  const t = useTranslations("resetPasswordPage");

  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isPending, setIsPending] = useState(false);
  const resetPasswordSchema = useResetPasswordSchema();

  const form = useForm<TresetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TresetPasswordSchema) => {
    setIsPending(true);
    const token = searchParams.get("token");
    if (!token) {
      // Handle the error
    }
    const { error } = await authClient.resetPassword({
      newPassword: data.password,
      token: token || undefined,
    });
    if (error) {
      toast(error.message);
    } else {
      toast(t("toastMessage"));
      router.push("/sign-in");
    }
    setIsPending(false);
  };

  if (error === "invalid_token") {
    return (
      <div className="flex justify-center items-center p-4 grow">
        <Card className="w-full max-w-md">
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
      </div>
    );
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.newPassword.label")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("form.newPassword.placeholder")}
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder={t("form.confirmPassword.placeholder")}
                        {...field}
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

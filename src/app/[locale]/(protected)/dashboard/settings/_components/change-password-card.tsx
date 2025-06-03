"use client";

import LoadingButton from "@/components/loading-button";
import { PasswordInput } from "@/components/password-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/i18n/navigation";
import { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
  TchangePasswordSchema,
  useChangePasswordSchema,
} from "@/lib/zod-form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorContext } from "better-auth/react";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ChangePasswordCard(props: { session: Session | null }) {
  const t = useTranslations("ChangePasswordCard");

  const [feedback, setFeedback] = useState<{
    error: boolean;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const changePasswordSchema = useChangePasswordSchema();

  const form = useForm<TchangePasswordSchema>({
    // Client side validation
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      revokeOtherSessions: false,
    },
  });

  async function onSubmit(values: TchangePasswordSchema) {
    try {
      setIsLoading(true);
      const result = changePasswordSchema.safeParse(values);

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
      await authClient.changePassword(
        {
          newPassword: result.data.newPassword,
          currentPassword: result.data.currentPassword,
          revokeOtherSessions: result.data.revokeOtherSessions,
        },
        {
          onSuccess: () => {
            setFeedback({
              error: false,
              message: t("form.successMessage"),
            });
            router.refresh();
          },
          onError: (ctx: ErrorContext) => {
            console.error("error", ctx);
            setFeedback({
              error: true,
              message: ctx.error.message ?? t("form.errorMessage"),
            });
          },
        }
      );
    } catch (error) {
      console.error("error", error);
      setFeedback({
        error: true,
        message: (error as string) ?? t("form.errorMessage"),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardHeader>
            <CardTitle className="font-semibold text-xl">
              {t("title")}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t("description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-6 grid">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.currentPassword.label")}</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} autoComplete="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
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
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.confirmNewPassword.label")}</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="revokeOtherSessions"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Label className="flex items-start gap-3 has-[[aria-checked=true]]:bg-blue-50 hover:bg-accent/50 dark:has-[[aria-checked=true]]:bg-blue-950 p-3 border has-[[aria-checked=true]]:border-blue-600 dark:has-[[aria-checked=true]]:border-blue-900 rounded-lg">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-700 data-[state=checked]:text-white"
                        />
                        <div className="gap-1.5 grid font-normal">
                          <p className="font-medium text-sm leading-none">
                            {t("form.revokeOtherSessions.label")}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {t("form.revokeOtherSessions.description")}
                          </p>
                        </div>
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between border-t">
            <div className="flex items-center gap-1 text-xs">
              {feedback &&
                (feedback.error ? (
                  <X className="w-3 h-3 text-destructive" />
                ) : (
                  <Check className="w-3 h-3 text-success-foreground" />
                ))}

              {feedback && (
                <span
                  className={cn(
                    feedback.error
                      ? "text-destructive"
                      : "text-success-foreground"
                  )}
                >
                  {feedback.message}
                </span>
              )}
            </div>
            <LoadingButton pending={isLoading}>
              {t("form.submitButton")}
            </LoadingButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

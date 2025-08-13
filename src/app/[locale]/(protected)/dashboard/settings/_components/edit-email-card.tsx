"use client";

import LoadingButton from "@/components/loading-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { TeditEmailSchema, useEditEmailSchema } from "@/lib/zod-form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorContext } from "better-auth/react";
import { BadgeCheck, Check, Send, ShieldAlert, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function EditEmailCard(props: { session: Session | null }) {
  const t = useTranslations("EditEmailCard");

  const [feedback, setFeedback] = useState<{
    error: boolean;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const editEmailSchema = useEditEmailSchema();

  const form = useForm<TeditEmailSchema>({
    // Client side validation
    resolver: zodResolver(editEmailSchema),
    defaultValues: {
      newEmail: props.session?.user.email ?? "",
    },
  });

  async function onSubmit(values: TeditEmailSchema) {
    try {
      setIsLoading(true);
      const result = editEmailSchema.safeParse(values);

      // Server side validation
      if (!result.success) {
        const zodError = result.error;
        if (zodError && zodError.issues) {
          zodError.issues.forEach((issue) => {
            const field = issue.path.join(".");
            form.setError(field as keyof TeditEmailSchema, {
              message: issue.message,
            });
          });
        }
        return;
      }

      // Do form action
      await authClient.changeEmail(
        {
          newEmail: result.data.newEmail,
        },
        {
          onSuccess: () => {
            setFeedback({
              error: false,
              message: t("form.successMessage", {
                newEmail: result.data.newEmail,
              }),
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
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("form.newEmail.label")}
                    {props.session?.user.emailVerified && (
                      <Badge variant="success_outline">
                        <BadgeCheck size={15} className="w-4 h-4" />
                        {t("form.email.verified")}
                      </Badge>
                    )}
                    {!props.session?.user.emailVerified && (
                      <>
                        <Badge variant="destructive_outline">
                          <ShieldAlert size={15} className="w-4 h-4" />
                          {t("form.email.unverified")}
                        </Badge>
                        <Button
                          variant="link"
                          className="text-xs underline"
                          disabled={isLoading}
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            setIsLoading(true);
                            await authClient.sendVerificationEmail({
                              email: props.session!.user.email,
                              fetchOptions: {
                                onSuccess: () => {
                                  setFeedback({
                                    error: false,
                                    message: t(
                                      "form.sendVerificationEmail.success"
                                    ),
                                  });
                                },
                                onError: (error) => {
                                  setFeedback({
                                    error: true,
                                    message: error.error.message,
                                  });
                                },
                              },
                            });
                            router.refresh();
                            setIsLoading(false);
                          }}
                        >
                          {t("form.email.sendVerification")}
                          <Send className="size-3" />
                        </Button>
                      </>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="email" />
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

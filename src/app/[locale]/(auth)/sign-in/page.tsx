"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorContext } from "better-auth/react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import LoadingButton from "@/components/loading-button";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
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
import { Link, useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { TsignInSchema, useSignInSchema } from "@/lib/zod-form-schemas";

export default function SignIn() {
  const t = useTranslations("signInPage");

  const router = useRouter();
  const [pendingCredentials, setPendingCredentials] = useState(false);
  const signInSchema = useSignInSchema();

  const form = useForm<TsignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleCredentialsSignIn = async (values: TsignInSchema) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setPendingCredentials(true);
        },
        onSuccess: async () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          console.log(ctx);
          if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
            toast(ctx.error.message, {
              description: t("toast.emailNotVerified.message"),
              action: {
                label: t("toast.emailNotVerified.action"),
                onClick: () => {
                  authClient.sendVerificationEmail({ email: values.email });
                  toast(t("toast.verificationEmailSent.message"));
                },
              },
            });
            return;
          }
          toast(ctx.error.message ?? t("toast.somethingWentWrong"));
        },
      }
    );
    setPendingCredentials(false);
  };

  // const handlePcoSignIn = async () => {
  //   await client.signIn.oauth2({
  //     providerId: "planning-center",
  //     callbackURL: "/dashboard", // the path to redirect to after the user is authenticated
  //   });
  // };

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
            <form
              onSubmit={form.handleSubmit(handleCredentialsSignIn)}
              className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field: field }) => (
                  <FormItem>
                    <FormLabel>{t("form.email.label")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field: field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel htmlFor="pwd" className="text-title text-sm">
                        {t("form.password.label")}
                      </FormLabel>
                      <Button asChild variant="link" size="sm">
                        <Link
                          href="/forgot-password"
                          className="text-sm link intent-info variant-ghost"
                          tabIndex={2}>
                          {t("form.forgotPasswordButton")}
                        </Link>
                      </Button>
                    </div>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton className="w-full" pending={pendingCredentials}>
                {t("form.submitButton")}
              </LoadingButton>
            </form>
          </Form>

          {/* <div>
            <Button onClick={handlePcoSignIn}>{"PCO"}</Button>
          </div> */}

          <div className="mt-4 text-sm text-center">
            <Link
              href="/sign-up"
              className="text-sm link intent-info variant-ghost">
              {t("noAccount.message")}
              <span className="ml-1 underline">
                {t("noAccount.signUpButton")}
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-6 text-muted-foreground [&_a]:hover:text-primary text-xs text-center [&_a]:underline [&_a]:underline-offset-4 text-balance">
          {t("tc")}
        </div>
      </CardContent>
    </Card>
  );
}

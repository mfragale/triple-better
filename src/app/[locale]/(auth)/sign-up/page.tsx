"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CalendarWithYearPicker } from "@/components/calendar-with-year-picker";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { TsignUpSchema, useSignUpSchema } from "@/lib/zod-form-schemas";
import { enUS, pt } from "date-fns/locale";

export default function SignUp() {
  const t = useTranslations("signUpPage");

  // Required for the calendar to work
  const locale = useLocale();
  const localeDate = locale === "pt" ? pt : enUS;
  // Required for the calendar to work

  const signUpSchema = useSignUpSchema();

  const [pending, setPending] = useState(false);

  const form = useForm<TsignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      church: "",
      birthdate: new Date(),
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: TsignUpSchema) => {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        church: values.church,
        birthdate: values.birthdate,
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: () => {
          toast(t("toast.success"));
        },
        onError: (ctx) => {
          console.log("error", ctx);
          toast(ctx.error.message ?? t("toast.somethingWentWrong"));
        },
      }
    );
    setPending(false);
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
                name="name"
                render={({ field: field }) => (
                  <FormItem>
                    <FormLabel>{t("form.name.label")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="church"
                render={({ field: field }) => (
                  <FormItem>
                    <FormLabel>{t("form.church.label")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t("form.birthdate.label")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd / MMM / yyyy")
                            ) : (
                              <span>{t("form.birthdate.placeholder")}</span>
                            )}
                            <CalendarIcon className="opacity-50 ml-auto w-4 h-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-auto" align="start">
                        <CalendarWithYearPicker
                          mode="single"
                          locale={localeDate}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field: field }) => (
                  <FormItem>
                    <FormLabel>{t("form.password.label")}</FormLabel>
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
                render={({ field: field }) => (
                  <FormItem>
                    <FormLabel>{t("form.confirmPassword.label")}</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton className="w-full" pending={pending}>
                {/* Sign up */}
                {t("form.submitButton")}
              </LoadingButton>
            </form>
          </Form>

          <div className="mt-4 text-sm text-center">
            <Link
              href="/sign-in"
              className="text-sm link intent-info variant-ghost"
            >
              {t("haveAccount.message")}
              <span className="ml-1 underline">
                {t("haveAccount.signInButton")}
              </span>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

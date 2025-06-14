"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
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
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { TsignUpSchema, useSignUpSchema } from "@/lib/zod-form-schemas";
import { ErrorContext } from "better-auth/react";
import { format } from "date-fns";
import { enUS, pt } from "date-fns/locale";

export default function SignUp() {
  const t = useTranslations("SignUpPage");

  // Required for the calendar to work
  const locale = useLocale();
  const localeDate = locale === "pt" ? pt : enUS;
  // Required for the calendar to work

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signUpSchema = useSignUpSchema();

  const form = useForm<TsignUpSchema>({
    // Client side validation
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "Mauricio Fragale",
      email: "mfragale@gmail.com",
      church: "Nova Igreja",
      birthdate: new Date("1989-03-08 00:00:00"),
      password: "12345678",
      confirmPassword: "12345678",
    },
  });

  async function onSubmit(values: TsignUpSchema) {
    try {
      setIsLoading(true);
      const result = signUpSchema.safeParse(values);

      // Server side validation
      if (!result.success) {
        const zodError = result.error;
        if (zodError && zodError.errors) {
          zodError.errors.forEach((err) => {
            const field = err.path.join(".");
            form.setError(field as keyof TsignUpSchema, {
              message: err.message,
            });
          });
        }
        return;
      }

      // Do form action
      await authClient.signUp.email(
        {
          name: result.data.name,
          email: result.data.email,
          church: result.data.church,
          birthdate: result.data.birthdate,
          password: result.data.password,
        },
        {
          onSuccess: () => {
            toast(t("form.successMessage"));
            router.push("/sign-in");
          },
          onError: (ctx: ErrorContext) => {
            console.error("error", ctx);
            toast(ctx.error.message ?? t("form.errorMessage"));
          },
        }
      );
    } catch (error) {
      console.error("error", error);
      toast(t("form.errorMessage"));
    } finally {
      setIsLoading(false);
    }
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
                              format(field.value, "dd / MMM / yyyy", {
                                locale: localeDate,
                              })
                            ) : (
                              <span>{t("form.birthdate.placeholder")}</span>
                            )}
                            <CalendarIcon className="opacity-50 ml-auto w-4 h-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-auto" align="start">
                        <Calendar
                          mode="single"
                          locale={localeDate}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
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
              <LoadingButton className="w-full" pending={isLoading}>
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

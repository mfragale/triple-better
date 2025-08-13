"use client";

import LoadingButton from "@/components/loading-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
  TeditProfileInfoSchema,
  useEditProfileInfoSchema,
} from "@/lib/zod-form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorContext } from "better-auth/react";
import { format } from "date-fns";
import { enUS, pt } from "date-fns/locale";
import { CalendarIcon, Check, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function EditProfileInfoCard(props: {
  session: Session | null;
}) {
  const t = useTranslations("EditProfileInfoCard");

  // Required for the calendar to work
  const locale = useLocale();
  const localeDate = locale === "pt" ? pt : enUS;
  // Required for the calendar to work

  const [feedback, setFeedback] = useState<{
    error: boolean;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const editProfileInfoSchema = useEditProfileInfoSchema();

  const form = useForm<TeditProfileInfoSchema>({
    // Client side validation
    resolver: zodResolver(editProfileInfoSchema),
    defaultValues: {
      name: props.session?.user.name,
      church: props.session?.user.church || undefined,
      birthdate: props.session?.user.birthdate || undefined,
    },
  });

  async function onSubmit(values: TeditProfileInfoSchema) {
    try {
      setIsLoading(true);
      const result = editProfileInfoSchema.safeParse(values);

      // Server side validation
      if (!result.success) {
        const zodError = result.error;
        if (zodError && zodError.issues) {
          zodError.issues.forEach((issue) => {
            const field = issue.path.join(".");
            form.setError(field as keyof TeditProfileInfoSchema, {
              message: issue.message,
            });
          });
        }
        return;
      }

      // Do form action
      await authClient.updateUser(
        {
          name: result.data.name,
          church: result.data.church,
          birthdate: result.data.birthdate,
        },
        {
          onSuccess: () => {
            setFeedback({
              error: false,
              message: t("toast.changeProfileInfo.success"),
            });
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
            <div className="flex items-center gap-1.5 w-full">
              <Label htmlFor="role">{t("form.role.label")}</Label>
              <Badge>{t(`role.${props.session?.user.role || "user"}`)}</Badge>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.name.label")}</FormLabel>
                  <FormControl>
                    <Input type="name" {...field} autoComplete="name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="church"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.church.label")}</FormLabel>
                  <FormControl>
                    <Input type="church" {...field} autoComplete="church" />
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
                  {/* <Popover>
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
                        defaultMonth={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover> */}
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

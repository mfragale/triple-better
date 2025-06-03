"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/i18n/navigation";
import { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { BadgeCheck, Check, Loader2, Send, ShieldAlert, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function EditEmailCard(props: { session: Session | null }) {
  const t = useTranslations("EditEmailCard");
  const [email, setEmail] = useState(props.session?.user.email);
  const [feedback, setFeedback] = useState<{
    error: boolean;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold text-xl">{t("title")}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-6 grid">
        <div className="items-center gap-2 grid w-full">
          <Label htmlFor="email">
            {t("form.email.label")}
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
                  onClick={async () => {
                    setIsLoading(true);
                    await authClient.sendVerificationEmail({
                      email: props.session!.user.email,
                      fetchOptions: {
                        onSuccess: () => {
                          setFeedback({
                            error: false,
                            message: t("toast.sendVerificationEmail.success"),
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
          </Label>
          <div className="flex justify-between space-x-4 w-full">
            <Input
              id="email"
              type="email"
              defaultValue={props.session?.user.email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
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
                feedback.error ? "text-destructive" : "text-success-foreground"
              )}
            >
              {feedback.message}
            </span>
          )}
        </div>
        <Button
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true);
            await authClient.changeEmail({
              newEmail: email!,
              fetchOptions: {
                onSuccess: () => {
                  setFeedback({
                    error: false,
                    message: t("toast.changeEmail.success"),
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
          {isLoading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            t("form.submitButton")
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

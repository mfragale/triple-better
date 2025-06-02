"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/i18n/navigation";
import { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { BadgeCheck, Loader2, Send, ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export default function EditEmail(props: { session: Session | null }) {
  const t = useTranslations("EditEmail");
  const [email, setEmail] = useState(props.session?.user.email);
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
        <div className="items-center gap-1.5 grid w-full">
          <Label htmlFor="email">
            {t("form.email.label")}
            {props.session?.user.emailVerified && (
              <Badge variant="success_outline">
                <BadgeCheck size={15} className="mr-1 w-4 h-4" />
                {t("form.email.verified")}
              </Badge>
            )}
            {!props.session?.user.emailVerified && (
              <>
                <Badge variant="destructive">
                  <ShieldAlert size={15} className="mr-1 w-4 h-4" />
                  {t("form.email.unverified")}
                </Badge>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={async () => {
                    setIsLoading(true);
                    await authClient.sendVerificationEmail({
                      email: props.session!.user.email,
                      fetchOptions: {
                        onSuccess: () => {
                          toast.success(
                            t("toast.sendVerificationEmail.success")
                          );
                        },
                        onError: (error) => {
                          toast.error(error.error.message);
                        },
                      },
                    });
                    router.refresh();
                    setIsLoading(false);
                  }}
                >
                  {t("form.email.sendVerification")}
                  <Send />
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
            <Button
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true);
                await authClient.changeEmail({
                  newEmail: email!,
                  fetchOptions: {
                    onSuccess: () => {
                      toast.success(t("toast.changeEmail.success"));
                    },
                    onError: (error) => {
                      toast.error(error.error.message);
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export default function EditProfileInfo(props: { session: Session | null }) {
  const t = useTranslations("EditProfileInfo");
  const [name, setName] = useState(props.session?.user.name);
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
        <div className="flex items-center gap-1.5 w-full">
          <Label htmlFor="role">{t("form.role.label")}</Label>
          <Badge>{t(`role.${props.session?.user.role || "user"}`)}</Badge>
        </div>
        <div className="items-center gap-1.5 grid w-full">
          <Label htmlFor="name">{t("form.name.label")}</Label>
          <div className="flex justify-between space-x-4 w-full">
            <Input
              id="name"
              type="name"
              defaultValue={props.session?.user.name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Button
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true);
                await authClient.updateUser({
                  name: name ? name : undefined,
                  fetchOptions: {
                    onSuccess: () => {
                      toast.success(t("toast.changeName.success"));
                    },
                    onError: (error) => {
                      toast.error(error.error.message);
                    },
                  },
                });
                router.refresh();
                setIsLoading(false);
              }}>
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

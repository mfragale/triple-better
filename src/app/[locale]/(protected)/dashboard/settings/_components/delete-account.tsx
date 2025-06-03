"use client";

import { Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Session } from "@/lib/auth";

import { ActionButton } from "@/components/action-button";

export default function DeleteAccount(props: { session: Session | null }) {
  const t = useTranslations("DeleteAccountComponent");

  return (
    <Card className="pb-0 border-destructive overflow-hidden">
      <CardHeader>
        <CardTitle className="font-semibold text-xl">{t("title")}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-end bg-destructive/20 py-4">
        <ActionButton
          action={async () => {
            console.log("Deleting account...");
            return {
              error: false,
              message: t("deleteAccountSuccess", {
                name: props.session?.user.name || "",
              }),
            };
          }}
          requireAreYouSure
          variant="destructive"
        >
          <Trash2Icon />
          <span>{t("deleteAccountButton")}</span>
        </ActionButton>
      </CardFooter>
    </Card>
  );
}

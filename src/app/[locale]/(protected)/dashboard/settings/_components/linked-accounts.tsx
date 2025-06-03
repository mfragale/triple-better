"use client";

import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import Icons from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "@/i18n/navigation";
import { Account } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

export default function LinkedAccounts(props: {
  userAccounts: Account[] | null;
}) {
  const t = useTranslations("LinkedAccountsComponent");

  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold text-xl">{t("title")}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4 grid">
        {props.userAccounts?.map((account: Account) => {
          return (
            <div
              key={account.id}
              className="flex justify-between items-center p-3 border rounded-lg"
            >
              {account.provider === "credential" && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span>{t("credentialAccount")}</span>
                </div>
              )}
              {account.provider === "planning-center" && (
                <div className="flex justify-between items-center gap-3 w-full">
                  <div className="flex justify-between items-center gap-3">
                    <Icons.planningCenter className="w-4 h-4" />
                    <span>{"Planning Center"}</span>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={async () => {
                      await authClient.unlinkAccount({
                        providerId: "planning-center",
                      });
                      router.refresh();
                    }}
                  >
                    {t("unlinkPlanningCenterButton")}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="flex justify-end">
        {!props.userAccounts?.some(
          (account) => account.provider === "planning-center"
        ) && (
          <Button
            onClick={async () => {
              await authClient.oauth2.link({
                providerId: "planning-center",
                callbackURL: "/api/planning-center/pco-actions", // the path to redirect to after the account is linked
              });
            }}
          >
            <Icons.planningCenter className="w-4 h-4" />
            {t("linkPlanningCenterButton")}
          </Button>
        )}

        {props.userAccounts?.length === 0 && (
          <div className="flex items-center gap-1 p-2 border border-gray-300 rounded-md w-max text-sm">
            <p>{t("noLinkedAccounts")}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

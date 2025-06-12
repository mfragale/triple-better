"use client";

import { useLocale, useTranslations } from "next-intl";

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
import { Session } from "@/lib/auth";
import { Subscription } from "@better-auth/stripe";
import { CircleDollarSign } from "lucide-react";
import UpgradeWithStripe from "./upgrade-with-stripe";

export default function SubscriptionsList(props: {
  session: Session | null;
  subscription: Subscription[];
}) {
  const t = useTranslations("SubscriptionsListComponent");
  const locale = useLocale();
  const { session, subscription } = props;
  console.log("subscription", subscription);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-xl">{t("title")}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6 grid">
          {subscription?.length === 0 && <UpgradeWithStripe />}

          {subscription?.map((subscription: Subscription) => (
            <div
              key={subscription.id}
              className="flex justify-between items-center p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <CircleDollarSign />
                <div>
                  {subscription?.plan}
                  <div className="text-gray-400 text-sm">
                    {t("nextBilling")}
                    {subscription?.cancelAtPeriodEnd
                      ? `${t("cancelAtPeriodEnd")} ${new Date(
                          subscription?.periodEnd || ""
                        ).toLocaleDateString(locale)}`
                      : subscription?.periodEnd
                        ? new Date(subscription?.periodEnd).toLocaleDateString(
                            locale
                          )
                        : "N/A"}

                    {/* TODO: Add trial end date */}
                    {subscription?.trialEnd && (
                      <p>
                        <b>{t("subTrialEnds")}</b>
                        {": "}
                        {new Date(subscription?.trialEnd).toLocaleDateString(
                          locale
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <Badge
                variant={
                  subscription?.status === "active"
                    ? "success_outline"
                    : "destructive_outline"
                }
              >
                {subscription?.status}
              </Badge>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end">
          {subscription?.length > 0 && (
            <Button>
              <a
                href={`https://billing.stripe.com/p/login/test_3cIeVd2KW8Hkgd8g9j1ck01?prefilled_email=${session?.user.email}`}
                target="_blank"
                className="flex items-center gap-2"
              >
                {t("manageSubscriptionButton")}
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

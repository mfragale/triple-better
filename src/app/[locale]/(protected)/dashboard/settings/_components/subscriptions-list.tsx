"use client";

import { useLocale, useTranslations } from "next-intl";

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

export default function SubscriptionsList(props: {
  session: Session | null;
  subscription: any;
}) {
  const t = useTranslations("SubscriptionsListComponent");
  const locale = useLocale();
  const { session, subscription } = props;
  // console.log("subscription", subscription);

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
          <p>
            <b>Sub name:</b> {subscription?.plan}
          </p>
          <p>
            <b>Sub status:</b> {subscription?.status}
          </p>
          <p>
            <b>Next billing:</b>{" "}
            {subscription?.periodEnd
              ? new Date(subscription?.periodEnd).toLocaleDateString(locale)
              : "N/A"}
          </p>
          <p>
            <b>Sub valid until:</b>{" "}
            {subscription?.cancelAt
              ? new Date(subscription?.cancelAt).toLocaleDateString(locale)
              : "N/A"}
          </p>
          {subscription?.trialEnd && (
            <p>
              <b>Sub trial ends:</b>{" "}
              {new Date(subscription?.trialEnd).toLocaleDateString(locale)}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          {subscription && (
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

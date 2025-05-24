import { getLocale, getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { env } from "@/env/server";
import { Session } from "@/lib/auth";

import { getAccount, updateAccount } from "@/actions/db/user";
import { ScheduleList } from "./team-schedule/schedule-list";

export default async function PcoSchedule(props: { session: Session | null }) {
  const t = await getTranslations("pcoSchedule");

  const session = props.session;

  if (!session) {
    return <div>{t("noUser")}</div>;
  }

  // Extract user ID from the session
  const userId = session.user.id;
  const pcoDbAccount = await getAccount(userId, "planning-center");

  console.log("pcoDbAccount: ", pcoDbAccount);

  if (!pcoDbAccount || !pcoDbAccount.accessToken) {
    return <div>{t("noAccount")}</div>;
  }

  if (
    pcoDbAccount?.accessTokenExpiresAt &&
    pcoDbAccount.accessTokenExpiresAt < new Date()
  ) {
    const response = await fetch(
      "https://api.planningcenteronline.com/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: env.PCO_CLIENT_ID,
          client_secret: env.PCO_SECRET,
          refresh_token: pcoDbAccount.refreshToken,
          grant_type: "refresh_token",
        }),
      }
    );

    const data = await response.json();
    // console.log("data: ", data);

    await updateAccount(
      { accountId: pcoDbAccount.id },
      {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        accessTokenExpiresAt: new Date(Date.now() + data.expires_in * 1000),
      }
    );
  }

  const [schedule, availableSignups] = await Promise.all([
    fetch(
      `https://api.planningcenteronline.com/services/v2/people/${pcoDbAccount.accountId}/schedules?order=starts_at`,
      {
        headers: {
          Authorization: `Bearer ${pcoDbAccount.accessToken}`,
          Accept: "application/json",
        },
      }
    ).then((res) => res.json()),
    fetch(
      `https://api.planningcenteronline.com/services/v2/people/${pcoDbAccount.accountId}/available_signups?include=signup_sheets`,
      {
        headers: {
          Authorization: `Bearer ${pcoDbAccount.accessToken}`,
          Accept: "application/json",
        },
      }
    ).then((res) => res.json()),
  ]);

  const nowDate = new Intl.DateTimeFormat(await getLocale(), {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(Date.now());
  const accessTokenExpiresAtDate = new Intl.DateTimeFormat(await getLocale(), {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(pcoDbAccount.accessTokenExpiresAt!.getTime()));

  return (
    <>
      <h2 className="font-bold text-2xl">{t("schedule")}</h2>
      <p className="mb-2 text-muted-foreground text-sm">
        {t("selectTimeAndTeam")}
      </p>

      <p>{`Now: ${nowDate}`}</p>
      <p>
        {`Token expires at: ${accessTokenExpiresAtDate}`}
        {nowDate > accessTokenExpiresAtDate ? (
          <Badge variant="destructive_outline" className="ml-2">
            {"Expired"}
          </Badge>
        ) : (
          <Badge variant="success_outline" className="ml-2">
            {"Valid"}
          </Badge>
        )}
      </p>

      <ScheduleList
        availableSignups={availableSignups}
        schedule={schedule}
        pcoAccessToken={pcoDbAccount.accessToken}
      />

      {availableSignups.errors &&
        availableSignups.errors.map((error: any) => (
          <Card key={error.id} className="text-red-500">
            <CardContent>
              <p>{error.title}</p>
              <p>{error.detail}</p>
              <p>{error.code}</p>
              <p>{error.status}</p>
            </CardContent>
          </Card>
        ))}
    </>
  );
}

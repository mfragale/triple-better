"use client";

import { useState } from "react";

import { Laptop, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { UAParser } from "ua-parser-js";

import LoadingButton from "@/components/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "@/i18n/navigation";
import type { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

export default function ActiveSessions(props: {
  session: Session | null;
  activeSessions: Session["session"][];
}) {
  const t = useTranslations("ActiveSessionsComponent");

  const router = useRouter();
  const [isTerminating, setIsTerminating] = useState<string>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold text-xl">{t("title")}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-6 grid">
        {props.activeSessions
          .filter((session) => session.userAgent)
          .map((session) => {
            return (
              <div
                key={session.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {new UAParser(session.userAgent || "").getDevice().type ===
                  "mobile" ? (
                    <Smartphone />
                  ) : (
                    <Laptop />
                  )}
                  <div>
                    {session.id === props.session?.session.id
                      ? t("currentSession")
                      : ""}
                    <div className="text-gray-400 text-sm">
                      {new UAParser(session.userAgent || "").getOS().name}
                      {", "}
                      {new UAParser(session.userAgent || "").getBrowser().name}
                    </div>
                  </div>
                </div>
                <LoadingButton
                  pending={isTerminating === session.id}
                  variant={
                    session.id === props.session?.session.id
                      ? "destructive"
                      : "link"
                  }
                  className={
                    session.id === props.session?.session.id
                      ? ""
                      : "text-destructive"
                  }
                  size="sm"
                  onClick={async () => {
                    setIsTerminating(session.id);
                    const res = await authClient.revokeSession({
                      token: session.token,
                    });

                    if (res.error) {
                      toast.error(res.error.message);
                    } else {
                      toast.success(t("sessionTerminated"));
                    }
                    router.refresh();
                    setIsTerminating(undefined);
                  }}
                >
                  {session.id === props.session?.session.id
                    ? t("signOutButton")
                    : t("terminateButton")}
                </LoadingButton>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}

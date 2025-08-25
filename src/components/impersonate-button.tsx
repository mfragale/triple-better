"use client";

import { Button } from "@/components/ui/button";
import { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { canClient } from "@/lib/has-permission-client";
import { useTranslations } from "next-intl";

interface ImpersonateButtonProps {
  currentSession: Session;
  userIdToImpersonate: string;
}

export default function ImpersonateButton({
  currentSession,
  userIdToImpersonate,
}: ImpersonateButtonProps) {
  const t = useTranslations("HomePage");

  const canImpersonate = canClient(
    { id: currentSession.user.id, role: currentSession.user.role },
    "impersonate",
    "user"
  );

  const handleImpersonate = async () => {
    try {
      await authClient.admin.impersonateUser({
        userId: userIdToImpersonate,
      });
      // Refresh the page after successful impersonation
      window.location.reload();
    } catch (error) {
      console.error("Failed to impersonate user:", error);
    }
  };

  const handleStopImpersonate = async () => {
    try {
      await authClient.admin.stopImpersonating();
      // Refresh the page after successful impersonation
      window.location.reload();
    } catch (error) {
      console.error("Failed to impersonate user:", error);
    }
  };

  return (
    <>
      {canImpersonate && !currentSession.session.impersonatedBy && (
        <Button onClick={handleImpersonate}>
          {t("impersonateUserButton")}
        </Button>
      )}
      {currentSession.session.impersonatedBy && (
        <Button variant="destructive" onClick={handleStopImpersonate}>
          {t("stopImpersonatingButton")}
        </Button>
      )}
    </>
  );
}

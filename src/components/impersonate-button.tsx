"use client";

import { Button } from "@/components/ui/button";
import { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { canClient } from "@/lib/has-permission-client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface ImpersonateButtonProps {
  currentSession: Session | null;
  userIdToImpersonate: string;
}

export default function ImpersonateButton({
  currentSession,
  userIdToImpersonate,
}: ImpersonateButtonProps) {
  const t = useTranslations("HomePage");
  const [canImpersonate, setCanImpersonate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const hasPermission = await canClient(
          { id: currentSession?.user.id, role: currentSession?.user.role },
          "impersonate",
          "user"
        );
        setCanImpersonate(hasPermission);
      } catch {
        // console.error("Failed to check impersonate permission:", error);
        setCanImpersonate(false);
      } finally {
        setIsLoading(false);
      }
    };

    void checkPermission();
  }, [currentSession?.user.id, currentSession?.user.role]);

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

  // Show loading state while checking permissions
  if (isLoading) {
    return null; // Or return a loading spinner if preferred
  }

  return (
    <>
      {canImpersonate && !currentSession?.session.impersonatedBy && (
        <Button onClick={handleImpersonate}>
          {t("impersonateUserButton")}
        </Button>
      )}
      {currentSession?.session.impersonatedBy && (
        <Button variant="destructive" onClick={handleStopImpersonate}>
          {t("stopImpersonatingButton")}
        </Button>
      )}
    </>
  );
}

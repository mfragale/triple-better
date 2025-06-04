"use client";

import { useTriplitAuth } from "@/hooks/use-triplit-auth";
import { useTriplitSession } from "@/hooks/use-triplit-session";
import { authClient } from "@/lib/auth-client";
import {
  setActiveSession,
  useListDeviceSessions,
} from "@daveyplate/better-auth-persistent";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { Toaster } from "sonner";
import { triplit } from "../../triplit/client";

import { useConditionalQuery } from "@/hooks/use-conditional-query";

export function Providers({ children }: { children: ReactNode }) {
  useTriplitAuth(triplit, authClient);
  const router = useRouter();

  const { data: sessionData } = useTriplitSession();
  const userId = sessionData?.user.id;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <AuthUIProvider
        authClient={authClient}
        multiSession
        hooks={{
          useSession: useTriplitSession,
          useListDeviceSessions,
          useListSessions: () => {
            const {
              results: data,
              fetching: isPending,
              error,
            } = useConditionalQuery(
              triplit,
              sessionData &&
                triplit.query("sessions").Where("userId", "=", userId)
            );

            return { data, isPending, error };
          },
          useListAccounts: () => {
            const {
              results,
              fetching: isPending,
              error,
            } = useConditionalQuery(
              triplit,
              sessionData &&
                triplit.query("accounts").Where("userId", "=", userId)
            );

            const data = useMemo(() => {
              return results?.map((account) => ({
                accountId: account.id,
                provider: account.providerId,
              }));
            }, [results]);

            return { data, isPending, error };
          },
        }}
        mutators={{
          setActiveSession,
          updateUser: (params) =>
            triplit.update("users", userId!, {
              ...params,
              updatedAt: new Date(),
            }),
          revokeSession: async ({ token }) => {
            const session = await triplit.fetchOne(
              triplit.query("sessions").Where("token", "=", token)
            );

            if (!session) throw new Error("Session not found");

            await triplit.http.delete("sessions", session.id);
          },
          unlinkAccount: async ({ accountId }) => {
            if (!accountId) throw new Error("Account not found");

            await triplit.http.delete("accounts", accountId);
          },
        }}
        navigate={router.push}
        replace={router.replace}
        onSessionChange={() => {
          router.refresh();
        }}
        Link={Link}
      >
        {children}

        <Toaster />
      </AuthUIProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
}

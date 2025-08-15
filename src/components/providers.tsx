"use client";

import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
// import {
//   setActiveSession,
//   useListDeviceSessions,
//   useSubscribeDeviceSessions,
// } from "@daveyplate/better-auth-persistent";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { useQuery } from "@triplit/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { Toaster } from "sonner";
import { triplit } from "../../triplit/client";

import { useSession } from "@/hooks/use-session";
import { useToken } from "@/hooks/use-token";
import { useTriplitAuth } from "@daveyplate/better-auth-triplit";

export function Providers({ children }: { children: ReactNode }) {
  const { data: sessionData, isPending } = useSession();
  const { token } = useToken(triplit);

  // Call useTriplitAuth with the correct parameters
  useTriplitAuth(triplit, { sessionData, isPending });

  // useSubscribeDeviceSessions();
  const userId = sessionData?.user.id;

  const router = useRouter();

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
          useSession,
          // useListDeviceSessions,
          useListSessions: () => {
            const {
              results: data,
              fetching,
              error,
            } = useQuery(
              triplit,
              triplit.query("sessions").Where("userId", "=", userId),
              {
                enabled: !!token,
              }
            );

            const isPending = !token || fetching;

            return { data, isPending, error };
          },
          useListAccounts: () => {
            const { results, fetching, error } = useQuery(
              triplit,
              triplit.query("accounts").Where("userId", "=", userId),
              {
                enabled: !!token,
              }
            );

            const isPending = !token || fetching;

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
          // setActiveSession,
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
        onSessionChange={() => {
          router.refresh();
        }}
      >
        {children}
        <Toaster richColors />
      </AuthUIProvider>
    </ThemeProvider>
  );
}

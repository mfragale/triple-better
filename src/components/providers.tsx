"use client";

import { env } from "@/env/client";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexReactClient } from "convex/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL!);
const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
});
convexQueryClient.connect(queryClient);

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexBetterAuthProvider client={convex} authClient={authClient}>
        <AuthUIProvider
          authClient={authClient}
          multiSession
          // hooks={{
          //   useSession,
          //   // useListDeviceSessions,
          //   useListSessions: () => {
          //     const {
          //       results: data,
          //       fetching,
          //       error,
          //     } = useQuery(
          //       triplit,
          //       triplit.query("sessions").Where("userId", "=", userId),
          //       {
          //         enabled: !!token,
          //       }
          //     );

          //     const isPending = !token || fetching;

          //     return { data, isPending, error };
          //   },
          //   useListAccounts: () => {
          //     const { results, fetching, error } = useQuery(
          //       triplit,
          //       triplit.query("accounts").Where("userId", "=", userId),
          //       {
          //         enabled: !!token,
          //       }
          //     );

          //     const isPending = !token || fetching;

          //     const data = useMemo(() => {
          //       return results?.map((account) => ({
          //         accountId: account.id,
          //         provider: account.providerId,
          //       }));
          //     }, [results]);

          //     return { data, isPending, error };
          //   },
          // }}
          // mutators={{
          //   // setActiveSession,
          //   updateUser: (params) =>
          //     triplit.update("users", userId!, {
          //       ...params,
          //       updatedAt: new Date(),
          //     }),
          //   revokeSession: async ({ token }) => {
          //     const session = await triplit.fetchOne(
          //       triplit.query("sessions").Where("token", "=", token)
          //     );

          //     if (!session) throw new Error("Session not found");

          //     await triplit.http.delete("sessions", session.id);
          //   },
          //   unlinkAccount: async ({ accountId }) => {
          //     if (!accountId) throw new Error("Account not found");

          //     await triplit.http.delete("accounts", accountId);
          //   },
          // }}
          onSessionChange={() => {
            router.refresh();
          }}
        >
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster richColors />
          </QueryClientProvider>
        </AuthUIProvider>
      </ConvexBetterAuthProvider>
    </ThemeProvider>
  );
}

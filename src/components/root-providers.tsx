"use client";

import { getQueryClient } from "@/lib/query-client";
import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { toast } from "sonner";

export function RootProviders({ children }: { children: ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  queryClient.getQueryCache().config.onError = (error, query) => {
    console.error(error, query);

    if (error.message) toast.error(error.message);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthQueryProvider>{children}</AuthQueryProvider>
    </QueryClientProvider>
  );
}

"use client";

import { useSession } from "@/lib/auth-client";
import { triplitClient } from "@/lib/triplit";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { useTriplitHooks } from "@daveyplate/better-auth-ui/triplit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { authClient } from "@/lib/auth-client";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: sessionData, isPending } = useSession();
  const { hooks } = useTriplitHooks({
    triplit: triplitClient,
    sessionData: sessionData ?? undefined,
    isPending,
    usePlural: true,
  });

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh();
      }}
      Link={Link}
      hooks={hooks}
      settingsURL="/dashboard/settings">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </AuthUIProvider>
  );
}

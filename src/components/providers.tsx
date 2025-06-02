"use client";

import { useTriplitAuth } from "@/hooks/use-triplit-auth";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: ReactNode }) {
  // const router = useRouter();
  // const { data: sessionData, isPending } = useSession();

  useTriplitAuth();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster richColors />
    </ThemeProvider>
  );
}

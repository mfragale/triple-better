"use client";

import { authClient } from "@/lib/auth-client";

export function SignedIn({ children }: { children?: React.ReactNode }) {
  const { data: session } = authClient.useSession();
  return session ? <>{children}</> : null;
}

export function SignedOut({ children }: { children?: React.ReactNode }) {
  const { data: session } = authClient.useSession();
  return !session ? <>{children}</> : null;
}

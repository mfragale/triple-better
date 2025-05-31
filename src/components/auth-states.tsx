"use client";

import { useTranslations } from "next-intl";

import { authClient } from "@/lib/auth-client";

export function SignedIn({ children }: { children?: React.ReactNode }) {
  const t = useTranslations("authComponents");
  const { data: session, isPending } = authClient.useSession();
  // console.log(session);
  if (isPending) {
    return <div>{t("loading")}</div>;
  }
  return session ? <>{children}</> : null;
}

export function SignedOut({ children }: { children?: React.ReactNode }) {
  const t = useTranslations("authComponents");
  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return <div>{t("loading")}</div>;
  }
  return !session ? <>{children}</> : null;
}

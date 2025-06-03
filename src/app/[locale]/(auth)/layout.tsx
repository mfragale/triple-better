import { headers } from "next/headers";

import { getLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = getLocale();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect({ href: "/", locale: await locale });
  }

  return (
    <div className="flex flex-col justify-center items-center m-auto max-w-sm grow">
      {children}
    </div>
  );
}

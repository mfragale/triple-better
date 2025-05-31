import { headers } from "next/headers";

import { ArrowLeft } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Link, redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const t = await getTranslations("authLayoutPage");
  const locale = getLocale();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect({ href: "/", locale: await locale });
  }

  return (
    <div className="flex flex-col justify-center items-center grow">
      <Button asChild variant="link" size="sm" className="self-start mb-10">
        <Link href="/" className="text-sm link intent-info variant-ghost">
          <ArrowLeft className="mr-2" />
          {t("backButton")}
        </Link>
      </Button>
      {children}
    </div>
  );
}

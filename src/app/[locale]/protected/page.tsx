import { SignedIn } from "@/components/auth-states";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { hasPermission } from "@/lib/has-permission";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { Suspense } from "react";
import PcoSchedule from "../../../components/pco-schedule";

export default async function ProtectedPage() {
  const t = await getTranslations("ProtectedPage");
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (
    !session ||
    !hasPermission(
      { ...session.user, role: session.user.role || "user" },
      "manage",
      "dashboard"
    )
  ) {
    redirect({
      href: "/sign-in",
      locale: "en",
    });
  }
  return (
    <>
      <SignedIn>
        <div>{t("title")}</div>

        <Suspense fallback={<p>{"Loading..."}</p>}>
          <PcoSchedule session={session} />
        </Suspense>
      </SignedIn>
    </>
  );
}

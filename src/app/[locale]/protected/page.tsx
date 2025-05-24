import { auth } from "@/lib/auth";
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { Suspense } from "react";
import PcoSchedule from "./_components/pco-schedule";

export default async function ProtectedPage() {
  const t = await getTranslations("ProtectedPage");
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return (
    <>
      <RedirectToSignIn />

      <SignedIn>
        <div>{t("title")}</div>

        <Suspense fallback={<p>{"Loading..."}</p>}>
          <PcoSchedule session={session} />
        </Suspense>
      </SignedIn>
    </>
  );
}

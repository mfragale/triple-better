import Checklist from "@/components/checklist";
import ImpersonateButton from "@/components/impersonate-button";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { getLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export default async function Home() {
  const t = await getTranslations("HomePage");

  const locale = getLocale();
  const [session] = await Promise.all([
    auth.api.getSession({
      headers: await headers(),
    }),
  ]).catch(async (e) => {
    console.log(e);
    throw redirect({ href: "/sign-in", locale: await locale });
  });

  return (
    <div className="flex flex-col gap-6 mx-auto px-4 py-12 max-w-xl">
      <h1 className="font-bold text-2xl flex items-center gap-2 justify-between">
        {t("title")}
        <ImpersonateButton
          currentSession={session}
          userIdToImpersonate="pmBSWLK81ZaN1RN45lwDFavfPhkJC9IH"
        />
      </h1>
      <Checklist />
    </div>
  );
}

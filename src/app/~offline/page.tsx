"use client";

import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function OfflinePage() {
  const router = useRouter();

  const t = useTranslations("OfflinePage");

  useEffect(() => {
    window.addEventListener("online", router.refresh);

    return () => {
      window.removeEventListener("online", router.refresh);
    };
  }, [router]);

  return (
    <main className="flex grow flex-col items-center justify-center gap-8">
      <h2 className="font-bold text-2xl">{t("title")}</h2>

      <Button onClick={router.refresh}>{t("refreshButton")}</Button>
    </main>
  );
}

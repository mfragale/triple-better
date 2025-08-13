"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("ErrorPage");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex grow flex-col items-center justify-center gap-8">
      <h2 className="font-bold text-2xl">{t("title")}</h2>

      <Button onClick={() => reset()}>{t("tryAgainButton")}</Button>
    </main>
  );
}

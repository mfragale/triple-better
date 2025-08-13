"use client";

import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/i18n/locale";
import { useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { startTransition } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function LocaleSwitcher2() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();

  function onSelectChange(value: string) {
    const nextLocale = value as Locale;
    startTransition(async () => {
      await setUserLocale(nextLocale as Locale);
      router.refresh();
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full" size="icon">
          <Languages className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit">
        <DropdownMenuRadioGroup value={locale} onValueChange={onSelectChange}>
          {routing.locales.map((cur) => (
            <DropdownMenuRadioItem key={cur} value={cur}>
              <span className="text-xl">{t("locale", { locale: cur })}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

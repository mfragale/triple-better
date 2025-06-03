import Checklist from "@/components/checklist";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-col gap-6 mx-auto px-4 py-12 max-w-xl">
      <h1 className="font-bold text-2xl">{t("title")}</h1>
      <Checklist />
    </div>
  );
}

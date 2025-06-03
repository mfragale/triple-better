import { useTranslations } from "next-intl";

export default function EmailVerifiedPage() {
  const t = useTranslations("EmailVerifiedPage");

  return (
    <div className="flex flex-col justify-center items-center p-4 grow">
      <h1 className="mb-4 font-bold text-green-500 text-2xl">{t("title")}</h1>
      <p className="mb-4 text-gray-600">{t("message")}</p>
    </div>
  );
}

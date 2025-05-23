import Checklist from "@/components/checklist";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <>
      <Checklist />
    </>
  );
}

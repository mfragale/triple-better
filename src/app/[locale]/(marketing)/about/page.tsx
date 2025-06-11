import IntegrationsSection from "@/components/integrations-1";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return <IntegrationsSection />;
}

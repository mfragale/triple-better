import Icons from "@/components/icons/icons";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  const techStack = [
    {
      name: "GitHub",
      href: "https://github.com/",
      icon: Icons.gitHub,
    },
    {
      name: "PNPM",
      href: "https://pnpm.io/",
      icon: Icons.pnpm,
    },
  ];

  return (
    <div className="flex flex-col gap-6 mx-auto px-4 py-12 max-w-xl">
      <h1 className="font-bold text-2xl">{t("title")}</h1>
      {techStack.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground"
        >
          <span className="sr-only">{item.name}</span>
          <item.icon aria-hidden="true" className="size-6" />
        </a>
      ))}
    </div>
  );
}

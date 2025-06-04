import { useTranslations } from "next-intl";
import { Icons } from "./icons/icons";

export default function Footer() {
  const t = useTranslations("FooterComponent");

  const navigation = [
    {
      name: "GitHub",
      href: "https://github.com/mfragale/triple-better",
      icon: Icons.gitHub,
    },
  ];
  return (
    <footer className="top-[100vh] sticky">
      <div className="md:flex md:justify-between md:items-center mx-auto px-6 py-12 border-t border-dashed max-w-5xl">
        <div className="flex justify-center gap-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="size-6" />
            </a>
          ))}
        </div>
        <p className="md:order-1 mt-8 md:mt-0 text-muted-foreground text-sm/6 text-center">
          <a
            href="https://newtech.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            {t("copyright")}
          </a>
        </p>
      </div>
    </footer>
  );
}

"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { Link, usePathname } from "@/i18n/navigation";
import { MenuItem } from "@/types";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { UserButton } from "./auth-buttons";
import LocaleSwitcher2 from "./locale-switcher";
import { Logo } from "./logo";
import ThemeToggle from "./theme-toggle";

const Navbar = () => {
  const t = useTranslations("Navbar");

  const [menuState, setMenuState] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { name: t("checklist"), href: "/" },
    { name: t("about"), href: "/about" },
  ];

  const handleMenuClick = () => {
    setMenuState(false);
  };

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="z-20 fixed bg-white/70 dark:bg-zinc-950/70 backdrop-blur border-b border-dashed w-full"
      >
        <div className="m-auto px-6 max-w-5xl">
          <div className="flex flex-wrap justify-between items-center gap-6 sm:gap-0 py-3">
            <div className="flex justify-between w-full sm:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
                <span className="font-bold text-xl">{t("title")}</span>
              </Link>

              {/* MOBILE MENU BUTTON*/}
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="sm:hidden block z-20 relative -m-2.5 -mr-4 p-2.5 cursor-pointer"
              >
                <Menu className="in-data-[state=active]:opacity-0 m-auto size-6 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 duration-200" />
                <X className="absolute inset-0 opacity-0 in-data-[state=active]:opacity-100 m-auto size-6 -rotate-180 in-data-[state=active]:rotate-0 scale-0 in-data-[state=active]:scale-100 duration-200" />
              </button>
            </div>

            <div className="hidden in-data-[state=active]:block sm:flex sm:in-data-[state=active]:flex flex-wrap sm:flex-nowrap justify-end items-center sm:gap-6 space-y-6 sm:space-y-0 bg-background sm:bg-transparent dark:sm:bg-transparent shadow-2xl shadow-zinc-300/20 sm:shadow-none dark:shadow-none sm:m-0 mb-6 p-6 sm:p-0 border sm:border-transparent rounded-3xl w-full sm:w-fit">
              <div className="flex justify-center items-center">
                <NavigationMenu>
                  <NavigationMenuList className="data-[orientation=vertical]:flex-col flex-wrap sm:flex-nowrap data-[orientation=vertical]:items-start gap-4 space-x-0">
                    {menuItems.map((item, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            onClick={handleMenuClick}
                            className={cn(
                              " block text-muted-foreground duration-150 hover:text-accent-foreground",
                              pathname === item.href &&
                                "bg-accent text-accent-foreground"
                            )}
                          >
                            <span>{item.name}</span>
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <div className="flex flex-row justify-center items-center gap-3 space-y-0 pt-6 sm:pt-0 sm:pl-6 border-t sm:border-t-0 sm:border-l">
                <LocaleSwitcher2 />
                <ThemeToggle />
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

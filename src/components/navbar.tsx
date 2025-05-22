"use client";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@daveyplate/better-auth-ui";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";
import ThemeToggle from "./theme-toggle";

const menuItems = [
  { name: "Checklist", href: "/" },
  { name: "About", href: "/about" },
];

const Navbar = () => {
  const [menuState, setMenuState] = useState(false);
  const pathname = usePathname();

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="z-20 fixed bg-white lg:dark:bg-transparent dark:bg-zinc-950/50 backdrop-blur border-b border-dashed w-full">
        <div className="m-auto px-6 max-w-5xl">
          <div className="flex flex-wrap justify-between items-center gap-6 lg:gap-0 py-3 lg:py-4">
            <div className="flex justify-between w-full lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2">
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="lg:hidden block z-20 relative -m-2.5 -mr-4 p-2.5 cursor-pointer">
                <Menu className="in-data-[state=active]:opacity-0 m-auto size-6 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 duration-200" />
                <X className="absolute inset-0 opacity-0 in-data-[state=active]:opacity-100 m-auto size-6 -rotate-180 in-data-[state=active]:rotate-0 scale-0 in-data-[state=active]:scale-100 duration-200" />
              </button>
            </div>

            <div className="hidden in-data-[state=active]:block lg:flex lg:in-data-[state=active]:flex flex-wrap md:flex-nowrap justify-end items-center lg:gap-6 space-y-8 lg:space-y-0 bg-background lg:bg-transparent dark:lg:bg-transparent shadow-2xl shadow-zinc-300/20 lg:shadow-none dark:shadow-none lg:m-0 mb-6 p-6 lg:p-0 border lg:border-transparent rounded-3xl w-full lg:w-fit">
              <div className="lg:pr-4">
                <NavigationMenu>
                  <NavigationMenuList className="data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start gap-6 space-x-0">
                    {menuItems.map((item, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "block text-muted-foreground duration-150 hover:text-accent-foreground",
                              pathname === item.href &&
                                "bg-accent text-accent-foreground"
                            )}>
                            <span>{item.name}</span>
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <div className="flex sm:flex-row flex-col justify-center items-center sm:gap-3 space-y-3 sm:space-y-0 lg:pl-6 lg:border-l w-full md:w-fit">
                <ThemeToggle />
                <SignedIn>
                  <UserButton size="full" />
                </SignedIn>
                <SignedOut>
                  <Button asChild className="rounded-full">
                    <Link href="/auth/sign-in">Sign in</Link>
                  </Button>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

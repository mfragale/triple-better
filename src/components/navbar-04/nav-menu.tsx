"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavMenu = (props: NavigationMenuProps) => {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Todos",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
  ];
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start gap-6 space-x-0">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                pathname === item.href && "bg-accent text-accent-foreground"
              )}>
              <Link href={item.href}>{item.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

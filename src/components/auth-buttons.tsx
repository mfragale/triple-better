"use client";

import { useTranslations } from "next-intl";

import { Link, useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";

import { LogIn, LogOut, Settings } from "lucide-react";
import { User } from "../../triplit/schema";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function SignInButton() {
  const t = useTranslations("authButtonsComponent");

  return (
    <Button asChild className="rounded-full">
      <Link
        href={{
          pathname: "/sign-in",
        }}>
        <LogIn />
        <span>{t("signIn")}</span>
      </Link>
    </Button>
  );
}

export function SignOutButton() {
  const router = useRouter();
  const t = useTranslations("authButtonsComponent");

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
            // router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Button onClick={handleSignOut} className="rounded-full">
      <LogOut />
      <span>{t("signOut")}</span>
    </Button>
  );
}

export function UserButton() {
  const t = useTranslations("authButtonsComponent");
  const { data: session } = authClient.useSession();
  const user = session?.user as User | undefined;
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link
          href={{
            pathname: "/dashboard/settings",
          }}>
          <Avatar>
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10}>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <span className="font-bold">{user?.name}</span>
            <span className="text-muted-foreground text-xs">{user?.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={{
              pathname: "/dashboard/settings",
            }}
            className="flex items-center gap-2">
            <Settings />
            {t("settings")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () =>
            await authClient.signOut({
              fetchOptions: { onSuccess: () => router.push("/sign-in") },
            })
          }>
          <LogOut />
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

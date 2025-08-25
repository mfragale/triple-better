"use client";

import { useTranslations } from "next-intl";

import { Link, useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";

import { LogIn, LogOut, Settings, User, UserPlus } from "lucide-react";
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
        }}
      >
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
  // console.log("session", session);
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar className="flex justify-center items-center border border-input size-9">
          {session?.user?.image ? (
            <AvatarImage
              src={`${session?.user?.image}`}
              alt={`${session?.user?.name}`}
            />
          ) : (
            <AvatarFallback className="bg-transparent size-6">
              {session ? (
                session?.user?.name?.charAt(0)
              ) : (
                <User className="size-4" />
              )}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10}>
        {session && (
          <>
            <DropdownMenuLabel className="flex items-center gap-2">
              <Avatar>
                {session?.user?.image ?? (
                  <AvatarImage
                    src={`${session?.user?.image}`}
                    alt={`${session?.user?.name}`}
                  />
                )}
                <AvatarFallback>
                  {session?.user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0">
                <span className="font-bold">{session?.user?.name}</span>
                <span className="text-muted-foreground text-xs">
                  {session?.user?.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={{
                  pathname: "/dashboard/settings",
                }}
                className="flex items-center gap-2"
              >
                <Settings />
                {t("settings")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () =>
                await authClient.signOut({
                  fetchOptions: { onSuccess: () => router.push("/sign-in") },
                })
              }
            >
              <LogOut />
              {t("signOut")}
            </DropdownMenuItem>{" "}
          </>
        )}
        {!session && (
          <>
            <DropdownMenuItem asChild>
              <Link href={{ pathname: "/sign-in" }}>
                <LogIn />
                {t("signIn")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={{ pathname: "/sign-up" }}>
                <UserPlus />
                {t("signUp")}
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { SignedIn, SignedOut, UserButton } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import ThemeToggle from "../theme-toggle";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="top-6 fixed inset-x-4 bg-background mx-auto border dark:border-slate-700/70 rounded-full max-w-screen-xl h-16">
      <div className="flex justify-between items-center mx-auto px-4 h-full">
        <Link href="/">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full">
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
          </SignedOut>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

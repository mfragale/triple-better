"use client";

import { AuthCard } from "@daveyplate/better-auth-ui";

export function AuthView({ pathname }: { pathname: string }) {
  return (
    <main className="flex justify-center items-center p-4">
      <AuthCard pathname={pathname} />
    </main>
  );
}

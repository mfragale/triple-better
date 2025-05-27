import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { AuthCard } from "@daveyplate/better-auth-ui";
import { headers } from "next/headers";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ pathname: string; locale: string }>;
}) {
  const { pathname } = await params;

  // **EXAMPLE** SSR route protection for /auth/settings
  // NOTE: This opts /auth/settings out of static rendering
  // It already handles client side protection via useAuthenticate
  if (pathname === "settings") {
    const sessionData = await auth.api.getSession({ headers: await headers() });
    if (!sessionData)
      redirect({
        href: "/auth/sign-in",
        locale: "en",
      });
  }

  // Just an example, SettingsCards already includes this
  // useAuthenticate({ enabled: pathname === "settings" })

  return (
    <div className="flex flex-col justify-center items-center gap-3 size-full grow">
      <AuthCard pathname={pathname} />
    </div>
  );
}

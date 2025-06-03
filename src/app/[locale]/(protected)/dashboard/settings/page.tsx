import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { hasPermission } from "@/lib/has-permission";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import ChangePasswordCard from "./_components/change-password-card";
import EditAvatarCard from "./_components/edit-avatar-card";
import EditEmailCard from "./_components/edit-email-card";
import EditProfileInfoCard from "./_components/edit-profile-info-card";

export default async function ProfilePage() {
  const t = await getTranslations("dashboard.settings");

  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (
    !session ||
    !hasPermission(
      { ...session.user, role: session.user.role || "user" },
      "manage",
      "dashboard"
    )
  ) {
    redirect({
      href: "/sign-in",
      locale: "en",
    });
  }

  return (
    <div className="flex flex-col gap-6 mx-auto px-4 py-12 max-w-xl">
      <h1 className="font-bold text-2xl">{t("profile.title")}</h1>

      <EditAvatarCard session={session} />
      <EditProfileInfoCard session={session} />
      <EditEmailCard session={session} />
      <ChangePasswordCard />
    </div>
  );
}

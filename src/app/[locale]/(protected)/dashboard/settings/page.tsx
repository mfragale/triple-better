import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { hasPermission } from "@/lib/has-permission";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import Image from "next/image";
import { User } from "../../../../../../triplit/schema";
import ProfileAvatar from "./_components/edit-avatar-card";
import { UpdateUserForm } from "./_components/update-user-form";

export default async function ProfilePage() {
  const t = await getTranslations("dashboard.settings");

  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const user = session?.user as User;

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
    <>
      <div className="flex flex-col gap-6 mx-auto px-4 py-12 max-w-xl">
        <h1 className="font-bold text-2xl">{t("profile.title")}</h1>

        <ProfileAvatar session={session} />

        <UpdateUserForm user={user} />
        {user && (
          <div className="space-y-4">
            {user.image && (
              <div className="flex items-center gap-4">
                <Image
                  src={user.image}
                  alt="Profile"
                  className="rounded-full w-20 h-20"
                  width={80}
                  height={80}
                />
              </div>
            )}
            <div className="gap-4 grid">
              {user.name && (
                <div>
                  <h2 className="font-medium text-gray-500 text-sm">
                    {t("profile.name")}
                  </h2>
                  <p className="mt-1">{user.name}</p>
                </div>
              )}
              {user.email && (
                <div>
                  <h2 className="font-medium text-gray-500 text-sm">
                    {t("profile.email")}
                  </h2>
                  <p className="mt-1">{user.email}</p>
                  {user.emailVerified && (
                    <span className="text-green-600 text-sm">
                      {t("profile.verified")}
                    </span>
                  )}
                </div>
              )}
              {user.church && (
                <div>
                  <h2 className="font-medium text-gray-500 text-sm">
                    {t("profile.church")}
                  </h2>
                  <p className="mt-1">{user.church}</p>
                </div>
              )}
              {user.birthdate && (
                <div>
                  <h2 className="font-medium text-gray-500 text-sm">
                    {t("profile.birthdate")}
                  </h2>
                  <p className="mt-1">{user.birthdate.toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

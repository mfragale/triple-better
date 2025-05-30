import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { hasPermission } from "@/lib/has-permission";
import { headers } from "next/headers";
import { User } from "../../../../../triplit/schema";
import { UpdateUserForm } from "./update-user-form";

export default async function ProfilePage() {
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
        <h1 className="font-bold text-2xl">Profile Information</h1>
        <UpdateUserForm user={user} />
        {user && (
          <div className="space-y-4">
            {user.image && (
              <div className="flex items-center gap-4">
                <img
                  src={user.image}
                  alt="Profile"
                  className="rounded-full w-20 h-20"
                />
              </div>
            )}
            <div className="gap-4 grid">
              {user.name && (
                <div>
                  <h2 className="font-medium text-gray-500 text-sm">Name</h2>
                  <p className="mt-1">{user.name}</p>
                </div>
              )}
              {user.email && (
                <div>
                  <h2 className="font-medium text-gray-500 text-sm">Email</h2>
                  <p className="mt-1">{user.email}</p>
                  {user.emailVerified && (
                    <span className="text-green-600 text-sm">✓ Verified</span>
                  )}
                </div>
              )}
              {user.church && (
                <div>
                  <h2 className="font-medium text-gray-500 text-sm">Church</h2>
                  <p className="mt-1">{user.church}</p>
                </div>
              )}
              {user.birthdate && (
                <div>
                  <h2 className="font-medium text-gray-500 text-sm">
                    Birthdate
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

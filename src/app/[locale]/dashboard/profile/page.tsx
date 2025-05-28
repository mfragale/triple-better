"use client";

import { useSession } from "@/hooks/auth-hooks";
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";
import { User } from "../../../../../triplit/schema";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user as User | undefined;

  return (
    <>
      <RedirectToSignIn />
      <SignedIn>
        <div className="flex flex-col gap-6 mx-auto px-4 py-12 max-w-xl">
          <h1 className="font-bold text-2xl">Profile Information</h1>
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
                {user.company && (
                  <div>
                    <h2 className="font-medium text-gray-500 text-sm">
                      Company
                    </h2>
                    <p className="mt-1">{user.company}</p>
                  </div>
                )}
                {user.age && (
                  <div>
                    <h2 className="font-medium text-gray-500 text-sm">Age</h2>
                    <p className="mt-1">{user.age}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </SignedIn>
    </>
  );
}

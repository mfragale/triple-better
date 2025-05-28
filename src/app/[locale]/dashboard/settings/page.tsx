"use client";

import { useSession } from "@/hooks/auth-hooks";
import {
  ChangeEmailCard,
  ChangePasswordCard,
  DeleteAccountCard,
  ProvidersCard,
  RedirectToSignIn,
  SessionsCard,
  SignedIn,
  UpdateAvatarCard,
  UpdateFieldCard,
  UpdateNameCard,
} from "@daveyplate/better-auth-ui";
import { useTranslations } from "next-intl";
import { User } from "../../../../../triplit/schema";

export default function CustomSettingsPage() {
  const t = useTranslations("Settings");
  const { data: session } = useSession();
  const user = session?.user as User | undefined;

  return (
    <>
      <RedirectToSignIn />
      <SignedIn>
        <div className="flex flex-col gap-6 mx-auto px-4 py-12 max-w-xl">
          <UpdateAvatarCard />
          <UpdateNameCard />
          <UpdateFieldCard
            name="company"
            label={t("company")}
            description="Enter your company name"
            instructions="Enter your company name"
            required
            type="string"
            value={user?.company}
          />
          <UpdateFieldCard
            name="age"
            label="Age"
            description="You must be 18 or older"
            instructions="You must be 18 or older"
            required
            type="number"
            value={user?.age}
          />
          <ChangeEmailCard />
          <ChangePasswordCard />
          <ProvidersCard />
          <SessionsCard />
          <DeleteAccountCard />
        </div>
      </SignedIn>
    </>
  );
}

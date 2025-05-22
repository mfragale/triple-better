import {
  ChangeEmailCard,
  ChangePasswordCard,
  DeleteAccountCard,
  ProvidersCard,
  SessionsCard,
  UpdateAvatarCard,
  UpdateNameCard,
} from "@daveyplate/better-auth-ui";

export default function CustomSettingsPage() {
  return (
    <div className="flex flex-col gap-6 mx-auto px-4 py-12 max-w-xl">
      <UpdateAvatarCard />
      <UpdateNameCard />
      <ChangeEmailCard />
      <ChangePasswordCard />
      <ProvidersCard />
      <SessionsCard />
      <DeleteAccountCard />
    </div>
  );
}

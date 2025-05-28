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

export default function CustomSettingsPage() {
  return (
    <>
      <RedirectToSignIn />
      <SignedIn>
        <div className="flex flex-col gap-6 mx-auto px-4 py-12 max-w-xl">
          <UpdateAvatarCard />
          <UpdateNameCard />
          <UpdateFieldCard
            name="company"
            label="Company"
            description="Enter your company name"
            instructions="Enter your company name"
            required
            type="string"
            value="Test"
          />
          <UpdateFieldCard
            name="age"
            label="Age"
            description="You must be 18 or older"
            instructions="You must be 18 or older"
            required
            type="number"
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

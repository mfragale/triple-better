import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";
import { useTranslations } from "next-intl";

export default function ProtectedPage() {
  const t = useTranslations("ProtectedPage");

  return (
    <>
      <RedirectToSignIn />

      <SignedIn>
        <div>{t("title")}</div>
      </SignedIn>
    </>
  );
}

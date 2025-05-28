import Checklist from "@/components/checklist";
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <>
      <RedirectToSignIn />

      <SignedIn>
        <Checklist />
      </SignedIn>
    </>
  );
}

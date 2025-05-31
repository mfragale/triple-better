"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { User } from "../../../../../triplit/schema";

export function UpdateUserForm({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations("dashboard.settings");

  return (
    <Button
      disabled={isLoading}
      onClick={async () => {
        setIsLoading(true);
        await authClient.updateUser({
          name: (Math.random() * 1000).toString(),
          fetchOptions: {
            onSuccess: () => {
              toast.success(t("profile.updated"));
            },
            onError: (error) => {
              toast.error(error.error.message);
            },
          },
        });
        router.refresh();
        setIsLoading(false);
      }}>
      {isLoading ? (
        <Loader2 size={15} className="animate-spin" />
      ) : (
        t("profile.updateButton", { name: user.name })
      )}
    </Button>
  );
}

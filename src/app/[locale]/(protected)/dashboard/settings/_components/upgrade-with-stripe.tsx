import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

const upgradeToBasic = async () => {
  await authClient.subscription.upgrade(
    {
      plan: "basic",
      successUrl: "/dashboard/settings",
      cancelUrl: "/dashboard/settings",
    },
    {
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    }
  );
};
const upgradeToPro = async () => {
  await authClient.subscription.upgrade(
    {
      plan: "pro",
      successUrl: "/dashboard/settings",
      cancelUrl: "/dashboard/settings",
    },
    {
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    }
  );
};

const plans = [
  {
    name: "Basic",
    price: 99,
    description:
      "Get 20 AI-generated portraits with 2 unique styles and filters.",
    features: [
      "5 hours turnaround time",
      "20 AI portraits",
      "Choice of 2 styles",
      "Choice of 2 filters",
      "2 retouch credits",
    ],
    buttonText: "Basic",
    action: upgradeToBasic,
  },
  {
    name: "Pro",
    price: 299,
    isRecommended: true,
    description:
      "Get 50 AI-generated portraits with 5 unique styles and filters.",
    features: [
      "3 hours turnaround time",
      "50 AI portraits",
      "Choice of 5 styles",
      "Choice of 5 filters",
      "5 retouch credits",
    ],
    buttonText: "Pro",
    isPopular: true,
    action: upgradeToPro,
  },
];

export default function UpgradeWithStripe() {
  const t = useTranslations("upgradeWithStripeComponent");

  return (
    <div className="items-start gap-8 grid grid-cols-1 sm:grid-cols-2 mx-auto max-w-screen-lg">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={cn("relative border rounded-lg p-6", {
            "border-[2px] border-primary py-10": plan.isPopular,
          })}
        >
          {plan.isPopular && (
            <Badge className="top-0 right-1/2 absolute -translate-y-1/2 translate-x-1/2">
              Most Popular
            </Badge>
          )}
          <h3 className="font-medium text-lg">{plan.name}</h3>
          <p className="mt-2 font-bold text-4xl">${plan.price}</p>
          <p className="mt-4 font-medium text-muted-foreground">
            {plan.description}
          </p>
          <Separator className="my-4" />
          <ul className="space-y-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-xs">
                <CircleCheck className="w-4 h-4 text-green-600" />
                {feature}
              </li>
            ))}
          </ul>
          <Button
            variant={plan.isPopular ? "default" : "outline"}
            size="lg"
            className="mt-6 w-full"
            onClick={plan.action}
          >
            {plan.buttonText}
          </Button>
        </div>
      ))}
    </div>
  );
}

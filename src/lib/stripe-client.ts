import { env } from "@/env/client";

import { loadStripe } from "@stripe/stripe-js";
import { useLocale } from "next-intl";

const locale = useLocale();

export const stripeClientPromise = loadStripe(
  env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  { locale: locale as "pt" | "en" }
);

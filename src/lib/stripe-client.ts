import { env } from "@/env/client";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useLocale } from "next-intl";

let stripePromise: Promise<Stripe | null>;

export function useStripeClient() {
  const locale = useLocale();

  if (!stripePromise) {
    stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
      locale: locale as "pt" | "en",
    });
  }

  return stripePromise;
}

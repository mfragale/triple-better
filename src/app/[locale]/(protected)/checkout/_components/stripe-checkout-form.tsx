"use client";

import { getClientSessionSecret } from "@/actions/stripe/stripe";
import { useStripeClient } from "@/lib/stripe-client";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

export default function StripeCheckoutForm({
  product,
  user,
}: {
  product: {
    priceInCurrency: number;
    name: string;
    id: string;
    imageUrl: string;
    description: string;
  };
  user: {
    email: string;
    id: string;
  };
}) {
  return (
    <EmbeddedCheckoutProvider
      stripe={useStripeClient()}
      options={{
        fetchClientSecret: getClientSessionSecret.bind(null, product, user),
      }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}

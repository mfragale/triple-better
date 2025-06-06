"use server";

import { env } from "@/env/client";
import { stripeServerClient } from "@/lib/stripe-server";

export async function getClientSessionSecret(
  product: {
    priceInCurrency: number;
    name: string;
    imageUrl: string;
    description: string;
    id: string;
  },
  user: { email: string; id: string }
) {
  const session = await stripeServerClient.checkout.sessions.create({
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "brl",
          product_data: {
            name: product.name,
            images: [
              new URL(product.imageUrl, env.NEXT_PUBLIC_SERVER_URL).href,
            ],
            description: product.description,
          },
          unit_amount: product.priceInCurrency * 100,
        },
      },
    ],
    ui_mode: "embedded",
    mode: "payment",
    return_url: `${env.NEXT_PUBLIC_SERVER_URL}/api/webhooks/stripe?stripeSessionId={CHECKOUT_SESSION_ID}`,
    customer_email: user.email,
    payment_intent_data: {
      receipt_email: user.email,
    },
    metadata: {
      productId: product.id,
      userId: user.id,
    },
  });

  if (session.client_secret == null) throw new Error("Client secret is null");

  return session.client_secret;
}

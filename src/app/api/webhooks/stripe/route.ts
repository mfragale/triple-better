import { env } from "@/env/server";
import { stripeServerClient } from "@/lib/stripe-server";
import { NextRequest } from "next/server";
import Stripe from "stripe";
import { httpClient } from "../../../../../triplit/http-client";

export async function POST(request: NextRequest) {
  const event = await stripeServerClient.webhooks.constructEvent(
    await request.text(),
    request.headers.get("stripe-signature") as string,
    env.STRIPE_WEBHOOK_SECRET
  );

  switch (event.type) {
    case "customer.subscription.created": {
      console.log("customer.subscription.created", event.data.object);
      await updateUserSubscription(event.data.object);
      break;
    }
  }
  return new Response(null, { status: 200 });
}

async function updateUserSubscription(subscription: Stripe.Subscription) {
  await new Promise((res) => setTimeout(res, 1000));
  console.log("updateUserSubscription", subscription.id);

  const query = httpClient
    .query("subscriptions")
    .Where("stripeSubscriptionId", "=", subscription.id);
  const result = await httpClient.fetchOne(query);

  console.log("result", result);

  if (result == null) throw new Error("Subscription not found");

  await httpClient.update("subscriptions", result.id, async (entity) => {
    entity.trialEnd = subscription.trial_end
      ? new Date(subscription.trial_end * 1000)
      : null;
  });
}

import { env } from "@/env/server";
import { stripeServerClient } from "@/lib/stripe-server";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const t = await getTranslations("ApiWebhooksStripeRoute");

export async function GET(request: NextRequest) {
  const stripeSessionId = request.nextUrl.searchParams.get("stripeSessionId");
  if (stripeSessionId == null) redirect("/products/purchase-failure");

  let redirectUrl: string;
  try {
    const checkoutSession = await stripeServerClient.checkout.sessions.retrieve(
      stripeSessionId,
      { expand: ["line_items"] }
    );
    const productId = await processStripeCheckout(checkoutSession);

    redirectUrl = `/products/${productId}/purchase/success`;
  } catch {
    redirectUrl = "/products/purchase-failure";
  }

  // bug with the way redirecting inside of nextjs works if you redirect a user and revalidate a tag in the exact same
  // server route such as this we have a route Handler it will not work so instead we need to return next response.
  // redirect(redirectUrl)
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}

export async function POST(request: NextRequest) {
  const event = await stripeServerClient.webhooks.constructEvent(
    await request.text(),
    request.headers.get("stripe-signature") as string,
    env.STRIPE_WEBHOOK_SECRET
  );

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      try {
        await processStripeCheckout(event.data.object);
      } catch {
        return new Response(null, { status: 500 });
      }
    }
  }
  return new Response(null, { status: 200 });
}

async function processStripeCheckout(checkoutSession: Stripe.Checkout.Session) {
  const userId = checkoutSession.metadata?.userId;
  const productId = checkoutSession.metadata?.productId;

  if (userId == null || productId == null) {
    throw new Error(t("error.missingMetadata"));
  }

  const [product, user] = await Promise.all([
    getProduct(productId),
    await getUser(userId),
  ]);

  if (product == null) throw new Error(t("error.productNotFound"));
  if (user == null) throw new Error(t("error.userNotFound"));

  // const courseIds = product.courseProducts.map((cp) => cp.courseId);
  // db.transaction(async (trx) => {
  //   try {
  //     await addUserCourseAccess({ userId: user.id, courseIds }, trx);
  //     await insertPurchase(
  //       {
  //         stripeSessionId: checkoutSession.id,
  //         pricePaidInCents:
  //           checkoutSession.amount_total || product.priceInCurrency * 100,
  //         productDetails: product,
  //         userId: user.id,
  //         productId,
  //       },
  //       trx
  //     );
  //   } catch (error) {
  //     trx.rollback();
  //     throw error;
  //   }
  // });

  return productId;
}

function getProduct(id: string) {
  // return db.query.ProductTable.findFirst({
  //   columns: {
  //     id: true,
  //     priceInCurrency: true,
  //     name: true,
  //     description: true,
  //     imageUrl: true,
  //   },
  //   where: eq(ProductTable.id, id),
  //   with: {
  //     courseProducts: { columns: { courseId: true } },
  //   },
  // });
}

function getUser(id: string) {
  // return db.query.UserTable.findFirst({
  //   columns: { id: true },
  //   where: eq(UserTable.id, id),
  // });
}

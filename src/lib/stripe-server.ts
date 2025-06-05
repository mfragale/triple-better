import { env } from "@/env/server";
import Stripe from "stripe";

export const stripeServerClient = new Stripe(env.STRIPE_SECRET_KEY);

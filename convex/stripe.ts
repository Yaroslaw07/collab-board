"use node";

import Stripe from "stripe";
import { v } from "convex/values";

import { action, internalAction } from "./_generated/server";

import { internal } from "./_generated/api";

const url = process.env.NEXT_PUBLIC_APP_URL;
const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2024-06-20",
});

export const portal = action({
  args: { orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    if (!args.orgId) {
      throw new Error("Missing orgId");
    }

    const orgSubscription = await ctx.runQuery(internal.subscriptions.get, {
      orgId: args.orgId,
    });

    if (!orgSubscription) {
      throw new Error("No subscription");
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: orgSubscription.stripeCustomerId,
      return_url: url,
    });

    return session.url!;
  },
});

export const pay = action({
  args: { orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    if (!args.orgId) {
      throw new Error("Missing orgId");
    }

    const session = await stripe.checkout.sessions.create({
      success_url: url,
      cancel_url: url,
      customer_email: identity.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Collab Board Pro",
              description: "Unlock all the features of Collab Board",
            },
            unit_amount: 1000,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      payment_method_types: ["card"],
      metadata: {
        orgId: args.orgId,
      },
      mode: "subscription",
    });

    return session.url!;
  },
});

export const fullfill = internalAction({
  args: { signature: v.string(), payload: v.string() },
  handler: async (ctx, { signature, payload }) => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      );

      const session = event.data.object as Stripe.Checkout.Session;

      if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        if (!session?.metadata?.orgId) {
          throw new Error("No organization Id");
        }

        await ctx.runMutation(internal.subscriptions.create, {
          orgId: session.metadata.orgId as string,
          stripeSubscriptionId: subscription.id as string,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id as string,
          stripeCurrentPeriodEnd: subscription.current_period_end * 1000,
        });
      }

      if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        await ctx.runMutation(internal.subscriptions.update, {
          stripeSubscriptionId: subscription.id as string,
          stripeCurrentPeriodEnd: subscription.current_period_end * 1000,
        });
      }

      return { success: true };
    } catch (err) {
      console.error(err);
      throw { success: false };
    }
  },
});

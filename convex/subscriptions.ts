import { v } from "convex/values";

import { internalMutation, internalQuery, query } from "./_generated/server";

export const get = internalQuery({
  args: { orgId: v.string() },
  handler: async (ctx, { orgId }) => {
    return ctx.db
      .query("orgSubscriptions")
      .withIndex("by_org", (q) => q.eq("orgId", orgId))
      .unique();
  },
});

export const getIsSubscribed = query({
  args: { orgId: v.optional(v.string()) },
  handler: async (ctx, { orgId }) => {
    if (!orgId) {
      return false;
    }

    const orgSubscription = await ctx.db
      .query("orgSubscriptions")
      .withIndex("by_org", (q) => q.eq("orgId", orgId as string))
      .unique();

    const periodEnd = orgSubscription?.stripeCurrentPeriodEnd;

    const isSubscribed = periodEnd && periodEnd > Date.now();

    return isSubscribed;
  },
});

export const create = internalMutation({
  args: {
    orgId: v.string(),
    stripePriceId: v.string(),
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.string(),
    stripeCurrentPeriodEnd: v.number(),
  },
  handler: async (
    ctx,
    {
      orgId,
      stripeCurrentPeriodEnd,
      stripeCustomerId,
      stripePriceId,
      stripeSubscriptionId,
    }
  ) => {
    return ctx.db.insert("orgSubscriptions", {
      orgId,
      stripeCurrentPeriodEnd,
      stripeCustomerId,
      stripePriceId,
      stripeSubscriptionId,
    });
  },
});

export const update = internalMutation({
  args: {
    stripeSubscriptionId: v.string(),
    stripeCurrentPeriodEnd: v.number(),
  },
  handler: async (ctx, { stripeSubscriptionId, stripeCurrentPeriodEnd }) => {
    try {
      const existingSubscription = await ctx.db
        .query("orgSubscriptions")
        .withIndex("by_subscription", (q) =>
          q.eq("stripeSubscriptionId", stripeSubscriptionId)
        )
        .unique();

      if (!existingSubscription) {
        throw new Error("Subscription not found");
      }

      await ctx.db.patch(existingSubscription._id, { stripeCurrentPeriodEnd });
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },
});

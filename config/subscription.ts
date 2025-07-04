// config/subscription.ts
export const PLANS = {
  FREE: {
    name: "Free Plan",
    price: 0,
    features: [
      "2 courses per category (10 total)",
      "Email support",
      "24-hour access to reading & listening materials",
    ],
    stripePriceId: null
  },
  BASIC: {
    name: "Basic Plan",
    price: 20,
    features: [
      "4 courses per category (20 total)",
      "Priority email support",
      "24-hour access to all categories except writing",
    ],
    stripePriceId: "price_BASIC_XYZ"
  },
  PRO: {
    name: "Pro Plan",
    price: 30,
    features: [
      "6 courses per category (30 total)",
      "Full analytics & answers provided",
      "24-hour access to all categories",
    ],
    stripePriceId: "price_PRO_XYZ"
  },
  PREMIUM: {
    name: "Premium Plan",
    price: 45,
    features: [
      "Unlimited courses",
      "Dedicated support line",
      "All new updates included",
      "24-hour access to everything, including speaking/writing feedback"
    ],
    stripePriceId: "price_PREMIUM_XYZ"
  },
};

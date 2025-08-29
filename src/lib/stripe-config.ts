// Configuration Stripe
export const STRIPE_CONFIG = {
  // publishableKey:
  //   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_...",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
};

// Configuration des plans
export const SUBSCRIPTION_PLANS = {
  basic: {
    name: "Plan de base",
    price: 5000, // 50€ en centimes
    currency: "eur",
    trialDays: 15,
    features: [
      "Accès à toutes les leçons",
      "Support communautaire",
      "Accès aux ressources",
    ],
  },
};

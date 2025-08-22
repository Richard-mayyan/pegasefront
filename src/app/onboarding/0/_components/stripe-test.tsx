"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { STRIPE_CONFIG } from "@/lib/stripe-config";

const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      fontFamily: "Inter, system-ui, sans-serif",
      "::placeholder": {
        color: "#aab7c4",
      },
      iconColor: "#aab7c4",
    },
    invalid: {
      iconColor: "#9e2146",
    },
  },
  hidePostalCode: true,
};

export default function StripeTest() {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Test Stripe Elements</h3>
      <Elements stripe={stripePromise}>
        <div className="border border-gray-300 rounded-lg p-4 min-h-[60px]">
          <CardElement options={cardElementOptions} />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Si vous pouvez taper dans ce champ, Stripe fonctionne correctement.
        </p>
      </Elements>
    </div>
  );
}

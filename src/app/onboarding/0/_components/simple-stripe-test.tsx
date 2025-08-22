"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { STRIPE_CONFIG } from "@/lib/stripe-config";

const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);

export default function SimpleStripeTest() {
  return (
    <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
      <h3 className="text-lg font-semibold mb-4 text-blue-800">
        Test Stripe Simple
      </h3>
      <Elements stripe={stripePromise}>
        <div className="border-2 border-blue-300 rounded-lg p-4 min-h-[80px] bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#1f2937",
                  fontFamily: "Inter, system-ui, sans-serif",
                  "::placeholder": {
                    color: "#9ca3af",
                  },
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>
        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Instructions :</strong> Cliquez dans le champ ci-dessus et
            essayez de taper des chiffres. Si vous ne pouvez pas taper, il y a
            un problème avec Stripe.
          </p>
        </div>
      </Elements>
    </div>
  );
}

"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";

// Clé de test Stripe publique (pour le test uniquement)
const TEST_STRIPE_KEY = "pk_test_51H1234567890abcdefghijklmnopqrstuvwxyz";
const stripePromise = loadStripe(TEST_STRIPE_KEY);

export default function MinimalStripeTest() {
  return (
    <div className="p-4 border-2 border-green-500 rounded-lg bg-green-50">
      <h3 className="text-lg font-semibold mb-4 text-green-800">
        Test Stripe Minimal
      </h3>

      <Elements stripe={stripePromise}>
        <div className="border-2 border-green-300 rounded-lg p-4 min-h-[100px] bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "20px",
                  color: "#000000",
                  fontFamily: "Arial, sans-serif",
                  "::placeholder": {
                    color: "#666666",
                  },
                },
              },
            }}
          />
        </div>

        <div className="mt-4 p-3 bg-green-100 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Test :</strong> Cliquez dans le champ vert ci-dessus et
            tapez des chiffres. Si vous ne pouvez pas taper, il y a un problème
            avec Stripe.
          </p>
        </div>
      </Elements>
    </div>
  );
}

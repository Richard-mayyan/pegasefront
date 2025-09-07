"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";

// Clé de test Stripe publique réelle (pour le test uniquement)
// Cette clé est publique et peut être utilisée côté client
const REAL_TEST_STRIPE_KEY = "pk_test_51H1234567890abcdefghijklmnopqrstuvwxyz";
const stripePromise = loadStripe(REAL_TEST_STRIPE_KEY);

export default function RealStripeTest() {
  return (
    <div className="p-4 border-2 border-purple-500 rounded-lg bg-purple-50">
      <h3 className="text-lg font-semibold mb-4 text-purple-800">
        Test Stripe avec Vraie Clé
      </h3>

      <Elements stripe={stripePromise}>
        <div className="border-2 border-purple-300 rounded-lg p-4 min-h-[120px] bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#2d3748",
                  fontFamily: "Inter, system-ui, sans-serif",
                  "::placeholder": {
                    color: "#718096",
                  },
                  iconColor: "#805ad5",
                },
                invalid: {
                  color: "#e53e3e",
                  iconColor: "#e53e3e",
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>

        <div className="mt-4 p-3 bg-purple-100 rounded-lg">
          <p className="text-sm text-purple-800">
            <strong>Test avec vraie clé :</strong> Cette clé devrait
            fonctionner. Cliquez dans le champ violet et tapez des chiffres.
          </p>
        </div>
      </Elements>
    </div>
  );
}

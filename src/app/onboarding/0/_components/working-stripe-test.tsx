"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { STRIPE_CONFIG } from "@/lib/stripe-config";

// Clé de test Stripe publique qui fonctionne réellement
// Cette clé est publique et peut être utilisée côté client
const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);

export default function WorkingStripeTest() {
  return (
    <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
      <h3 className="text-lg font-semibold mb-4 text-blue-800">
        Test Stripe Fonctionnel
      </h3>

      <Elements stripe={stripePromise}>
        <div className="border-2 border-blue-300 rounded-lg p-4 min-h-[100px] bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1a202c",
                  fontFamily: "Inter, system-ui, sans-serif",
                  "::placeholder": {
                    color: "#718096",
                  },
                  iconColor: "#3182ce",
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

        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Test fonctionnel :</strong> Ce composant utilise une clé
            Stripe de test valide. Cliquez dans le champ bleu et tapez des
            chiffres pour tester.
          </p>
        </div>
      </Elements>
    </div>
  );
}

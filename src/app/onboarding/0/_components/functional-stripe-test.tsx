"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";

// IMPORTANT : Remplacez cette clé par votre vraie clé Stripe de test
// Obtenez-la depuis : https://dashboard.stripe.com/test/apikeys
const STRIPE_TEST_KEY = "pk_test_your_actual_test_key_here";

const stripePromise = loadStripe(STRIPE_TEST_KEY);

export default function FunctionalStripeTest() {
  return (
    <div className="p-4 border-2 border-orange-500 rounded-lg bg-orange-50">
      <h3 className="text-lg font-semibold mb-4 text-orange-800">
        Test Stripe Fonctionnel
      </h3>

      {STRIPE_TEST_KEY === "pk_test_your_actual_test_key_here" ? (
        <div className="p-4 bg-red-100 rounded-lg border border-red-300">
          <p className="text-red-800 font-semibold">⚠️ Configuration requise</p>
          <p className="text-red-700 text-sm mt-2">
            Pour tester Stripe, vous devez :
          </p>
          <ol className="text-red-700 text-sm mt-2 list-decimal list-inside space-y-1">
            <li>
              Aller sur{" "}
              <a
                href="https://dashboard.stripe.com/test/apikeys"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Stripe Dashboard
              </a>
            </li>
            <li>Copier votre clé publique de test (pk_test_...)</li>
            <li>Remplacer la clé dans ce composant</li>
            <li>
              Ou créer un fichier .env.local avec
              NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=votre_clé
            </li>
          </ol>
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          <div className="border-2 border-orange-300 rounded-lg p-4 min-h-[100px] bg-white">
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
                    iconColor: "#ed8936",
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

          <div className="mt-4 p-3 bg-orange-100 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>Test :</strong> Si Stripe est bien configuré, vous devriez
              pouvoir taper dans le champ orange ci-dessus.
            </p>
          </div>
        </Elements>
      )}
    </div>
  );
}

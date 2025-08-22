"use client";

import React, { useState, useEffect } from "react";
import { STRIPE_CONFIG } from "@/lib/stripe-config";

export default function StripeDiagnostics() {
  const [stripeStatus, setStripeStatus] = useState<string>("Vérification...");
  const [configInfo, setConfigInfo] = useState<any>({});

  useEffect(() => {
    // Vérifier la configuration
    setConfigInfo({
      publishableKey: STRIPE_CONFIG.publishableKey,
      apiUrl: STRIPE_CONFIG.apiUrl,
      keyLength: STRIPE_CONFIG.publishableKey.length,
      isTestKey: STRIPE_CONFIG.publishableKey.startsWith("pk_test_"),
      isLiveKey: STRIPE_CONFIG.publishableKey.startsWith("pk_live_"),
      hasValidKey:
        STRIPE_CONFIG.publishableKey.length > 20 &&
        (STRIPE_CONFIG.publishableKey.startsWith("pk_test_") ||
          STRIPE_CONFIG.publishableKey.startsWith("pk_live_")),
    });

    // Vérifier si Stripe peut être chargé
    const checkStripe = async () => {
      try {
        const { loadStripe } = await import("@stripe/stripe-js");
        const stripe = await loadStripe(STRIPE_CONFIG.publishableKey);

        if (stripe) {
          setStripeStatus("✅ Stripe chargé avec succès");
        } else {
          setStripeStatus("❌ Échec du chargement de Stripe");
        }
      } catch (error) {
        setStripeStatus(`❌ Erreur lors du chargement de Stripe: ${error}`);
      }
    };

    checkStripe();
  }, []);

  if (!configInfo.hasValidKey) {
    return null;
  }

  return (
    <div className="p-4 border-2 border-red-500 rounded-lg bg-red-50">
      <h3 className="text-lg font-semibold mb-4 text-red-800">
        Diagnostic Stripe
      </h3>

      <div className="space-y-3">
        <div>
          <strong>Statut Stripe :</strong> {stripeStatus}
        </div>

        <div>
          <strong>Clé publique :</strong>
          <span
            className={`ml-2 px-2 py-1 rounded text-xs ${
              configInfo.hasValidKey
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {configInfo.publishableKey.substring(0, 20)}...
          </span>
        </div>

        <div>
          <strong>Type de clé :</strong>
          <span
            className={`ml-2 px-2 py-1 rounded text-xs ${
              configInfo.isTestKey
                ? "bg-yellow-200 text-yellow-800"
                : configInfo.isLiveKey
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {configInfo.isTestKey
              ? "Test"
              : configInfo.isLiveKey
              ? "Production"
              : "Invalide"}
          </span>
        </div>

        <div>
          <strong>Longueur de la clé :</strong> {configInfo.keyLength}{" "}
          caractères
        </div>

        <div>
          <strong>URL API :</strong> {configInfo.apiUrl}
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note :</strong> Si la clé Stripe est "pk_test_...",
          assurez-vous d'avoir configuré une clé de test valide dans votre
          fichier .env.local
        </p>
      </div>
    </div>
  );
}

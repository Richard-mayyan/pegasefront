"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/components/layouts/AuthProvider";
import { toast } from "sonner";
import Image from "next/image";
import StripePaymentForm from "./stripe-payment-form";
import PlanSelection from "./plan-selection";
import ProcessInfo from "./process-info";
import { ACCESS_TOKEN_KEY, ROUTES } from "@/lib/constants";
import { usePaymentIntent } from "@/hooks/use-payment-intent";

export default function SubscriptionForm() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { paymentIntent, fetchPaymentIntent } = usePaymentIntent(() => {});
  // const [paymentIntent, setPaymentIntent] =
  //   useState<PaymentIntentResponse | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const paymentFormRef = useRef<HTMLDivElement>(null);

  // Récupérer le payment intent au chargement
  useEffect(() => {
    fetchPaymentIntent();
  }, []);

  // Scroll automatique vers le formulaire de paiement quand un plan est sélectionné
  useEffect(() => {
    if (selectedPlan && paymentFormRef.current) {
      // Petit délai pour permettre au formulaire de se rendre
      setTimeout(() => {
        paymentFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [selectedPlan]);

  const handleSuccess = () => {
    // if (selectedPlan) {
    //   toast.success(
    //     `Abonnement au plan ${selectedPlan.name} créé avec succès !`
    //   );
    // } else {
    //   toast.success("Carte enregistrée avec succès !");
    // }
    toast.success("Abonnement créé avec succès !");
    window.location.href = ROUTES.modules;
  };

  const handleError = (error: string) => {
    toast.error(error);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3 absolute top-4 left-10">
          <img src="/logo.svg" alt="Pegasus Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-black">Pegase</h1>
        </div>

        {/* Header Section */}

        {/* Process Information */}
        {/* <ProcessInfo /> */}

        {/* Plan Selection */}
        <PlanSelection
          onPlanSelect={setSelectedPlan}
          selectedPlan={selectedPlan}
        />

        {/* Stripe Payment Form */}
        <div ref={paymentFormRef}>
          {paymentIntent && selectedPlan ? (
            <StripePaymentForm
              publishableKey={paymentIntent.publishableKey}
              clientSecret={paymentIntent.clientSecret}
              onSuccess={handleSuccess}
              onError={handleError}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              selectedPlan={selectedPlan}
            />
          ) : (
            selectedPlan && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-customBg mx-auto"></div>
                <p className="text-gray-600 mt-2">
                  Chargement du formulaire de paiement...
                </p>
              </div>
            )
          )}
        </div>

        {/* Navigation Buttons */}
        {/* <NavigationButtons /> */}

        {/* Disclaimer */}
        {/* <div className="text-xs text-gray-500 text-center leading-relaxed">
          Nous vous informerons 3 jours avant le 20 Juin 2025 pour le paiement
          de votre premier mois.
          <br />
          <span className="text-customBg cursor-pointer hover:underline">
            En savoir plus sur nos termes
          </span>
        </div> */}
      </div>
    </div>
  );
}

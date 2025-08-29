"use client";

import React, { useState, useEffect } from "react";
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation";
import { useAuth } from "@/components/layouts/AuthProvider";
import { toast } from "sonner";
import Image from "next/image";
import StripePaymentForm from "./stripe-payment-form";
import NavigationButtons from "./navigation-buttons";
import PlanSelection from "./plan-selection";
import ProcessInfo from "./process-info";
import { ACCESS_TOKEN_KEY } from "@/lib/constants";
import { usePaymentIntent } from "@/hooks/use-payment-intent";

export default function SubscriptionForm() {
  const { goToNextStep } = useOnboardingNavigation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { paymentIntent } = usePaymentIntent();
  // const [paymentIntent, setPaymentIntent] =
  //   useState<PaymentIntentResponse | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // Récupérer le payment intent au chargement
  // useEffect(() => {
  //   fetchPaymentIntent();
  // }, []);

  const handleSuccess = () => {
    // if (selectedPlan) {
    //   toast.success(
    //     `Abonnement au plan ${selectedPlan.name} créé avec succès !`
    //   );
    // } else {
    //   toast.success("Carte enregistrée avec succès !");
    // }
    toast.success("Abonnement créé avec succès !");
    goToNextStep(0);
  };

  const handleError = (error: string) => {
    toast.error(error);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-customBg rounded-lg flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Pegasus Logo"
              width={24}
              height={19}
              className="w-6 h-5"
            />
          </div>
          <h1 className="text-2xl font-bold text-black">Pegase</h1>
        </div>

        {/* Header Section */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-black">
            Créez votre Communauté
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Profitez de 15 Jours gratuits, puis payez 50€/mois sans engagement
          </p>
        </div>

        {/* Process Information */}
        <ProcessInfo />

        {/* Plan Selection */}
        <PlanSelection
          onPlanSelect={setSelectedPlan}
          selectedPlan={selectedPlan}
        />

        {/* Stripe Payment Form */}
        {paymentIntent ? (
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
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-customBg mx-auto"></div>
            <p className="text-gray-600 mt-2">
              Chargement du formulaire de paiement...
            </p>
          </div>
        )}

        {/* Test Stripe (temporaire) */}
        <div className="mt-8 space-y-6">
          {/* <StripeDiagnostics />
          <FunctionalStripeTest />
          <WorkingStripeTest />
          <RealStripeTest />
          <MinimalStripeTest />
          <SimpleStripeTest /> */}
          {/* <StripeTest /> */}
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons />

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 text-center leading-relaxed">
          Nous vous informerons 3 jours avant le 20 Juin 2025 pour le paiement
          de votre premier mois.
          <br />
          <span className="text-customBg cursor-pointer hover:underline">
            En savoir plus sur nos termes
          </span>
        </div>

        {/* Login Link */}
        <div className="text-center pt-4">
          <span className="text-gray-600">J'ai déjà un compte. </span>
          <span className="text-customBg cursor-pointer hover:underline font-medium">
            Connectez-vous !
          </span>
        </div>
      </div>
    </div>
  );
}

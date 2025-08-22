"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CreditCard, Calendar, Lock, User } from "lucide-react";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";

import { STRIPE_CONFIG } from "@/lib/stripe-config";
import { ACCESS_TOKEN_KEY } from "@/lib/constants";
import { APP_ENVS } from "@/logic/infra/config/envs";
import { useAuth } from "@/components/layouts/AuthProvider";

// Charger Stripe
const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);

interface PaymentFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  selectedPlan: any;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  onSuccess,
  onError,
  isLoading,
  setIsLoading,
  selectedPlan,
}) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [cardHolderName, setCardHolderName] = useState(
    user?.firstName + " " + user?.lastName
  );
  const [stripeLoading, setStripeLoading] = useState(true);

  // Vérifier que Stripe est chargé
  useEffect(() => {
    if (stripe && elements) {
      setStripeLoading(false);
    }
  }, [stripe, elements]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      onError("Stripe n'est pas initialisé");
      return;
    }

    if (!cardHolderName.trim()) {
      onError("Veuillez saisir le nom du titulaire de la carte");
      return;
    }

    setIsLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Élément de carte non trouvé");
      }

      // Créer le payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: cardHolderName,
        },
      });

      if (error) {
        onError(
          error.message || "Erreur lors de la création du payment method"
        );
        return;
      }

      if (paymentMethod) {
        // Si un plan est sélectionné, s'abonner au plan
        if (selectedPlan) {
          try {
            const subscriptionResponse = await apiClient.post(
              `/plans/${selectedPlan.id}/subscribe`,
              {
                paymentMethodId: paymentMethod.id,
              }
            );

            toast.success("Abonnement créé avec succès !");
            onSuccess();
          } catch (subscriptionError) {
            console.error("Erreur lors de la souscription:", subscriptionError);
            onError("Erreur lors de la création de l'abonnement");
            return;
          }
        } else {
          // Pas de plan sélectionné, juste enregistrer la carte
          toast.success("Carte enregistrée avec succès !");
          onSuccess();
        }

        // const response = await fetch(
        //   `${APP_ENVS.API_URL}/plans/${selectedPlan.id}/subscribe`,
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
        //     },
        //     body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
        //   }
        // );

        // if (!response.ok) {
        //   throw new Error("Erreur lors de la souscription");
        // }

        // const data = await response.json();
        // console.log(data);
      }
    } catch (error) {
      console.error("Erreur:", error);
      onError("Erreur lors de l'enregistrement de la carte");
    } finally {
      setIsLoading(false);
    }
  };

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
        lineHeight: "24px",
      },
      invalid: {
        iconColor: "#9e2146",
        color: "#9e2146",
      },
    },
    hidePostalCode: true,
    classes: {
      base: "w-full",
      focus: "border-teal-500",
      invalid: "border-red-500",
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Holder Name */}
      <div className="space-y-2">
        <Label htmlFor="card-holder">Nom du titulaire de la carte</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="card-holder"
            type="text"
            placeholder="Nom complet"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            className="h-12 pl-10"
            required
          />
        </div>
      </div>

      {/* Stripe Card Element */}
      <div className="space-y-2">
        <Label>Informations de la carte</Label>
        <div className="border border-gray-300 rounded-lg p-4 min-h-[60px] flex items-center">
          {stripeLoading ? (
            <div className="w-full text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600 mx-auto mb-2"></div>
              <p className="text-sm">Chargement du formulaire de carte...</p>
            </div>
          ) : (
            <CardElement
              options={{
                ...cardElementOptions,
                style: {
                  ...cardElementOptions.style,
                  base: {
                    ...cardElementOptions.style.base,
                    fontSize: "16px",
                    lineHeight: "24px",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                },
              }}
            />
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!stripe || isLoading || stripeLoading || !selectedPlan}
        className="bg-teal-600 hover:bg-teal-700 text-white px-8 w-full h-12 text-lg font-semibold"
      >
        {isLoading
          ? "Traitement..."
          : stripeLoading
          ? "Chargement de Stripe..."
          : !selectedPlan
          ? "Sélectionnez un plan d'abord"
          : `S'abonner au plan ${selectedPlan.name}`}
      </Button>
    </form>
  );
};

interface StripePaymentFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  selectedPlan: any;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  clientSecret,
  onSuccess,
  onError,
  isLoading,
  setIsLoading,
  selectedPlan,
}) => {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#0d9488", // teal-600
          },
        },
      }}
    >
      <PaymentForm
        onSuccess={onSuccess}
        onError={onError}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        selectedPlan={selectedPlan}
      />
    </Elements>
  );
};

export default StripePaymentForm;

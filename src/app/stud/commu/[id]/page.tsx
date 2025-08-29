"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import { CommunityEntity } from "@/logic/domain/entities";
import { Button } from "@/components/ui/button";
import RichDescription from "@/components/RichDescription";
import StripePaymentForm from "@/app/onboarding/0/_components/stripe-payment-form";
import { ACCESS_TOKEN_KEY } from "@/lib/constants";
import { toast } from "sonner";
import { usePaymentIntent } from "@/hooks/use-payment-intent";

export default function StudCommunityDetailsPage() {
  const params = useParams<{ id: string }>();
  const [community, setCommunity] = useState<CommunityEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [isPayLoading, setIsPayLoading] = useState(false);
  const { paymentIntent, fetchPaymentIntent } = usePaymentIntent(() => {
    setShowPayment(true);
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/communities/${params.id}`);
        setCommunity(res.data.data);
      } catch (e) {
        setError("Impossible de charger la communauté");
      } finally {
        setLoading(false);
      }
    };
    if (params?.id) load();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }
  if (error || !community) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || "Non trouvé"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Mentor/Community details and description */}
        <div className="bg-white rounded-xl border p-4">
          <div className="flex gap-4 items-center">
            <img
              src={
                community.images?.[0]?.url ||
                community.logo ||
                "/placeholder.svg"
              }
              alt={community.name}
              className="w-28 h-28 rounded-lg object-cover"
            />
            <div className="space-y-1">
              <div className="font-bold text-gray-900 text-lg">
                {community.name}
              </div>
              <div className="text-xs text-gray-600">
                Ecommerçant et coach de vie
              </div>
              <div className="text-xs text-gray-900 font-semibold">
                Zero to Hero in E-commerce
              </div>
              <div className="text-xs text-gray-500">
                {community.studentCount || 0} étudiants
              </div>
              <Button
                className="h-8"
                onClick={() => {
                  if (!community?.plan) {
                    toast.error("Aucun plan n'est disponible");
                    return;
                  }
                  // const amountCents = Math.round(
                  //   (community.plan.price || 0) * 100
                  // );
                  fetchPaymentIntent();
                }}
              >
                Rejoindre
              </Button>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-800 whitespace-pre-line">
            <RichDescription
              description={community.description || "Sans description"}
            />
          </div>
        </div>

        {/* Right: Course teaser card */}
        <div className="bg-white rounded-xl border p-4">
          <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={
                community.images?.[1]?.url ||
                community.images?.[0]?.url ||
                "/placeholder.svg"
              }
              alt="banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-20 bg-gray-100 rounded-md overflow-hidden"
              >
                <img
                  src={community.images?.[i]?.url || "/placeholder.svg"}
                  alt={`thumb-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold text-gray-900">
              {community.plan?.name || "Offre"}
            </h2>
            <p className="text-sm text-gray-700 mt-2">
              <RichDescription
                description={community.description || "Sans description"}
              />
            </p>
            <Button
              className="mt-4 w-full"
              onClick={() => {
                if (!community?.plan) {
                  toast.error("Aucun plan n'est disponible");
                  return;
                }
                const amountCents = Math.round(
                  (community.plan.price || 0) * 100
                );
                fetchPaymentIntent();
              }}
            >
              {community.plan
                ? `Rejoindre ${community.plan.price}€/${
                    community.plan.interval || "mois"
                  }`
                : "Rejoindre"}
            </Button>
          </div>
        </div>
      </div>
      {JSON.stringify(paymentIntent)}
      {showPayment && paymentIntent?.clientSecret && community?.plan && (
        <div className="max-w-md mx-auto mt-8">
          <StripePaymentForm
            publishableKey={paymentIntent.publishableKey}
            clientSecret={paymentIntent.clientSecret}
            onSuccess={() => {
              toast.success("Paiement effectué avec succès");
              setShowPayment(false);
            }}
            onError={(m) => toast.error(m)}
            isLoading={isPayLoading}
            setIsLoading={setIsPayLoading}
            selectedPlan={community.plan}
          />
        </div>
      )}
    </div>
  );
}

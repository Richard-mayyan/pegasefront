"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CoachEntity, CommunityEntity } from "@/logic/domain/entities";
import { MessageSquare, Users, Video } from "lucide-react";
import RichDescription from "@/components/RichDescription";
import StripePaymentForm from "@/app/onboarding/0/_components/stripe-payment-form";
import { toast } from "sonner";
import { usePaymentIntent } from "@/hooks/use-payment-intent";
import { formatPrice } from "@/lib/utils";

// type Coach = {
//   id: string;
//   firstname: string;
//   lastname: string;
//   avatar?: string;
//   description?: string;
//   jobTitle?: string;
//   followers?: number;
//   communities?: Array<{
//     id: any;
//     name: string;
//     description?: string;
//     images?: { url: string }[];
//     logo?: string;
//     price?: number;
//   }>;
// };
export default function StudCommunityDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [coach, setCoach] = useState<CoachEntity | null>(null);
  const [communities, setCommunities] = useState<CommunityEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCommunity, setSelectedCommunity] =
    useState<CommunityEntity | null>(null);
  const [isPayLoading, setIsPayLoading] = useState(false);
  const { paymentIntent, fetchPaymentIntent } = usePaymentIntent(() => {
    setShowPayment(true);
  });

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        setLoading(true);
        // Coach details (try to include communities in one call)
        const res = await apiClient.get(`/coachs/${id}`);
        const data = res.data?.data || res.data;
        setCoach(data);

        // If communities not present, fetch them from a dedicated route if available
        if (data?.communities && Array.isArray(data.communities)) {
          setCommunities(data.communities);
        } else {
          try {
            const cres = await apiClient.get(`/coachs/${id}/communities`);
            setCommunities(cres.data?.data || cres.data || []);
          } catch (_) {
            setCommunities([]);
          }
        }
      } catch (e) {
        setError("Impossible de charger ce coach");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const fullName = useMemo(
    () => (coach ? `${coach.firstname} ${coach.lastname}` : ""),
    [coach]
  );

  const handleJoinCommunity = (community: CommunityEntity) => {
    if (!community.plan && !community.price) {
      toast.error("Aucun plan n'est disponible pour cette communauté");
      return;
    }
    setSelectedCommunity(community);
    fetchPaymentIntent();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {loading && (
          <div className="text-center py-10 text-gray-500">Chargement...</div>
        )}
        {error && <div className="text-center py-10 text-red-500">{error}</div>}

        {!loading && !error && coach && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Coach info card */}
            <div className="bg-white rounded-2xl border p-4 md:p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={coach.avatar || "/placeholder.svg"}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-lg font-semibold">{fullName}</div>
                  {/* {coach.jobTitle && (
                    <div className="text-xs text-gray-500 mt-0.5">
                      {coach.jobTitle}
                    </div>
                  )}
                  {typeof coach.followers === "number" && (
                    <div className="text-xs text-gray-500 mt-1">
                      {coach.followers.toLocaleString()} étudiants
                    </div>
                  )} */}
                  {/* <div className="mt-3">
                    <Button className="bg-customBg hover:bg-customBg-hover text-white h-8 px-3 rounded-full text-xs">
                      Rejoindre
                    </Button>
                  </div> */}
                </div>
              </div>

              {coach.description && (
                <div className="mt-4 text-sm text-gray-700 whitespace-pre-line">
                  {coach.description}
                </div>
              )}

              {/* Optional: highlights/bullets could be rendered here */}
            </div>

            {/* Right: Coach communities, scrollable column */}
            <div className="bg-white rounded-2xl border p-4 md:p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                {communities && communities.length > 0 ? (
                  communities.map((c) => (
                    <div key={c.id} className="rounded-xl border p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-28 h-20 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={
                              c.images?.[0]?.url || c.logo || "/placeholder.svg"
                            }
                            alt={c.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 line-clamp-2">
                            {c.name}
                          </div>
                          {c.description && (
                            <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {c.description}
                            </div>
                          )}
                          <div className="mt-3 flex items-center justify-between">
                            <Link
                              href={`/stud/commu/${c.id}`}
                              className="text-xs underline text-customBg"
                            >
                              Voir la communauté
                            </Link>
                            <Button
                              disabled={c.subscribed}
                              variant={c.subscribed ? "outline" : "default"}
                              className="bg-customBg hover:bg-customBg-hover text-white h-8 px-3 rounded-full text-xs"
                              onClick={() => handleJoinCommunity(c)}
                            >
                              {c.subscribed
                                ? "Déjà abonné"
                                : c.plan
                                ? `Rejoindre ${formatPrice(
                                    c.plan.price / 100
                                  )}/${
                                    c.plan.frequency === "monthly"
                                      ? "mois"
                                      : "an"
                                  }`
                                : "Rejoindre"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-sm text-gray-500">
                    Aucune communauté pour ce coach pour l'instant.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Formulaire de paiement Stripe */}
      {showPayment && paymentIntent?.clientSecret && selectedCommunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              Rejoindre {selectedCommunity.name}
            </h3>
            <StripePaymentForm
              publishableKey={paymentIntent.publishableKey}
              clientSecret={paymentIntent.clientSecret}
              onSuccess={() => {
                toast.success("Paiement effectué avec succès");
                setShowPayment(false);
                setSelectedCommunity(null);
              }}
              onError={(m) => toast.error(m)}
              isLoading={isPayLoading}
              setIsLoading={setIsPayLoading}
              selectedPlan={selectedCommunity.plan}
            />
            <Button
              variant="outline"
              onClick={() => {
                setShowPayment(false);
                setSelectedCommunity(null);
              }}
              className="w-full mt-4"
            >
              Annuler
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

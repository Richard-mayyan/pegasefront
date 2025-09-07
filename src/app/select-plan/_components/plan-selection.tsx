"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import { Check, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { PlanEntity } from "@/logic/domain/entities";

interface PlanSelectionProps {
  onPlanSelect: (plan: PlanEntity) => void;
  selectedPlan: PlanEntity | null;
}

export default function PlanSelection({
  onPlanSelect,
  selectedPlan,
}: PlanSelectionProps) {
  const [plans, setPlans] = useState<PlanEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/plans?target=coachs");
      setPlans(response.data.data || response.data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des plans:", error);
      setError("Impossible de charger les plans");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-customBg mx-auto"></div>
        <p className="text-gray-600 mt-2">Chargement des plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <Button onClick={fetchPlans} variant="outline" className="mt-4">
          Réessayer
        </Button>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Aucun plan disponible pour le moment.</p>
      </div>
    );
  }

  console.log("plans ", plans);

  return (
    <div className="space-y-4 ">
      <div className="">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Choisissez votre plan
        </h3>
        <p className="text-gray-600">
          Sélectionnez le plan qui correspond le mieux à vos besoins
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all ${
              selectedPlan?.id === plan.id
                ? "border-teal-500 bg-teal-50"
                : "border-gray-200 hover:border-teal-300 hover:bg-gray-50"
            }`}
            onClick={() => onPlanSelect(plan)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Populaire
                </span>
              </div>
            )}

            {selectedPlan?.id === plan.id && (
              <div className="absolute top-4 right-4">
                <Check className="w-6 h-6 text-teal-500" />
              </div>
            )}

            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {plan.name}
              </h4>
              <p className="text-gray-600 text-sm mb-4">{plan.description} </p>

              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {plan.price === 0
                    ? "Gratuit"
                    : `${formatPrice(plan.price / 100)} `}
                </span>
                {plan.frequency === "monthly" ? "par mois" : "par an"}
                {/* {plan.price > 0 && (
                  <span className="text-gray-600">/ par mois</span>
                  //   <span className="text-gray-600">/{plan.interval}</span>
                )} */}
              </div>

              {/* <p className="text-black">
                Période d'essai {plan.trialPeriodDays}{" "}
              </p> */}

              {/* {plan.trialPeriodDays && plan.trialPeriodDays == 0 && (
                <div className="mb-4 bg-red-900">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    ss {plan.trialPeriodDays} jours d'essai gratuit
                  </span>
                </div>
              )} */}

              {plan.features && plan.features.length > 0 && (
                <ul className="text-left space-y-2">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* {selectedPlan && (
        <div className="text-center p-4 bg-teal-50 border border-teal-200 rounded-lg">
          <p className="text-customBg-augmented font-medium">
            Plan sélectionné :{" "}
            <span className="font-semibold">{selectedPlan.name}</span>
          </p>
          <p className="text-customBg text-sm mt-1">
            {selectedPlan.price === 0
              ? "Vous pourrez commencer immédiatement"
              : `Prix : ${formatPrice(selectedPlan.price / 100)}/ par mois`}
          </p>
        </div>
      )} */}
    </div>
  );
}

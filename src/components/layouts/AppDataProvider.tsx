"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CommunityEntity, ClassEntity } from "@/logic/domain/entities";
import { useAuth } from "./AuthProvider";
import { classRepo } from "@/logic/infra/di/container";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { Button } from "../ui/button";

interface AppDataContextType {
  loadUserCommunities: () => void;
  currentCommunity: CommunityEntity | null;
  communities: CommunityEntity[];
  classes: ClassEntity[];
  setCommunity: (community: CommunityEntity | null) => void;
  setCommunities: (communities: CommunityEntity[]) => void;
  setClasses: (classes: ClassEntity[]) => void;
  addClass: (classData: ClassEntity) => void;
  isLoadingCommunities: boolean;
  // Upgrade popup
  openUpgradeSubscription: (reason?: string) => void;
  doIfUpgradeSubscription: (callback: () => void) => void;
  hasDisabledSubscription: boolean;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

// Clés pour le localStorage
const SELECTED_COMMUNITY_KEY = "pegas_selected_community_id";

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [currentCommunity, setCommunity] = useState<CommunityEntity | null>(
    null
  );
  const [communities, setCommunities] = useState<CommunityEntity[]>([]);
  const [classesData, setClassesData] = useState<ClassEntity[]>([]);
  const [isLoadingCommunities, setIsLoadingCommunities] = useState(true);
  const { user } = useAuth();

  // Upgrade popup state
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<string | undefined>(
    undefined
  );

  const openUpgradeSubscription = (reason?: string) => {
    setUpgradeReason(reason);
    setShowUpgrade(true);
  };

  const hasDisabledSubscription = user?.subscriptions?.length === 0;
  const doIfUpgradeSubscription = (callback: () => void) => {
    if (hasDisabledSubscription) {
      openUpgradeSubscription();
    } else {
      callback();
    }
  };

  const loadUserCommunities = async () => {
    if (!user || !user.communities) {
      setIsLoadingCommunities(false);
      return;
    }

    try {
      setIsLoadingCommunities(true);

      // Mettre à jour la liste des communautés
      setCommunities(user.communities);

      // Récupérer l'ID de la communauté sélectionnée depuis le localStorage
      const selectedCommunityId = localStorage.getItem(SELECTED_COMMUNITY_KEY);

      let selectedCommunity: CommunityEntity | null = null;

      if (selectedCommunityId) {
        // Chercher la communauté sélectionnée dans la liste
        selectedCommunity =
          user.communities.find(
            (comm) => comm.id?.toString() === selectedCommunityId
          ) || null;
      }

      // Si aucune communauté n'est sélectionnée ou si elle n'existe plus, prendre la première
      if (!selectedCommunity && user.communities.length > 0) {
        selectedCommunity = user.communities[0];
        // Sauvegarder la première communauté comme sélectionnée
        localStorage.setItem(
          SELECTED_COMMUNITY_KEY,
          selectedCommunity.id?.toString() || ""
        );
      }

      // Mettre à jour la communauté sélectionnée
      setCommunity(selectedCommunity);

      // Charger les classes de la communauté sélectionnée
      if (selectedCommunity) {
        try {
          const classes = await classRepo.findAll(
            selectedCommunity.id?.toString() || ""
          );
          setClassesData(classes);
        } catch (error) {
          console.error("Erreur lors de la récupération des classes:", error);
        }
      }
    } catch (error) {
      console.error("Erreur lors du chargement des communautés:", error);
    } finally {
      setIsLoadingCommunities(false);
    }
  };

  // Charger les communautés de l'utilisateur connecté
  useEffect(() => {
    loadUserCommunities();
  }, [user]);

  // Fonction pour changer de communauté
  const setCommunityData = (newCommunity: CommunityEntity | null) => {
    setCommunity(newCommunity);

    if (newCommunity) {
      // Sauvegarder l'ID de la communauté sélectionnée
      localStorage.setItem(
        SELECTED_COMMUNITY_KEY,
        newCommunity.id?.toString() || ""
      );

      // Charger les classes de la nouvelle communauté
      const loadClassesForCommunity = async () => {
        try {
          const classes = await classRepo.findAll(
            newCommunity.id?.toString() || ""
          );
          setClassesData(classes);
        } catch (error) {
          console.error("Erreur lors de la récupération des classes:", error);
          setClassesData([]);
        }
      };

      loadClassesForCommunity();
    } else {
      // Supprimer la sélection de communauté
      localStorage.removeItem(SELECTED_COMMUNITY_KEY);
      setClassesData([]);
    }
  };

  return (
    <AppDataContext.Provider
      value={{
        hasDisabledSubscription,
        doIfUpgradeSubscription,
        loadUserCommunities,
        currentCommunity,
        communities,
        classes: classesData,
        setCommunity: setCommunityData,
        setCommunities,
        setClasses: setClassesData,
        addClass: (c: ClassEntity) => setClassesData((prev) => [c, ...prev]),
        isLoadingCommunities,
        openUpgradeSubscription,
      }}
    >
      {children}

      {/* Global Upgrade Popup */}
      {showUpgrade && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-lg">
            <div className="p-5 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Souscrivez à un plan
              </h3>
              {upgradeReason && (
                <p className="mt-1 text-sm text-gray-600">{upgradeReason}</p>
              )}
            </div>
            <div className="p-5 space-y-3 text-sm text-gray-700">
              <p>
                Cette fonctionnalité nécessite un abonnement actif. Choisissez
                un plan pour continuer.
              </p>
            </div>
            <div className="p-5 flex items-center justify-end gap-3 border-t">
              <Button
                onClick={() => setShowUpgrade(false)}
                variant={"outline"}
                className="w-full rounded-lg h-12"
              >
                Plus tard
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowUpgrade(false);
                  window.location.href = ROUTES.selectPlan;
                }}
                variant={"roam"}
                className="w-full rounded-lg h-12"
              >
                Voir les plans
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
}

export function useUpgradeCoach() {
  const { openUpgradeSubscription } = useAppData();
  return openUpgradeSubscription;
}

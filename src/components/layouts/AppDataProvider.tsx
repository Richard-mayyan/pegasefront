"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CommunityEntity, ClassEntity } from "@/logic/domain/entities";
import { useAuth } from "./AuthProvider";
import { classRepo } from "@/logic/infra/di/container";

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

      console.log("selectedCommunity", selectedCommunity);

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
        loadUserCommunities,
        currentCommunity,
        communities,
        classes: classesData,
        setCommunity: setCommunityData,
        setCommunities,
        setClasses: setClassesData,
        addClass: (c: ClassEntity) => setClassesData((prev) => [c, ...prev]),
        isLoadingCommunities,
      }}
    >
      {children}
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

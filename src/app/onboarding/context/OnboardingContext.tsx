"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CommunityEntity } from "@/logic/domain/entities";
import { getdefaultValue } from "@/lib/utils";

interface OnboardingData {
  // communityId: string;
  // Étape 1: Informations de base de la communauté
  name: string;
  description: string;
  cover: string;
  profil: string;
  logo: string;
  images: string[]; // Tableau de photos de couverture (max 5)
  color: string;
  typography: string;

  // Étape 2: Informations supplémentaires
  additionalInfo?: string;

  // Étape 3: Chapitres et leçons
  chapters: Array<{
    name: string;
    lessons: Array<{
      title: string;
      type: string;
      content: object;
    }>;
  }>;

  // Étape 4: Configuration finale
  settings: {
    communityDiscussion: boolean;
    studentListVisibility: boolean;
    groupMeeting: boolean;
  };
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  resetData: () => void;
  getCommunityData: () => Partial<CommunityEntity>;
}

const defaultData: OnboardingData = {
  // communityId: "",
  name: getdefaultValue("nomdelacommunauté"),
  description: getdefaultValue("Description de la communauté"),
  cover: "",
  profil: "",
  logo: "",
  images: [],
  color: "red", // Rouge par défaut
  typography: "manrope", // Manrope par défaut
  chapters: [],
  settings: {
    communityDiscussion: true,
    studentListVisibility: true,
    groupMeeting: true,
  },
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<OnboardingData>(defaultData);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(defaultData);
  };

  const getCommunityData = (): Partial<any> => {
    return {
      // communityId: data.communityId,
      chapters: data.chapters,
      name: data.name,
      description: data.description,
      cover: data.cover,
      profil: data.profil,
      logo: data.logo,
      images: data.images,
      color: data.color,
      typography: data.typography,
      settings: data.settings,
    };
  };

  return (
    <OnboardingContext.Provider
      value={{ data, updateData, resetData, getCommunityData }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

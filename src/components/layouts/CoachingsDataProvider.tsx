"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAppData } from "./AppDataProvider";
import { coachingsRepo } from "@/logic/infra/di/container";
import { CoachingEntity, ReservationEntity } from "@/logic/domain/entities";
import {
  CreateCoachingDto,
  UpdateCoachingDto,
  CreateReservationDto,
  UpdateReservationDto,
} from "@/logic/domain/repos/CoachingsRepo";

interface CoachingsContextType {
  // État
  coachings: CoachingEntity[];
  reservations: ReservationEntity[];
  isLoading: boolean;
  error: string | null;

  // Actions sur les coachings
  createCoaching: (data: CreateCoachingDto) => Promise<CoachingEntity>;
  updateCoaching: (
    id: string,
    data: UpdateCoachingDto
  ) => Promise<CoachingEntity>;
  deleteCoaching: (id: string) => Promise<void>;

  // Actions sur les réservations
  createReservation: (data: CreateReservationDto) => Promise<ReservationEntity>;
  updateReservation: (
    id: number,
    data: UpdateReservationDto
  ) => Promise<ReservationEntity>;
  deleteReservation: (id: number) => Promise<void>;

  // Méthodes utilitaires
  findCoachingsWithReservations: () => Promise<
    (CoachingEntity & { reservations: ReservationEntity[] })[]
  >;
  findUpcomingCoachings: (limit?: number) => Promise<CoachingEntity[]>;
  findPastCoachings: (limit?: number) => Promise<CoachingEntity[]>;

  // Refresh des données
  refreshData: () => Promise<void>;
}

const CoachingsContext = createContext<CoachingsContextType | undefined>(
  undefined
);

export const useCoachingsData = () => {
  const context = useContext(CoachingsContext);
  if (context === undefined) {
    throw new Error(
      "useCoachingsData must be used within a CoachingsDataProvider"
    );
  }
  return context;
};

interface CoachingsDataProviderProps {
  children: ReactNode;
}

export const CoachingsDataProvider: React.FC<CoachingsDataProviderProps> = ({
  children,
}) => {
  const [coachings, setCoachings] = useState<CoachingEntity[]>([]);
  const [reservations, setReservations] = useState<ReservationEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les données initiales
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const coachingsData = await coachingsRepo.findAllCoachings();
      setCoachings(coachingsData);

      // Pour l'instant, pas de réservations dans l'API backend
      setReservations([]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement des coachings"
      );
      console.error("Erreur lors du chargement des coachings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const createCoaching = async (
    data: CreateCoachingDto
  ): Promise<CoachingEntity> => {
    try {
      setError(null);
      const newCoaching = await coachingsRepo.createCoaching(data);

      // Mettre à jour l'état local
      setCoachings((prev) => [...prev, newCoaching]);

      return newCoaching;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors de la création du coaching";
      setError(errorMessage);
      throw err;
    }
  };

  const updateCoaching = async (
    id: string,
    data: UpdateCoachingDto
  ): Promise<CoachingEntity> => {
    try {
      setError(null);
      const updatedCoaching = await coachingsRepo.updateCoaching(id, data);

      // Mettre à jour l'état local
      setCoachings((prev) =>
        prev.map((coaching) =>
          coaching.id === id ? updatedCoaching : coaching
        )
      );

      return updatedCoaching;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors de la mise à jour du coaching";
      setError(errorMessage);
      throw err;
    }
  };

  const deleteCoaching = async (id: string): Promise<void> => {
    try {
      setError(null);
      await coachingsRepo.deleteCoaching(id);

      // Mettre à jour l'état local
      setCoachings((prev) => prev.filter((coaching) => coaching.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors de la suppression du coaching";
      setError(errorMessage);
      throw err;
    }
  };

  const createReservation = async (
    data: CreateReservationDto
  ): Promise<ReservationEntity> => {
    try {
      setError(null);
      const newReservation = await coachingsRepo.createReservation(data);

      // Mettre à jour l'état local
      setReservations((prev) => [...prev, newReservation]);

      return newReservation;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors de la création de la réservation";
      setError(errorMessage);
      throw err;
    }
  };

  const updateReservation = async (
    id: number,
    data: UpdateReservationDto
  ): Promise<ReservationEntity> => {
    try {
      setError(null);
      const updatedReservation = await coachingsRepo.updateReservation(
        id,
        data
      );

      // Mettre à jour l'état local
      setReservations((prev) =>
        prev.map((res) => (res.id === id ? updatedReservation : res))
      );

      return updatedReservation;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors de la mise à jour de la réservation";
      setError(errorMessage);
      throw err;
    }
  };

  const deleteReservation = async (id: number): Promise<void> => {
    try {
      setError(null);
      await coachingsRepo.deleteReservation(id);

      // Mettre à jour l'état local
      setReservations((prev) => prev.filter((res) => res.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors de la suppression de la réservation";
      setError(errorMessage);
      throw err;
    }
  };

  const findCoachingsWithReservations = async (): Promise<
    (CoachingEntity & { reservations: ReservationEntity[] })[]
  > => {
    return coachingsRepo.findCoachingsWithReservations();
  };

  const findUpcomingCoachings = async (
    limit?: number
  ): Promise<CoachingEntity[]> => {
    return coachingsRepo.findUpcomingCoachings(limit);
  };

  const findPastCoachings = async (
    limit?: number
  ): Promise<CoachingEntity[]> => {
    return coachingsRepo.findPastCoachings(limit);
  };

  const refreshData = async () => {
    await loadData();
  };

  const value: CoachingsContextType = {
    coachings,
    reservations,
    isLoading,
    error,
    createCoaching,
    updateCoaching,
    deleteCoaching,
    createReservation,
    updateReservation,
    deleteReservation,
    findCoachingsWithReservations,
    findUpcomingCoachings,
    findPastCoachings,
    refreshData,
  };

  return (
    <CoachingsContext.Provider value={value}>
      {children}
    </CoachingsContext.Provider>
  );
};

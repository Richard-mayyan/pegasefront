import {
  ICoachingsRepo,
  CreateCoachingDto,
  UpdateCoachingDto,
  CreateReservationDto,
  UpdateReservationDto,
} from "@/logic/domain/repos/CoachingsRepo";
import { CoachingEntity, ReservationEntity } from "@/logic/domain/entities";
import { apiClient } from "./axios";

export class NodeCoachingsRepo implements ICoachingsRepo {
  // Gestion des coachings
  async createCoaching(data: CreateCoachingDto): Promise<CoachingEntity> {
    try {
      const response = await apiClient.post("/user/coachings", {
        duration: data.duration,
        startAt: data.startAt,
        name: data.name,
        description: data.description,
        link: data.link,
        price: data.price ? data.price * 100 : undefined, // Convertir euros en centimes
        // startAt et endAt sont gérés automatiquement par le backend
        // user est ajouté automatiquement par le contrôleur
      });

      return this.mapCoachingResponseToEntity(
        response.data.data || response.data
      );
    } catch (error) {
      console.error("Erreur lors de la création du coaching:", error);
      throw new Error("Impossible de créer le coaching");
    }
  }

  async findAllCoachings(): Promise<CoachingEntity[]> {
    try {
      const response = await apiClient.get("/user/coachings");
      const coachings = response.data.data || response.data || [];
      return coachings.map(this.mapCoachingResponseToEntity);
    } catch (error) {
      console.error("Erreur lors de la récupération des coachings:", error);
      return [];
    }
  }

  async findCoachingById(id: string): Promise<CoachingEntity | null> {
    try {
      const response = await apiClient.get(`/coachings/${id}`);
      return this.mapCoachingResponseToEntity(
        response.data.data || response.data
      );
    } catch (error) {
      console.error("Erreur lors de la récupération du coaching:", error);
      return null;
    }
  }

  async findCoachingsByUser(userId: string): Promise<CoachingEntity[]> {
    try {
      // L'endpoint /coachings retourne déjà les coachings de l'utilisateur connecté
      const response = await apiClient.get("/coachings");
      const coachings = response.data.data || response.data || [];
      return coachings.map(this.mapCoachingResponseToEntity);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des coachings de l'utilisateur:",
        error
      );
      return [];
    }
  }

  async updateCoaching(
    id: string,
    data: UpdateCoachingDto
  ): Promise<CoachingEntity> {
    try {
      const response = await apiClient.patch(`/coachings/${id}`, {
        duration: data.duration,
        startAt: data.startAt,
        name: data.name,
        description: data.description,
        link: data.link,
        price: data.price ? data.price * 100 : undefined, // Convertir euros en centimes
        // startAt et endAt ne sont pas modifiables via l'API
      });
      return this.mapCoachingResponseToEntity(
        response.data.data || response.data
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du coaching:", error);
      throw new Error("Impossible de mettre à jour le coaching");
    }
  }

  async deleteCoaching(id: string): Promise<void> {
    try {
      await apiClient.delete(`/coachings/${id}`);
    } catch (error) {
      console.error("Erreur lors de la suppression du coaching:", error);
      throw new Error("Impossible de supprimer le coaching");
    }
  }

  // Gestion des réservations (pour compatibilité - à implémenter si nécessaire)
  async createReservation(
    data: CreateReservationDto
  ): Promise<ReservationEntity> {
    // TODO: Implémenter si l'API backend supporte les réservations
    throw new Error("Réservations non encore implémentées dans l'API backend");
  }

  async findReservationsByEvent(eventId: number): Promise<ReservationEntity[]> {
    // TODO: Implémenter si l'API backend supporte les réservations
    return [];
  }

  async findReservationsByUser(userId: number): Promise<ReservationEntity[]> {
    // TODO: Implémenter si l'API backend supporte les réservations
    return [];
  }

  async updateReservation(
    id: number,
    data: UpdateReservationDto
  ): Promise<ReservationEntity> {
    // TODO: Implémenter si l'API backend supporte les réservations
    throw new Error("Réservations non encore implémentées dans l'API backend");
  }

  async deleteReservation(id: number): Promise<void> {
    // TODO: Implémenter si l'API backend supporte les réservations
    throw new Error("Réservations non encore implémentées dans l'API backend");
  }

  // Méthodes utilitaires
  async findCoachingsWithReservations(): Promise<
    (CoachingEntity & { reservations: ReservationEntity[] })[]
  > {
    try {
      const coachings = await this.findAllCoachings();
      // Pour l'instant, retourner les coachings sans réservations
      return coachings.map((coaching) => ({
        ...coaching,
        reservations: [],
      }));
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des coachings avec réservations:",
        error
      );
      return [];
    }
  }

  async findUpcomingCoachings(limit?: number): Promise<CoachingEntity[]> {
    try {
      const coachings = await this.findAllCoachings();
      const now = new Date();
      const upcomingCoachings = coachings
        .filter((coaching) => {
          if (!coaching.startAt) return false;
          return new Date(coaching.startAt) > now;
        })
        .sort((a, b) => {
          if (!a.startAt || !b.startAt) return 0;
          return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
        });

      return limit ? upcomingCoachings.slice(0, limit) : upcomingCoachings;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des coachings à venir:",
        error
      );
      return [];
    }
  }

  async findPastCoachings(limit?: number): Promise<CoachingEntity[]> {
    try {
      const coachings = await this.findAllCoachings();
      const now = new Date();
      const pastCoachings = coachings
        .filter((coaching) => {
          if (!coaching.startAt) return false;
          return new Date(coaching.startAt) < now;
        })
        .sort((a: any, b: any) => {
          if (!a.endAt || !b.endAt) return 0;
          return new Date(b.endAt).getTime() - new Date(a.endAt).getTime();
        });

      return limit ? pastCoachings.slice(0, limit) : pastCoachings;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des coachings passés:",
        error
      );
      return [];
    }
  }

  // Méthode de mapping des réponses API vers les entités
  private mapCoachingResponseToEntity(data: any): CoachingEntity {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      link: data.link,
      price: data.price ? data.price / 100 : undefined, // Convertir centimes en euros
      startAt: data.startAt,
      duration: data.duration,
      user: data.user,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}

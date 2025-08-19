import { CoachingEntity, ReservationEntity } from "../entities";

// DTOs pour la création et mise à jour
export interface CreateCoachingDto {
  name: string;
  description?: string;
  link?: string;
  price?: number;
  startAt?: string;
  endAt?: string;
}

export interface UpdateCoachingDto {
  name?: string;
  description?: string;
  link?: string;
  price?: number;
  startAt?: string;
  endAt?: string;
}

export interface CreateReservationDto {
  eventId: number;
  userId: number;
}

export interface UpdateReservationDto {
  status?: "pending" | "confirmed" | "cancelled";
}

// Interface principale du repo
export interface ICoachingsRepo {
  // Gestion des coachings
  createCoaching(data: CreateCoachingDto): Promise<CoachingEntity>;
  findAllCoachings(): Promise<CoachingEntity[]>;
  findCoachingById(id: string): Promise<CoachingEntity | null>;
  findCoachingsByUser(userId: string): Promise<CoachingEntity[]>;
  updateCoaching(id: string, data: UpdateCoachingDto): Promise<CoachingEntity>;
  deleteCoaching(id: string): Promise<void>;

  // Gestion des réservations (pour compatibilité)
  createReservation(data: CreateReservationDto): Promise<ReservationEntity>;
  findReservationsByEvent(eventId: number): Promise<ReservationEntity[]>;
  findReservationsByUser(userId: number): Promise<ReservationEntity[]>;
  updateReservation(
    id: number,
    data: UpdateReservationDto
  ): Promise<ReservationEntity>;
  deleteReservation(id: number): Promise<void>;

  // Méthodes utilitaires
  findCoachingsWithReservations(): Promise<
    (CoachingEntity & { reservations: ReservationEntity[] })[]
  >;
  findUpcomingCoachings(limit?: number): Promise<CoachingEntity[]>;
  findPastCoachings(limit?: number): Promise<CoachingEntity[]>;
}

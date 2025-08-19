import {
  ICoachingsRepo,
  CreateReservationDto,
  UpdateReservationDto,
  CreateCoachingDto,
  UpdateCoachingDto,
} from "@/logic/domain/repos/CoachingsRepo";
import {
  CoachingEntity,
  EventEntity,
  ReservationEntity,
} from "@/logic/domain/entities";

export class InMemoryCoachingsRepo implements ICoachingsRepo {
  private events: EventEntity[] = [];
  private reservations: ReservationEntity[] = [];
  private nextEventId = 1;
  private nextReservationId = 1;

  constructor() {
    this.initializeDefaultData();
  }
  createCoaching(data: CreateCoachingDto): Promise<CoachingEntity> {
    throw new Error("Method not implemented.");
  }
  findAllCoachings(): Promise<CoachingEntity[]> {
    throw new Error("Method not implemented.");
  }
  findCoachingById(id: string): Promise<CoachingEntity | null> {
    throw new Error("Method not implemented.");
  }
  findCoachingsByUser(userId: string): Promise<CoachingEntity[]> {
    throw new Error("Method not implemented.");
  }
  updateCoaching(id: string, data: UpdateCoachingDto): Promise<CoachingEntity> {
    throw new Error("Method not implemented.");
  }
  deleteCoaching(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findCoachingsWithReservations(): Promise<
    (CoachingEntity & { reservations: ReservationEntity[] })[]
  > {
    throw new Error("Method not implemented.");
  }
  findUpcomingCoachings(limit?: number): Promise<CoachingEntity[]> {
    throw new Error("Method not implemented.");
  }
  findPastCoachings(limit?: number): Promise<CoachingEntity[]> {
    throw new Error("Method not implemented.");
  }

  private initializeDefaultData() {
    // Créer des événements de test
    const defaultEvents: EventEntity[] = [
      {
        id: 1,
        name: "Maîtriser ses émotions en public",
        description:
          "Apprenez à gérer votre stress et vos émotions lors de prises de parole en public",
        price: 50,
        paymentType: "one-time",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Dans 7 jours
        startTime: "18:00",
        endTime: "18:30",
        timezone: "Europe/Paris",
        eventLink: "https://meet.google.com/fsk-oeqb-vtd",
        type: "private",
        duration: "30:00",
        communityId: 1,
        coachId: 1,
        members: [2, 3],
        status: "scheduled",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Techniques de respiration pour la confiance",
        description:
          "Découvrez des exercices de respiration qui boostent votre confiance en vous",
        price: 75,
        paymentType: "monthly",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // Dans 14 jours
        startTime: "19:00",
        endTime: "20:00",
        timezone: "Europe/Paris",
        eventLink: "https://meet.google.com/abc-def-ghi",
        type: "public",
        duration: "60:00",
        communityId: 1,
        coachId: 1,
        members: [],
        status: "scheduled",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: "Gestion du temps et productivité",
        description:
          "Optimisez votre organisation et augmentez votre productivité au quotidien",
        price: 60,
        paymentType: "one-time",
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Dans 3 jours
        startTime: "17:00",
        endTime: "18:00",
        timezone: "Europe/Paris",
        eventLink: "https://meet.google.com/xyz-uvw-rst",
        type: "private",
        duration: "60:00",
        communityId: 1,
        coachId: 1,
        members: [4, 5],
        status: "scheduled",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    // Créer des réservations de test
    const defaultReservations: ReservationEntity[] = [
      {
        id: 1,
        eventId: 1,
        userId: 2,
        status: "confirmed",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        eventId: 1,
        userId: 3,
        status: "confirmed",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        eventId: 3,
        userId: 4,
        status: "confirmed",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 4,
        eventId: 3,
        userId: 5,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    // this.events = defaultEvents;
    // this.reservations = defaultReservations;
    // this.nextEventId = 4;
    // this.nextReservationId = 5;
  }

  // Gestion des événements/coachings
  async createEvent(data: any): Promise<EventEntity> {
    const newEvent: EventEntity = {
      id: this.nextEventId++,
      ...data,
      status: "scheduled",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.events.push(newEvent);
    return newEvent;
  }

  async findAllEvents(communityId: number): Promise<EventEntity[]> {
    return this.events.filter((event) => event.communityId === communityId);
  }

  async findEventById(id: number): Promise<EventEntity | null> {
    return this.events.find((event) => event.id === id) || null;
  }

  async findEventsByCoach(coachId: number): Promise<EventEntity[]> {
    return this.events.filter((event) => event.coachId === coachId);
  }

  async updateEvent(id: number, data: any): Promise<EventEntity> {
    const index = this.events.findIndex((event) => event.id === id);
    if (index === -1) {
      throw new Error("Event not found");
    }

    this.events[index] = {
      ...this.events[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return this.events[index];
  }

  async deleteEvent(id: number): Promise<void> {
    const index = this.events.findIndex((event) => event.id === id);
    if (index !== -1) {
      this.events.splice(index, 1);
      // Supprimer aussi les réservations associées
      this.reservations = this.reservations.filter((res) => res.eventId !== id);
    }
  }

  // Gestion des réservations
  async createReservation(
    data: CreateReservationDto
  ): Promise<ReservationEntity> {
    const newReservation: ReservationEntity = {
      id: this.nextReservationId++,
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.reservations.push(newReservation);
    return newReservation;
  }

  async findReservationsByEvent(eventId: number): Promise<ReservationEntity[]> {
    return this.reservations.filter((res) => res.eventId === eventId);
  }

  async findReservationsByUser(userId: number): Promise<ReservationEntity[]> {
    return this.reservations.filter((res) => res.userId === userId);
  }

  async updateReservation(
    id: number,
    data: UpdateReservationDto
  ): Promise<ReservationEntity> {
    const index = this.reservations.findIndex((res) => res.id === id);
    if (index === -1) {
      throw new Error("Reservation not found");
    }

    this.reservations[index] = {
      ...this.reservations[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return this.reservations[index];
  }

  async deleteReservation(id: number): Promise<void> {
    const index = this.reservations.findIndex((res) => res.id === id);
    if (index !== -1) {
      this.reservations.splice(index, 1);
    }
  }

  // Méthodes utilitaires
  async findEventsWithReservations(
    communityId: number
  ): Promise<(EventEntity & { reservations: ReservationEntity[] })[]> {
    const events = this.events.filter(
      (event) => event.communityId === communityId
    );

    return events.map((event) => ({
      ...event,
      reservations: this.reservations.filter((res) => res.eventId === event.id),
    }));
  }

  async findUpcomingEvents(
    communityId: number,
    limit?: number
  ): Promise<EventEntity[]> {
    const now = new Date();
    const upcomingEvents = this.events
      .filter(
        (event) =>
          event.communityId === communityId &&
          event.status === "scheduled" &&
          new Date(event.date) > now
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return limit ? upcomingEvents.slice(0, limit) : upcomingEvents;
  }

  async findPastEvents(
    communityId: number,
    limit?: number
  ): Promise<EventEntity[]> {
    const now = new Date();
    const pastEvents = this.events
      .filter(
        (event) =>
          event.communityId === communityId &&
          (event.status === "completed" || new Date(event.date) < now)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return limit ? pastEvents.slice(0, limit) : pastEvents;
  }
}

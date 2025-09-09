import { CommunitySettings } from "../repos/CommunityRepo";

// {
//   "uploadUrl": "https://direct-uploads.oci-us-ashburn-1-vop1.production.mux.com/upload/649xRu0221tzLGZ6QvduE4pfVt02mjMCnQWsTh4PswcDw?token=eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg5MTg4MjMwOTIyNzA1NjMwMTMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJkdSIsImV4cCI6MTc1ODA1MDAyNCwic3ViIjoiNjQ5eFJ1MDIyMXR6TEdaNlF2ZHVFNHBmVnQwMm1qTUNuUVdzVGg0UHN3Y0R3In0.RYjqAnI4uO2Me-j-HZWuuRXZUZ1wyqo8y-lLFHo_grIvYNsw6XUPYiiYwSYP40so4mYNUvzE0uTnaF_za_XTwXFYMmLU6QVHJGaHwZdDkuCtkzQSHDqM9YmDyq-ZTArabNrju2--OT2JpkSFXqRAFwVEyZWLffn8EzYPRlbgL3rezNuI8V8MAJOMTZPVXqfkTMYnRdrfsGrbTlweNfhlcBj206x7UDmh2NMKAYnV0uc0aRiJISbEKPU8vnkpqk4H_Ke2KqZdWkrfs63Hf9qLpTvzwxUSqYYG0ZGGjZajCbHm7AENyE2LNIkXgrmHADXw24GyxJBm05rlRy0RfG1tyQ",
//   "assetId": "649xRu0221tzLGZ6QvduE4pfVt02mjMCnQWsTh4PswcDw",
//   "message": "Upload URL created successfully"
// }

export interface MuxUploadUrlResponse {
  uploadUrl: string;
  assetId: string;
  message: string;
}
// models.ts
export enum RegisterProfileEnum {
  Admin = "admin",
  Coach = "coach",
  Student = "student",
}

export enum RegisterRegisterProfileEnum {
  Coach = "coach",
  Student = "student",
}

export interface SubscriptionEntity {
  id: string;
  status: string;
  start_date: number;
  ended_at: number | null;
  trial_start: number | null;
  trial_end: number | null;
}
export interface CoachEntity {
  description: string;
  avatar: string;
  firstname: string;
  id: string;
  lastname: string;
}
// --- UserEntity ---
export interface UserEntity {
  id?: number;
  isEmailConfirmed: boolean;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  profile: RegisterProfileEnum;
  communities?: CommunityEntity[];
  subscriptions?: SubscriptionEntity[];
  coach?: CoachEntity;
  paymentMethods?: PaymentMethodEntity[];
}

export interface PaymentMethodEntity {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
}

export interface PlanEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  trialPeriodDays?: number;
  features?: string[];
  popular?: boolean;
  frequency: "monthly" | "yearly";
}

// --- CommunityEntity ---
export interface CommunityEntity {
  id?: any;
  name: string;
  description?: string;
  // cover?: string;
  profil?: string;
  logo?: string;
  images?: { resourceId: string; url: string }[];
  color?: string;
  typography?: string;
  price?: number;
  classes?: ClassEntity[];
  members?: UserEntity[];
  // Configuration de la communauté
  settings?: CommunitySettings;
  createdAt?: string;
  updatedAt?: string;
  studentCount: number;
  plan?: PlanEntity;
  subscribed?: boolean;
}

export interface CommunityEntityWithoutImages {
  id?: any;
  name: string;
  description?: string;
  // cover?: string;
  profil?: string;
  logo?: string;
  images?: string[];
  color?: string;
  typography?: string;
  price?: number;
  classes?: ClassEntity[];
  members?: UserEntity[];
  // Configuration de la communauté
  settings?: CommunitySettings;
  createdAt?: string;
  updatedAt?: string;
}

// --- ClassEntity ---
export interface ClassEntity {
  id?: any;
  name: string;
  // description?: string;
  cover?: string;
  profil?: string;
  color?: string;
  content?: string; // markdown text
  community?: CommunityEntity;
  chapters?: ChapterEntity[];
  progression?: ProgressionEntity;
  createdAt?: string;
  updatedAt?: string;
}

// --- ChapterEntity ---
export interface ChapterEntity {
  id?: any;
  name: string;
  active: boolean;
  publishedAt?: string; // ISO string
  class?: ClassEntity;
  lessons?: LessonEntity[];
}

// --- LessonEntity ---
export interface LessonEntity {
  id?: number;
  title: string;
  type: "text" | "video";
  publishedAt?: string; // ISO string
  video?: {
    transcribeVideo?: boolean;
    url?: string;
    resourceId?: string;
    muxResourceId?: string;
  };
  document?: {
    url?: string;
    resourceId?: string;
  };
  resources?: string[];
  chapter?: ChapterEntity;

  transcription?: TranscriptionEntity;
  notes?: NoteEntity[];
  progression?: ProgressionEntity;
}
export interface ProgressionEntity {
  progress: number;
  completed: boolean;
  completedAt: string | null;
  lessonsCompleted: number;
  totalLessons: number;
}

// --- NoteEntity ---
export interface NoteEntity {
  id?: number;
  resource?: string;
  content?: string;
  lesson?: LessonEntity;
}

// --- TranscriptionEntity ---
export interface TranscriptionEntity {
  id?: number;
  status: string;
  startedAt?: string;
  endedAt?: string;
  content?: string;
  lesson?: LessonEntity;
}

// --- ChatGroupEntity ---
export interface ChatGroupEntity {
  id?: number;
  name: string;
  description?: string;
  cover?: string;
  color?: string;
  communityId: number;
  unreadCount: number;
  createdAt?: string;
  updatedAt?: string;
}

// --- CoachingEntity ---
export interface CoachingEntity {
  id?: string;
  name: string;
  description?: string;
  link?: string;
  price?: number;
  startAt?: string;
  duration?: number; // minutes
  user?: UserEntity;
  createdAt?: string;
  updatedAt?: string;
}

// --- MessageEntity ---
export interface MessageEntity {
  id?: number;
  content: string;
  chatGroupId: number;
  userId: number;
  replyToId?: number; // ID du message auquel on répond
  likes: number;
  sender: SenderEntity;
  replies?: MessageEntity[]; // Liste des réponses à ce message (pas aux réponses)
  createdAt?: string;
  updatedAt?: string;
}

export interface SenderEntity {
  id: number;
  name: string;
  email: string;
}

// --- ChatEntity ---
export interface ChatEntity {
  id?: number;
  chatGroupId: number;
  messages: number[]; // IDs des messages
  createdAt?: string;
  updatedAt?: string;
}

// --- EventEntity (Coaching) ---
export interface EventEntity {
  id?: number;
  name: string;
  description?: string;
  price?: number;
  paymentType: "monthly" | "one-time";
  date: string; // ISO string
  startTime: string;
  endTime: string;
  timezone: string;
  eventLink?: string;
  type: "private" | "public";
  duration?: string; // Format: "30:00"
  communityId: number;
  coachId: number; // ID du coach qui crée l'événement
  members?: number[]; // IDs des membres participants
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  createdAt?: string;
  updatedAt?: string;
}

// --- ReservationEntity ---
export interface ReservationEntity {
  id?: number;
  eventId: number;
  userId: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt?: string;
  updatedAt?: string;
}

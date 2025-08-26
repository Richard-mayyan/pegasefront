// models.ts

export enum ProfileEnum {
  Standard = "student",
  Coach = "coach",
  Admin = "admin",
}

export interface SubscriptionEntity {
  id: string;
  status: string;
  start_date: number;
  ended_at: number | null;
  trial_start: number | null;
  trial_end: number | null;
}
// --- UserEntity ---
export interface UserEntity {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  profile: ProfileEnum;
  communities?: CommunityEntity[];
  subscriptions?: SubscriptionEntity[];
}

// --- CommunityEntity ---
export interface CommunityEntity {
  id?: any;
  name: string;
  description?: string;
  // cover?: string;
  profil?: string;
  logo?: string;
  coverPhotos?: string[]; // Tableau de photos de couverture (max 5)
  color?: string;
  typography?: string;
  classes?: ClassEntity[];
  members?: UserEntity[];
  // Configuration de la communauté
  settings?: {
    communityDiscussion: boolean;
    studentListVisibility: boolean;
    groupMeeting: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}

// --- ClassEntity ---
export interface ClassEntity {
  id?: any;
  name: string;
  description?: string;
  cover?: string;
  profil?: string;
  color?: string;
  content?: string; // markdown text
  community?: CommunityEntity;
  chapters?: ChapterEntity[];
  createdAt?: string;
  updatedAt?: string;
}

// --- ChapterEntity ---
export interface ChapterEntity {
  id?: number;
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
  type: string;
  publishedAt?: string; // ISO string
  content: object;
  chapter?: ChapterEntity;
  transcription?: TranscriptionEntity;
  notes?: NoteEntity[];
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
  endAt?: string;
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

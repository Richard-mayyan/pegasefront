import { ChapterEntity, ProgressionEntity } from "@/logic/domain/entities";
import { CommunitySettings } from "@/logic/domain/repos/CommunityRepo";

// SignIn DTO
export interface SignInDto {
  email: string;
  password: string;
}

// Register DTO
export interface RegisterDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profile: string;
}

// User DTO
export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// CreateUser DTO
export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profile: string;
}

export interface LessonDto {
  transcribe: boolean;
  title: string;
  type: "video" | "text";
  publishedAt?: string;
  link?: string;
  text?: string;
  muxResourceId?: string;
  video?: File;
  document?: File;
}
// CreateClass DTO
export interface CreateClassDto {
  name: string;
  description?: string;
  cover?: string;
  profil?: string;
  color?: string;
  chapters?: Array<{
    name: string;
    active: boolean;
    publishedAt: string;
    lessons?: Array<LessonDto>;
  }>;
}

// UpdateClass DTO
export interface UpdateClassDto {
  name?: string;
  description?: string;
  cover?: string;
  profil?: string;
  color?: string;
  content?: string;
  chapters?: Array<{
    name: string;
    active: boolean;
    publishedAt: string;
    lessons?: Array<{
      title: string;
      type: string;
      publishedAt: string;
      content: object;
    }>;
  }>;
}

// CreateChapter DTO
export interface CreateChapterDto {
  name: string;
}

// CreateLesson DTO
export interface CreateLessonDto {
  id?: string;
  title: string;
  type: string;
  publishedAt: string;
  content: string;
  chapter: string;
}

// CreateLesson DTO
export interface UpdateLessonDto {
  id?: string;
  title: string;
  type: string;
  publishedAt: string;
  content: string;
  chapter: string;
}

export interface CreateNoteDto {}

export interface UpdateNoteDtop {}

// Community DTOs
export interface CommunityResponseDto {
  studentCount: number;
  id: string;
  name: string;
  description?: string;
  cover?: string;
  profil?: string;
  logo?: string;
  images?: { resourceId: string; url: string }[];
  color?: string;
  typography?: string;
  settings?: CommunitySettings;
  classes?: any[];
  members?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface CommunityListResponseDto {
  data: CommunityResponseDto[];
  total: number;
  page: number;
  limit: number;
}

export interface CommunitySingleResponseDto {
  data: CommunityResponseDto;
}

// Class DTOs
export interface ClassResponseDto {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  profil?: string;
  color?: string;
  chapters?: ChapterEntity[];
  progression?: ProgressionEntity;
  community?: any;
  createdAt: string;
  updatedAt: string;
}

export interface ClassListResponseDto {
  data: ClassResponseDto[];
  total: number;
  page: number;
  limit: number;
}

export interface ClassSingleResponseDto {
  data: ClassResponseDto;
}

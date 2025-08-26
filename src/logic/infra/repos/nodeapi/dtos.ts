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

// CreateClass DTO
export interface CreateClassDto {
  name: string;
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
  id: string;
  name: string;
  description?: string;
  cover?: string;
  profil?: string;
  logo?: string;
  coverPhotos?: string[];
  color?: string;
  typography?: string;
  settings?: {
    communityDiscussion: boolean;
    studentListVisibility: boolean;
    groupMeeting: boolean;
  };
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
  content?: string;
  chapters?: Array<{
    id: string;
    name: string;
    active: boolean;
    publishedAt: string;
    lessons?: Array<{
      id: string;
      title: string;
      type: string;
      publishedAt: string;
      content: object;
    }>;
  }>;
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

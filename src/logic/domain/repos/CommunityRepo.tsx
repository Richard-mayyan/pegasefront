import { CommunityEntity } from "../entities";

export interface CreateCommunityDto {
  name: string;
  trial_days: string;
  price: string;
  description?: string;
  cover?: string;
  profil?: string;
  logo?: string;
  coverPhotos?: string[];
  color?: string;
  typography: string;
  settings?: {
    communityDiscussion: boolean;
    studentListVisibility: boolean;
    groupMeeting: boolean;
  };
}

export interface UpdateCommunityDto {
  name?: string;

  trial_days?: string;
  price?: string;
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
}

export interface ICommunityRepo {
  create(data: CreateCommunityDto): Promise<CommunityEntity>;
  findAll(): Promise<CommunityEntity[]>;
  findOne(id: string): Promise<CommunityEntity>;
  update(id: string, data: UpdateCommunityDto): Promise<CommunityEntity>;
  delete(id: string): Promise<void>;
}

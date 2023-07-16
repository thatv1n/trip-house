import { Lang, Option, UserEntity, UserSex } from '@/types';

export interface ProfileEntity {
  isISubscribed: Option<boolean>;
  isTargetSubscribed: Option<boolean>;
  user: UserEntity;
  subscriptions: number;
  subscribers: number;
  events: number;
  photos: number;
}

export interface ProfileState {
  profile: Option<ProfileEntity>;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  sex: UserSex;
  age: Date;
  city: string;
  description: string;
  lang: Lang;
}

export interface ProfileSettingsPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  sex?: UserSex;
  age?: Date;
  city?: string;
  description?: string;
  avatar?: File;
  lang?: Lang;
  interestIds?: string[];
}

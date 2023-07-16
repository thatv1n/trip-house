import { BasicModel, Lang, Option } from '@/types';

export interface ConfirmSmsPayload {
  id: string;
  code: string;
}

export interface RegisterPayload {
  id: string;
  login: string;
}

export interface UserEntity extends BasicModel {
  firstName: any;
  lastName: any;
  phoneNumber: string;
  login: string;
  email: Option<string>;
  sex: string;
  lang: Lang;
}

export interface SessionEntity extends BasicModel {
  ip: string;
  city: string;
  country: string;
}

export interface AuthSmsEntity extends BasicModel {
  phoneNumber: string;
  geoIp: Option<LatLong>;
  code: string; // TODO (luchko): remove after release.
}

export interface LoginPayload {
  user: UserEntity;
  session: SessionEntity;
}

export interface ConfirmSmsResponse {
  id: string;
  stepType: 'login' | 'register';
  user: UserEntity | null;
  session: SessionEntity | null;
}

export interface ProfileResponse {
  user: UserEntity;
  session: SessionEntity;
}

export interface UserOldSession {
  id: string;
  login: string;
  fullName: string;
  phoneNumber: string;
  avatarUrl: string;
}

export interface LatLong {
  lat: number;
  lon: number;
  country: string;
}

export interface AuthState {
  user: Option<UserEntity>;
  session: Option<SessionEntity>;
  isLogedin: boolean;
  auth: Option<AuthSmsEntity>;
  geoIp: Option<LatLong>;
}

export interface IpResponse {
  country_name: string;
  latitude: number;
  longitude: number;
}

import { GetCountriesApi } from '@/components/header/header.api';
import { AuthApi, ChatApi, GetEventsApi, InterestApi, InterestState, InviteEventApi, InviteEventState } from '@/features';
import { AuthState } from '@/features/auth/auth.types';
import { ProfileState } from '@/features/profile/profile.types';
import { ProfileApi } from '@/features/profile/profileNew.api';
import { BrowserHistory } from 'history';
import { Epic as EpicRo } from 'redux-observable';
import { Action } from 'typescript-fsa';
import { AuthAdminApi } from '../admin/adminAuth/auth-admin.api';
import { EventsFilterApi } from '../components/eventsFilter';

export type RouteVocabularyName =
  | 'report-daily'
  | 'report-monthly'
  | 'report-detail'
  | 'report-sum-of-materials'
  | 'vocabulary'
  | 'counterparty'
  | 'cargo'
  | 'warehouse'
  | 'car'
  | 'carrier'
  | 'consignee'
  | 'consignor'
  | 'setting-com-port'
  | 'setting-data-source'
  | 'setting-data-owner'
  | 'setting-used-field-of-data'
  | 'setting-video-register'
  | 'setting-dumping'
  | 'setting-users';
export type RouteName = 'root' | 'videoPlayer' | 'report' | 'setting' | 'vocabulary' | RouteVocabularyName;

export interface RouteConf {
  path: string;
  name: RouteName;
  title?: string;
  children?: RouteConf[];
  icon?: JSX.Element;
}

export type NormalizedRoutes = {
  [key in RouteName]: RouteConf & { parent: RouteConf | null };
};

export interface BasicModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type Option<T> = T | null;

export interface ResponseError {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface RoDependencies {
  authApi: AuthApi;
  authAdminApi: AuthAdminApi;
  getEventsApi: GetEventsApi;
  menuShortEventsApi: EventsFilterApi;
  chatApi: ChatApi;
  profileApi: ProfileApi;
  interestApi: InterestApi;
  inviteEventApi: InviteEventApi;
  getCountriesApi: GetCountriesApi;
  history: BrowserHistory;
}

export interface RootState {
  auth: AuthState;
  profile: ProfileState;
  interest: InterestState;
  inviteEvents: InviteEventState;
}

export type Epic<Input extends Action<any> = any, Output extends Input = Input> = EpicRo<
  Input,
  Output,
  RootState,
  RoDependencies
>;

export type Lang = 'en' | 'ru-RU' | 'lv-LV' | 'de-DE';

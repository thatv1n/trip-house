import { LatLong, SessionEntity, UserEntity } from '@/features/auth/auth.types';
import { Option } from '@/types';

export interface LoginAdminPayload {
  login: string;
  password: string;
}

export interface LoginAdminPayload {
  user: UserEntity;
  session: SessionEntity;
  isLoginAdmin: Option<boolean>;
}

export interface AuthAdminState {
  user: Option<UserEntity>;
  session: Option<SessionEntity>;
  isLoginA: boolean;
  geoIp: Option<LatLong>;
}

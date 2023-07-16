import { LoginAdminPayload } from '@/admin/adminAuth/auth-admin.types';
import { CoreApi } from '@/api';
import { Observable } from 'rxjs';
import {
  AuthSmsEntity,
  ConfirmSmsPayload,
  ConfirmSmsResponse,
  IpResponse,
  ProfileResponse,
  RegisterPayload
} from './auth.types';

export class AuthApi extends CoreApi {
  sendSms(phoneNumber: string): Observable<AuthSmsEntity> {
    return this.post('/auth/get-sms', { phoneNumber });
  }

  confirmSms(body: ConfirmSmsPayload): Observable<ConfirmSmsResponse> {
    return this.post('/auth/login', body);
  }

  register(body: RegisterPayload): Observable<ConfirmSmsResponse> {
    return this.post('/auth/register', body);
  }

  profile(): Observable<ProfileResponse> {
    return this.get('/auth/profile');
  }

  logout(): Observable<boolean> {
    return this.put('/auth/logout');
  }

  getAuth(phoneNumber: string): Observable<AuthSmsEntity> {
    return this.get(`/auth/sms/${phoneNumber}`);
  }

  getGeo(): Promise<IpResponse> {
    return fetch(`https://api.ipdata.co/?api-key=e8557b4df3008a13a94f4e796a1fa39d33ba5c2b215525218789c3ab&fields=ip,country_name,latitude,longitude&lang=ru`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }

  authAdmin(body: LoginAdminPayload): Observable<ProfileResponse> {
    return this.post('/auth/login-admin', body);
  }

  profileAdmin(): Observable<ProfileResponse> {
    return this.get('/auth/profile-admin');
  }

  logoutAdmin(): Observable<boolean> {
    return this.put('/auth/logout-admin');
  }
}

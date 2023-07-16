import { LoginAdminPayload } from '@/admin/adminAuth/auth-admin.types';
import { CoreApi } from '@/api';
import { IpResponse, ProfileResponse } from '@/features/auth/auth.types';
import { Observable } from 'rxjs';

export class AuthAdminApi extends CoreApi {
  authAdmin(body: LoginAdminPayload): Observable<ProfileResponse> {
    return this.post('/auth/login-admin', body);
  }

  profileAdmin(): Observable<ProfileResponse> {
    return this.get('/auth/profile-admin');
  }

  logoutAdmin(): Observable<boolean> {
    return this.put('/auth/logout-admin');
  }

  getGeo(): Promise<IpResponse> {
    return fetch(`http://ip-api.com/json/?fields=status,message,country,lat,lon&lang=ru`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }
}

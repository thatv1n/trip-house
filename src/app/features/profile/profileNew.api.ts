import { CoreApi } from '@/api';
import { UserEntity } from '@/types';
import { Observable } from 'rxjs';
import { ProfileEntity, ProfileSettingsPayload } from './profile.types';

export class ProfileApi extends CoreApi {
  getMyProfile(): Observable<ProfileEntity> {
    return this.get('/profile');
  }

  getProfileById(userId: string): Observable<ProfileEntity> {
    return this.get(`/profile/${userId}`);
  }

  updateUser(data: ProfileSettingsPayload): Observable<UserEntity> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      console.log('key: %o; value: %o', key, value);
      if (key === 'interestIds') {
        formData.set('interestIds', JSON.stringify(value));
        return;
      }
      if (key === 'avatar') {
        formData.set('avatar[]', value);
        return;
      }
      formData.set(key, value.toString());
    });
    return this.putFiles('/user', formData);
  }
}

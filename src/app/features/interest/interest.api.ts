import { CoreApi } from '@/api';
import { InterestEntity } from '@/types';
import { Observable } from 'rxjs';

export class InterestApi extends CoreApi {
  getList(): Observable<InterestEntity[]> {
    return this.get('/interest');
  }
}

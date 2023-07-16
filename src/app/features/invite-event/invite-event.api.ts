import { CoreApi } from '@/api';
import { Observable } from 'rxjs';
import { InviteEventEntity, UpdateInviteEventStatusPayload } from './invite-event.types';

export class InviteEventApi extends CoreApi {
  invite(body: any): Observable<InviteEventEntity> {
    return this.post('/event/invite', body);
  }

  updateStatus(body: UpdateInviteEventStatusPayload): Observable<InviteEventEntity> {
    return this.put('/event/invite', body);
  }

  getByTarget(targetUserId: string): Observable<InviteEventEntity[]> {
    return this.get(`/event/invite/${targetUserId}`);
  }
}

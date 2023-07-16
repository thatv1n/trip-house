import { BasicModel, UserEntity } from '@/types';
import { EventResponse } from '../aboutEvent/event.types';

export enum InviteEventStatus {
  REQUESTED = 'requested',
  ACCEPT = 'accepted',
  REJECT = 'rejected',
}

export interface InviteEventEntity extends BasicModel {
  sender: UserEntity;
  target: UserEntity;
  status: InviteEventStatus;
  event: EventResponse;
}

export interface InviteEventState {
  invites: Record<string, InviteEventEntity>;
  idsByTarget: Record<string, string[]>;
}

export interface InviteEventPayload {
  targetUserId: string;
  eventId: string;
}

export interface UpdateInviteEventStatusPayload {
  id: string;
  status: InviteEventStatus;
}

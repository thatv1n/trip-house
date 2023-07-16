import actionCreatorFactory from 'typescript-fsa';
import { InviteEventEntity, InviteEventPayload, UpdateInviteEventStatusPayload } from './invite-event.types';

const actionCreator = actionCreatorFactory('[INVITE_EVENT]');

export const inviteEventAction = actionCreator.async<InviteEventPayload, InviteEventEntity>('INVITE');
export const updateStatusInviteEventAction = actionCreator.async<UpdateInviteEventStatusPayload, InviteEventEntity>(
  'UPDATE_STATUS',
);
export const getByTargetInviteEventAction = actionCreator.async<string, InviteEventEntity[]>('GET_BY_TARGET');

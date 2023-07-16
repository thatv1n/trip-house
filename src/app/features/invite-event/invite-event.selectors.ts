import { compose, filter, last, map, propEq } from 'ramda';
import { createSelector } from 'reselect';
import { InviteEventEntity, InviteEventState, InviteEventStatus } from './invite-event.types';

const inviteEventSelector = <T extends { inviteEvent: InviteEventState }>(state: T) => state.inviteEvent;

export const getByIdInviteEventSelector = createSelector(
  [inviteEventSelector, (_, id) => id],
  (state, id) => state.invites[id],
);

export const getLastInviteByTargetSelector = createSelector(
  [inviteEventSelector, (_, id) => id],
  (state, targetUserId) => {
    if (state.idsByTarget[targetUserId]) {
      return compose<[string[]], InviteEventEntity[], InviteEventEntity[], InviteEventEntity>(
        last,
        filter(propEq('status', InviteEventStatus.REQUESTED)),
        map((id) => state.invites[id]),
      )(state.idsByTarget[targetUserId]);
    }
    return undefined;
  },
);

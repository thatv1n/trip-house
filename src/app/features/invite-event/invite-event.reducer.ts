import { assocPath, compose, indexBy, lensProp, map, mergeLeft, over, prop } from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { getByTargetInviteEventAction, updateStatusInviteEventAction } from './invite-event.actions';
import { InviteEventState } from './invite-event.types';

const initialState: InviteEventState = {
  invites: {},
  idsByTarget: {},
};

export const inviteEventReducer = reducerWithInitialState(initialState)
  .case(getByTargetInviteEventAction.done, (state, { result, params }) =>
    compose<[InviteEventState], InviteEventState, InviteEventState>(
      assocPath(['idsByTarget', params], map(prop('id'), result)),
      over(lensProp('invites'), mergeLeft(indexBy(prop('id'), result))),
    )(state),
  )
  .case(updateStatusInviteEventAction.done, (state, { result }) => assocPath(['invites', result.id], result, state));

import * as R from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { getByUserIdProfileAction, getMeProfileAction, updateUserProfileAction } from './profile.actions';
import { ProfileState } from './profile.types';

const initialState: ProfileState = {
  profile: null,
};

export const profileReducer = reducerWithInitialState(initialState)
  .case(updateUserProfileAction.done, (state, { result }) => R.assocPath(['profile', 'user'], result, state))
  .case(getByUserIdProfileAction.done, (state, { result }) => R.assoc('profile', result, state))
  .case(getMeProfileAction.done, (state, { result }) => R.assoc('profile', result, state));

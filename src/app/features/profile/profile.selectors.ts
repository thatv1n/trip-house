import * as R from 'ramda';
import { createSelector } from 'reselect';
import { ProfileState } from './profile.types';

export const profileStateSelector = <T extends { profile: ProfileState }>({ profile }: T) => profile;

export const getProfileSelector = createSelector([profileStateSelector], R.prop('profile'));

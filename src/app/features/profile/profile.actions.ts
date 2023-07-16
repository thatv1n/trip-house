import { UserEntity } from '@/types';
import actionCreatorFactory from 'typescript-fsa';
import { ProfileEntity, ProfileSettingsPayload } from './profile.types';

const actionCreator = actionCreatorFactory('[PROFILE]');

export const getByUserIdProfileAction = actionCreator.async<string, ProfileEntity>('GET_BY_USER_ID');
export const getMeProfileAction = actionCreator.async<void, ProfileEntity>('GET_ME');
export const updateUserProfileAction = actionCreator.async<ProfileSettingsPayload, UserEntity>('UPDATE_USER');

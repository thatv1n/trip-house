import { Epic } from '@/types';
import { createAsyncSingleLoadingEpic } from '@ro-loading';
import { ofAsyncAction } from '@tsfsa-ro';
import { combineEpics } from 'redux-observable';
import { catchError, mergeMap, of } from 'rxjs';
import { getByUserIdProfileAction, getMeProfileAction, updateUserProfileAction } from './profile.actions';

const getMeProfileEpic: Epic = (action$, _, { profileApi }) =>
  action$.pipe(
    ofAsyncAction(getMeProfileAction),
    mergeMap(({ done, failed }) => {
      return profileApi.getMyProfile().pipe(
        mergeMap((profile) => of(done(profile))),
        catchError((error) => {
          console.log('[getMeProfileEpic] -> getMyProfile error: %o', error);
          return of(failed(error));
        }),
      );
    }),
  );

const getByUserIdProfileEpic: Epic = (action$, _, { profileApi }) =>
  action$.pipe(
    ofAsyncAction(getByUserIdProfileAction),
    mergeMap(({ payload, done, failed }) => {
      return profileApi.getProfileById(payload).pipe(
        mergeMap((profile) => of(done(profile))),
        catchError((error) => {
          console.log('[getByUserIdProfileEpic] -> getProfileById error: %o', error);
          return of(failed(error));
        }),
      );
    }),
  );

const updateUserProfileEpic: Epic = (action$, _, { profileApi, history }) =>
  action$.pipe(
    ofAsyncAction(updateUserProfileAction),
    mergeMap(({ payload, meta, done, failed }) => {
      return profileApi.updateUser(payload).pipe(
        mergeMap((user) => {
          if (meta?.navigate) {
            history.push(meta.navigate);
          }
          return of(done(user));
        }),
        catchError((error) => {
          console.log('[updateUserProfileEpic] -> updateUser error: %o', error);
          return of(failed(error));
        }),
      );
    }),
  );

const getMeLoadingProfileEpic = createAsyncSingleLoadingEpic(getMeProfileAction, 'meProfile');
const getByUserIdLoadingProfileEpic = createAsyncSingleLoadingEpic(getByUserIdProfileAction, 'byUserIdProfile');
const updateUserLoadingProfileEpic = createAsyncSingleLoadingEpic(updateUserProfileAction, 'updateUser');

export const profileEpic = combineEpics(
  getMeProfileEpic,
  getByUserIdProfileEpic,
  updateUserProfileEpic,
  getMeLoadingProfileEpic,
  getByUserIdLoadingProfileEpic,
  updateUserLoadingProfileEpic,
);

import { Epic, ResponseError } from '@/types';
import { createAsyncSingleLoadingEpic } from '@ro-loading';
import { ofAsyncAction } from '@tsfsa-ro';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, from, mergeMap, of } from 'rxjs';

import {
  getIpAdminAction,
  loginAdminAction,
  logoutAdminAction,
  profileAuthAdminAction,
} from '@/admin/adminAuth/auth-admin.action';

export const loginAdmin: Epic = (action$, _, { authAdminApi }) =>
  action$.pipe(
    ofAsyncAction(loginAdminAction),
    mergeMap(({ payload, done, failed }) => {
      return authAdminApi.authAdmin(payload).pipe(
        mergeMap(({ user, session }) => {
          return of(done({ user, session }));
        }),
        catchError((err) => {
          console.log('error: %o', err);
          return of(failed(err));
        }),
      );
    }),
  );

export const profileAdminEpic: Epic = (action$, _, { authAdminApi }) =>
  action$.pipe(
    ofAsyncAction(profileAuthAdminAction),
    mergeMap(({ done, failed }) => {
      return authAdminApi.profileAdmin().pipe(
        mergeMap((profile) => {
          console.log('profile: %o', profile);
          return of(done(profile));
        }),
        catchError((err) => of(failed(err))),
      );
    }),
  );

export const logoutAdminEpic: Epic = (action$, _, { authAdminApi }) =>
  action$.pipe(
    ofAsyncAction(logoutAdminAction),
    mergeMap(({ done, failed }) => {
      return authAdminApi.logoutAdmin().pipe(
        mergeMap((res) => {
          if (res) {
            return of(done());
          }
          return of();
        }),
        catchError((err) => of(failed(err))),
      );
    }),
  );

export const getGeoLonLatAdmin: Epic = (action$, _, { authAdminApi }) =>
  action$.pipe(
    ofAsyncAction(getIpAdminAction),
    mergeMap(({ payload, done, failed }) =>
      from(authAdminApi.getGeo(payload)).pipe(
        mergeMap((geo) => {
          console.log('geo: %o', geo);
          return of(done(geo));
        }),
        catchError((err) => of(failed(err))),
      ),
    ),
  );

export const errorHandleEpic: Epic = (action$) =>
  action$.pipe(
    ofType(loginAdminAction.failed.type, logoutAdminAction.failed.type),
    mergeMap((err: ResponseError) => {
      if (err) {
        alert(JSON.stringify(err, null, 2));
      }
      return of();
    }),
  );

const profileAdminLoadingEpic = createAsyncSingleLoadingEpic(profileAuthAdminAction, 'profileAdmin');

export const authAdminEpics = combineEpics(
  profileAdminLoadingEpic,
  errorHandleEpic,
  loginAdmin,
  profileAdminEpic,
  logoutAdminEpic,
  getGeoLonLatAdmin,
);

import * as R from 'ramda';
import { Success } from 'typescript-fsa';

import { Epic, ResponseError } from '@/types';
import { getUserOldSessions, setUserOldSessions } from '@/utils';
import { createAsyncSingleLoadingEpic } from '@ro-loading';
import { ofActions, ofAsyncAction } from '@tsfsa-ro';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import {
  confirmSmsAuthAction,
  getAuthAction,
  getIpAction,
  loginAuthAction,
  logoutAuthAction,
  profileAuthAction,
  registerAuthAction,
  sendSmsAuthAction
} from './auth.actions';
import { getAuthSelector } from './auth.selectors';
import { LoginPayload } from './auth.types';

import avatarUrl from '#/img/empty-avatar.png';

export const sendSmsEpic: Epic = (action$, _, { authApi, history }) =>
  action$.pipe(
    ofAsyncAction(sendSmsAuthAction),
    mergeMap(({ payload, done, failed }) => {
      return authApi.sendSms(payload).pipe(
        mergeMap((auth) => {
          console.log('response data: %o', auth);
          history.push(`/auth/confirm-sms/${auth.id}`);
          return of(done(auth));
        }),
        catchError((err) => {
          console.log('error: %o', err);
          return of(failed(err));
        }),
      );
    }),
  );

export const configmSmsEpic: Epic = (action$, _, { authApi, history }) =>
  action$.pipe(
    ofAsyncAction(confirmSmsAuthAction),
    mergeMap(({ payload, done, failed }) => {
      return authApi.confirmSms(payload).pipe(
        mergeMap(({ stepType, id, user, session }) => {
          if (stepType === 'register') {
            history.push(`/auth/register/${id}`);
          }
          if (stepType === 'login' && user !== null && session !== null) {
            return of(done({ user, session }));
          }
          return of();
        }),
        catchError((err) => of(failed(err))),
      );
    }),
  );

export const getAuthEpic: Epic = (action$, store$, { authApi }) =>
  action$.pipe(
    ofAsyncAction(getAuthAction),
    mergeMap(({ payload, done, failed }) => {
      const auth = getAuthSelector(store$.value as any);
      // if (auth && auth.id === payload) {
      //   return of();
      // }
      return authApi.getAuth(payload).pipe(
        mergeMap((result) => of(done(result))),
        catchError((err) => of(failed(err))),
      );
    }),
  );

export const registerEpic: Epic = (action$, _, { authApi, history }) =>
  action$.pipe(
    ofAsyncAction(registerAuthAction),
    mergeMap(({ payload, done, failed }) => {
      return authApi.register(payload).pipe(
        mergeMap(({ stepType, id, user, session }) => {
          if (stepType === 'register') {
            history.push(`/auth/register/${id}`);
          }
          if (stepType === 'login' && user !== null && session !== null) {
            return of(done({ user, session }));
          }
          return of();
        }),
        catchError((err) => {
          console.log('register err: %o', err);
          return of(failed(err));
        }),
      );
    }),
  );

export const loginEpic: Epic = (action$) =>
  action$.pipe(
    ofActions<Success<any, LoginPayload>>(confirmSmsAuthAction.done, registerAuthAction.done),
    map(({ result }) => {
      const users = getUserOldSessions();
      const user = users.find((item: any) => item.phoneNumber === result.user.phoneNumber);
      console.log(result.user);
      if (!user) {
        const newUser = {
          id: result.user.id,
          avatarUrl,
          fullName: '',
          phoneNumber: result.user.phoneNumber,
          login: `${result.user.firstName} ${result.user.lastName}`,
        };
        if (result.user.firstName && result.user.lastName) setUserOldSessions(R.append(newUser, users));
      }
      return loginAuthAction(result);
    }),
  );

export const logoutEpic: Epic = (action$, _, { authApi, history }) =>
  action$.pipe(
    ofAsyncAction(logoutAuthAction),
    mergeMap(({ done, failed }) => {
      return authApi.logout().pipe(
        mergeMap((res) => {
          if (res) {
            history.push('/auth');
            return of(done());
          }
          return of();
        }),
        catchError((err) => of(failed(err))),
      );
    }),
  );

const getProfileAuthEpic: Epic = (action$, _, { authApi }) =>
  action$.pipe(
    ofAsyncAction(profileAuthAction),
    mergeMap(({ done, failed }) => {
      return authApi.profile().pipe(
        mergeMap((profile) => {
          return of(done(profile));
        }),
        catchError((err) => of(failed(err))),
      );
    }),
  );

export const getGeoLonLat: Epic = (action$, _, { authApi }) =>
  action$.pipe(
    ofAsyncAction(getIpAction),
    mergeMap(({ done, failed }) =>
      from(authApi.getGeo()).pipe(
        mergeMap((geo) => {
          const obj = { country: geo.country_name, lat: geo.latitude, lon: geo.longitude }
          return of(done(obj));
        }),
        catchError((err) => of(failed(err))),
      ),
    ),
  );

export const errorHandleEpic: Epic = (action$) =>
  action$.pipe(
    ofType(
      // profileAuthAction.failed.type,
      sendSmsAuthAction.failed.type,
      confirmSmsAuthAction.failed.type,
      registerAuthAction.failed.type,
      getAuthAction.failed.type,
    ),
    mergeMap((err: ResponseError) => {
      if (err) {
        alert(JSON.stringify(err, null, 2));
      }
      return of();
    }),
  );

const confirmSmsLoadingEpic = createAsyncSingleLoadingEpic(confirmSmsAuthAction, 'confirmSms');
const registerLoadingEpic = createAsyncSingleLoadingEpic(confirmSmsAuthAction, 'register');
const profileLoadingEpic = createAsyncSingleLoadingEpic(profileAuthAction, 'profile');

export const authEpics = combineEpics(
  sendSmsEpic,
  configmSmsEpic,
  getAuthEpic,
  registerEpic,
  loginEpic,
  logoutEpic,
  getProfileAuthEpic,
  confirmSmsLoadingEpic,
  registerLoadingEpic,
  profileLoadingEpic,
  errorHandleEpic,
  getGeoLonLat,
);

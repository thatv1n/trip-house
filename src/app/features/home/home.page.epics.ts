import { Epic } from '@/types';
import { ofAsyncAction } from '@tsfsa-ro';
import { combineEpics } from 'redux-observable';
import { catchError, mergeMap, of } from 'rxjs';
import { getEventsAction, paginationEventsAction } from './home.page.action';

export const GetEvents: Epic = (action$, _, { getEventsApi }) =>
  action$.pipe(
    ofAsyncAction(getEventsAction),
    mergeMap(({ payload, done, failed }) => {
      return getEventsApi.getEvents(payload).pipe(
        mergeMap((dataEvents) => {
          return of(done(dataEvents));
        }),
        catchError((err) => {
          console.log('error: %o', err);
          return of(failed(err));
        }),
      );
    }),
  );

export const paginationEvents: Epic = (action$, _, { getEventsApi }) =>
  action$.pipe(
    ofAsyncAction(paginationEventsAction),
    mergeMap(({ payload, done, failed }) => {
      return getEventsApi.getEvents(payload).pipe(
        mergeMap((dataEvents) => {
          return of(done(dataEvents));
        }),
        catchError((err) => {
          console.log('error: %o', err);
          return of(failed(err));
        }),
      );
    }),
  );

export const GetEventsEpic = combineEpics(GetEvents, paginationEvents);

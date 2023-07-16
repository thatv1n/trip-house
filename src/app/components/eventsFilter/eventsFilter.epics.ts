import { Epic } from '@/types';
import { ofAsyncAction } from '@tsfsa-ro';
import { combineEpics } from 'redux-observable';
import { catchError, mergeMap, of } from 'rxjs';
import { getCategoryAction, getCitiesAction } from './eventsFilter.action';

export const getCategory: Epic = (action$, _, { menuShortEventsApi }) =>
  action$.pipe(
    ofAsyncAction(getCategoryAction),
    mergeMap(({ done, failed }) => {
      return menuShortEventsApi.getCategories().pipe(
        mergeMap((dataCategory) => {
          return of(done(dataCategory));
        }),
        catchError((err) => {
          return of(failed(err));
        }),
      );
    }),
  );

export const getCities: Epic = (action$, _, { menuShortEventsApi }) =>
  action$.pipe(
    ofAsyncAction(getCitiesAction),
    mergeMap(({ payload, done, failed }) => {
      return menuShortEventsApi.getCities(payload).pipe(
        mergeMap((dataCities) => {
          return of(done(dataCities));
        }),
        catchError((err) => {
          return of(failed(err));
        }),
      );
    }),
  );

export const EventsFilterEpic = combineEpics(getCategory, getCities);

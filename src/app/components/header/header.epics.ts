import { Epic } from '@/types';
import { ofAsyncAction } from '@tsfsa-ro';
import { combineEpics } from 'redux-observable';
import { catchError, mergeMap, of } from 'rxjs';
import { getCountriesAction } from './header.actions';

export const GetCountries: Epic = (action$, _, { getCountriesApi }) =>
  action$.pipe(
    ofAsyncAction(getCountriesAction),
    mergeMap(({ done, failed }) => {
      return getCountriesApi.getCountries().pipe(
        mergeMap((data) => {
          return of(done(data));
        }),
        catchError((err) => {
          console.log('error: %o', err);
          return of(failed(err));
        }),
      );
    }),
  );

export const GetCountriesEpic = combineEpics(GetCountries);

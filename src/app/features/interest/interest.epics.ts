import { Epic } from '@/types';
import { createAsyncSingleLoadingEpic } from '@ro-loading';
import { ofAsyncAction } from '@tsfsa-ro';
import { combineEpics } from 'redux-observable';
import { catchError, map, mergeMap, of } from 'rxjs';
import { getInterestAction } from './interest.actions';

const getInterestEpic: Epic = (action$, _, { interestApi }) =>
  action$.pipe(
    ofAsyncAction(getInterestAction),
    mergeMap(({ done, failed }) => {
      return interestApi.getList().pipe(
        map((interests) => done(interests)),
        catchError((error) => {
          console.log('[getInterestEpic] -> getList error: %o', error);
          return of(failed(error));
        }),
      );
    }),
  );

const getInterestLoadingEpic = createAsyncSingleLoadingEpic(getInterestAction, 'getInterests');

export const interestEpic = combineEpics(getInterestEpic, getInterestLoadingEpic);

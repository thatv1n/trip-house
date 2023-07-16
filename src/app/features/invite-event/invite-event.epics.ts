import { Epic } from '@/types';
import { ofAsyncAction } from '@tsfsa-ro';
import { combineEpics } from 'redux-observable';
import { catchError, mergeMap, of } from 'rxjs';
import { getByTargetInviteEventAction, inviteEventAction, updateStatusInviteEventAction } from './invite-event.actions';

const getByTargetInviteEventEpic: Epic = (action$, _, { inviteEventApi }) =>
  action$.pipe(
    ofAsyncAction(getByTargetInviteEventAction),
    mergeMap(({ payload, done, failed }) => {
      return inviteEventApi.getByTarget(payload).pipe(
        mergeMap((inviteEvents) => of(done(inviteEvents))),
        catchError((error) => {
          console.log('[getByTargetInviteEventEpic] -> error: %o', error);
          return of(failed(error));
        }),
      );
    }),
  );

const inviteEventRequestEpic: Epic = (action$, _, { inviteEventApi }) =>
  action$.pipe(
    ofAsyncAction(inviteEventAction),
    mergeMap(({ payload, done, failed }) => {
      return inviteEventApi.invite(payload).pipe(
        mergeMap((inviteEvent) => of(done(inviteEvent))),
        catchError((error) => {
          console.log('[inviteEventRequestEpic] -> error: %o', error);
          return of(failed(error));
        }),
      );
    }),
  );

const updateStatusInviteEventEpic: Epic = (action$, _, { inviteEventApi }) =>
  action$.pipe(
    ofAsyncAction(updateStatusInviteEventAction),
    mergeMap(({ payload, done, failed }) => {
      return inviteEventApi.updateStatus(payload).pipe(
        mergeMap((inviteEvent) => of(done(inviteEvent))),
        catchError((error) => {
          console.log('[updateStatusInviteEventEpic] -> error: %o', error);
          return of(failed(error));
        }),
      );
    }),
  );

export const inviteEventEpic = combineEpics(
  getByTargetInviteEventEpic,
  inviteEventRequestEpic,
  updateStatusInviteEventEpic,
);

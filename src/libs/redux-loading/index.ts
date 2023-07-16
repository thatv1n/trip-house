import { ofAction } from '@tsfsa-ro';
import * as R from 'ramda';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { createSelector } from 'reselect';
import { map } from 'rxjs';
import actionCreatorFactory, { ActionCreator, AsyncActionCreators } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

const actionCreator = actionCreatorFactory('[LOADING]');

enum LoadingActionsConst {
  setSingle = 'SET_SINGLE',
}

interface SetSingleAction {
  value?: boolean;
  key: string;
}

export const setSingleLoadingAction = actionCreator<SetSingleAction>(LoadingActionsConst.setSingle);

export interface LoadingState {
  single: Record<string, boolean>;
}

interface LoadingInRootState {
  loading: LoadingState;
}

const initialState: LoadingState = {
  single: {},
};

export const loadingReducer = reducerWithInitialState(initialState).case(
  setSingleLoadingAction,
  (state, { key, value }) => R.assocPath(['single', key], value ?? !state.single[key], state),
);

const loadingSelector = <T extends LoadingInRootState>(state: T): LoadingState => state.loading;

export const getSingleLoadingSelector = createSelector(
  [loadingSelector, (_, key: string) => key],
  ({ single }, key) => single[key] ?? false,
);

export function createAsyncSingleLoadingEpic<Key extends string>(
  asyncActionCreator: AsyncActionCreators<any, any, any>,
  key: Key,
): Epic<any, any, any, any> {
  const startEpic: Epic = (action$) =>
    action$.pipe(
      ofAction(asyncActionCreator.started),
      map(() => setSingleLoadingAction({ key, value: true })),
    );

  const finishEpic: Epic = (action$) =>
    action$.pipe(
      ofType(asyncActionCreator.done.type, asyncActionCreator.failed.type),
      map(() => setSingleLoadingAction({ key, value: false })),
    );

  return combineEpics(startEpic, finishEpic);
}

export function createSingleLoadingEpic<Key extends string>(
  _actionCreator: ActionCreator<any>,
  key: Key,
  value: boolean,
): Epic {
  return (action$) =>
    action$.pipe(
      ofAction(_actionCreator),
      map(() => setSingleLoadingAction({ key, value })),
    );
}

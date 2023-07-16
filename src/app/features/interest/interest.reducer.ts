import * as R from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { getInterestAction } from './interest.actions';
import { InterestState } from './interest.types';

const initialState: InterestState = {
  interests: {},
  interestIds: [],
};

export const interestReducer = reducerWithInitialState(initialState).case(getInterestAction.done, (state, { result }) =>
  R.compose<[InterestState], InterestState, InterestState>(
    R.assoc('interests', R.indexBy(R.prop('id'), result)),
    R.assoc('interestIds', R.map(R.prop('id'), result)),
  )(state),
);

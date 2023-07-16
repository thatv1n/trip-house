import { getSingleLoadingSelector } from '@ro-loading';
import { createSelector } from 'reselect';
import { InterestState } from './interest.types';

export const interestStateSelector = <T extends { interest: InterestState }>({ interest }: T): InterestState =>
  interest;

export const getListInterestSelector = createSelector([interestStateSelector], ({ interests, interestIds }) =>
  interestIds.map((id) => interests[id]),
);

export const isLoadingInterestSelector = (state: any): boolean => getSingleLoadingSelector(state, 'getInterests');

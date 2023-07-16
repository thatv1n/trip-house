import { InterestEntity } from '@/types';
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('[INTEREST]');

export const getInterestAction = actionCreator.async<void, InterestEntity[]>('GET');

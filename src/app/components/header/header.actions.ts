import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('[COUNTRIES]');

export const getCountriesAction = actionCreator.async<void, string[]>('GET_COUNTRIES');

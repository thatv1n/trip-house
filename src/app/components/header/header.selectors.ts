import { createSelector } from 'reselect';
import { CountryReducer } from './header.types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const countriesSelector = <T extends { countries: CountryReducer }>(state: T) => state.countries;

export const getCountriesSelector = createSelector(countriesSelector, ({ countries }) => countries);

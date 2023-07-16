import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { getCountriesAction } from './header.actions';
import { CountryReducer } from './header.types';

const initialState: CountryReducer = {
  countries: [],
};

export const countriesReducer = reducerWithInitialState(initialState).case(
  getCountriesAction.done,
  (state, { result }) => ({
    ...state,
    countries: result,
  }),
);

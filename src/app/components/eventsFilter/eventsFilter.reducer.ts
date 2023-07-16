import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { getCategoryAction, getCitiesAction } from './eventsFilter.action';
import { menuShortEvents } from './eventsFilter.types';

const initialState: menuShortEvents = {
  categories: [],
  cities: [],
};

export const EventsFilterReducer = reducerWithInitialState(initialState)
  .case(getCategoryAction.done, (state, { result }) => ({
    ...state,
    categories: result,
  }))
  .case(getCitiesAction.done, (state, { result }) => ({
    ...state,
    cities: [...result],
  }));

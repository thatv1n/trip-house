import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { getEventsAction, paginationEventsAction } from './home.page.action';
import { EventsReducer } from './home.page.types';

const initialState: EventsReducer = {
  all: [],
  isLoading: true,
};

export const eventsReducer = reducerWithInitialState(initialState)
  .case(getEventsAction.done, (state, { result }) => ({
    ...state,
    all: result,
    isLoading: false,
  }))
  .case(paginationEventsAction.done, (state, { result }) => ({
    ...state,
    all: [...state.all, ...result],
  }));

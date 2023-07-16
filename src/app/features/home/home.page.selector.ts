import { createSelector } from 'reselect';
import { EventsState } from './home.page.types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const eventsSelector = <T extends { events: EventsState }>(state: T) => state.events;

export const getEventsSelector = createSelector(eventsSelector, ({ all }) => all);

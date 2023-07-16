import { createSelector } from 'reselect';
import { menuShortEvents } from './eventsFilter.types';

export const menuShortSelector = <T extends { menuShortEvents: menuShortEvents }>(state: T) => state.menuShortEvents;

export const getCitiesSelector = createSelector(menuShortSelector, ({ cities }) => cities);

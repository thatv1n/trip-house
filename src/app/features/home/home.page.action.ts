import { FilterType } from '@/components/eventsFilter/eventsFilter.types';
import actionCreatorFactory from 'typescript-fsa';
import { EventsResponse } from './home.page.types';

const actionCreator = actionCreatorFactory('[EVENT]');

export const getEventsAction = actionCreator.async<null | FilterType, any, EventsResponse>('GET_EVENTS');
export const paginationEventsAction = actionCreator.async<FilterType, EventsResponse[]>('PAGINATION_EVENTS');

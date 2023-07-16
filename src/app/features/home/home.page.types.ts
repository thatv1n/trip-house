import { Option } from '@/types';
import { EventResponse } from '../aboutEvent/event.types';
import { Address, Category, Geo, Pictures } from '../createEvent/createEvent.types';

export interface EventShort {
  title: Option<string>;
  description: Option<string>;
  maxNumberOfPeople: Option<number>;
  startAt: Option<string>;
  categories: Option<Category[]>;
  geo: Geo;
  address: Option<Address>;
  pictures: Option<Pictures>;
  id: string;
  numberOfMembers: number;
  lastElem: any;
  isInvite?: boolean;
  invite?: (data: string) => void;
}

export interface EventsResponse {
  events: EventResponse;
}

export interface EventsState {
  events: Option<EventResponse>;
  all: EventResponse[];
}

export interface EventsReducer {
  all: Option<EventResponse[]> | any;
  isLoading: boolean;
}

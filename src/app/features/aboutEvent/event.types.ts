import { Option } from '@/types';
import { Geo } from '../createEvent/createEvent.types';
import { Author } from '../profile/components/wall/wall.types';

export interface EventPayload {
  id: number;
}

export interface EventCategory {
  title: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}
export interface Address {
  country: string;
  city: Option<string>;
  detail: Option<string>;
}
export interface EventResponse {
  title: string;
  description: string;
  maxNumberOfPeople: number;
  startAt: string;
  categories: EventCategory[];
  id: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
  author: Author;
  pictures: Pictures;
  geo: Geo;
  numberOfMembers: number;
  isMember: boolean;
  lastElem: any;
  chatId: string;
}

export interface EventState {
  data: EventResponse | null;
}

export interface Thumbnail {
  width: number;
  height: number;
  extension: string;
  name: string;
  originalName: string;
  fullName: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pictures {
  thumbnails: Thumbnail[];
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Members {
  email: string;
  phoneNumber: string;
  login: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Thumbnail {
  width: number;
  height: number;
  extension: string;
  name: string;
  originalName: string;
  fullName: string;
  id: string;
}

export interface Avatar {
  thumbnails: Thumbnail[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Interest {
  title: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserType {
  target?: any;
  firstName: string;
  lastName: string;
  sex: string;
  age: string;
  city: string;
  description: string;
  avatar: Avatar;
  email: string;
  phoneNumber: string;
  login: string;
  lastOnline: Date;
  interests: Interest[];
  id: string;
  createdAt: string;
  updatedAt: string;
}

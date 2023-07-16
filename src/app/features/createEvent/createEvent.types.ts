import { Option } from '@/types';

export interface Category {
  title: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Geo {
  lat: number;
  lng: number;
}

export interface Author {
  email: string;
  phoneNumber: string;
  login: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  city: Option<string>;
  country: Option<string>;
  detail: Option<string>;
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

export interface CreateEventResponse {
  title: Option<string>;
  description: Option<string>;
  maxNumberOfPeople: Option<number>;
  startAt: Option<string>;
  categories: Option<Category[]>;
  geo: Option<Geo>;
  author: Option<Author>;
  address: Option<Address>;
  pictures: Option<Pictures>;
  id: Option<string>;
  createdAt: Option<string>;
  updatedAt: Option<string>;
}

export interface Address {
  country: Option<string>;
  city: Option<string>;
  detail: Option<string>;
}

export interface CreateEventEntity {
  title: string;
  description: string;
  maxNumberOfPeople: string;
  startAt: string;
  categoryIds: string;
  geo: string;
  address: string;
  large?: any;
  small?: any;
  loadFile: any;
}

export interface initialStateFormTypes {
  errorHandler: string;
  position: number[];
  addressMap: addressMapType;
  categoriesChecked: string[];
}

export interface addressMapType {
  country: string;
  city: string;
  detail: string;
}

export interface Category {
  title: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Geo {
  lat: number;
  lng: number;
}

export interface Author {
  firstName: string;
  lastName: string;
  sex: string;
  age: Date;
  city: string;
  description: string;
  email: string;
  phoneNumber: string;
  login: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  city: string;
  detail: string;
  country: string;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface Pictures {
  thumbnails: Thumbnail[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventAdminResponse {
  isMember: boolean;
  title: string;
  description: string;
  maxNumberOfPeople: number;
  startAt: Date;
  status: string;
  categories: Category[];
  geo: Geo;
  author: Author;
  address: Address;
  pictures: Pictures;
  numberOfMembers: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  getEventsModerate: (data: FilterAdminType) => void;
  isFilterEvent: any;
  lastElem: any;
}

export interface FilterAdminType {
  city?: string;
  text?: any;
  dateStart?: any;
  dateEnd?: any;
  categoryId?: string[];
  limit?: number;
  offset?: number;
  spending?: string;
  status?: string;
}

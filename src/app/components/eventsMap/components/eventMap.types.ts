import { Address, Author, Category, Geo, Pictures } from '@/admin/adminPanel/admin-panel.types';

export interface EventsProfile {
  isMember: boolean;
  title: string;
  description: string;
  maxNumberOfPeople: number;
  startAt: Date;
  status?: string;
  categories: Category[];
  geo: Geo;
  author: Author;
  address: Address;
  pictures: Pictures;
  numberOfMembers: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isFilterEvent: any;
}

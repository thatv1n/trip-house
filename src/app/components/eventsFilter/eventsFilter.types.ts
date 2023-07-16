export interface CategoryResponse {
  id: number | string;
  createdAt: string;
  updatedAt: string;
  title: string;
}

export interface CitiesResponse {
  cities: string;
}

export interface menuShortEvents {
  categories: [] | CategoryResponse[];
  cities: CitiesResponse[];
}
export interface Category {
  categories: CategoryResponse[];
}

export interface menuShortEventsState {
  menuShortEvents: menuShortEvents;
  cities: string[];
}

export interface FilterType {
  city?: string;
  text?: string | null;
  dateStart?: any;
  dateEnd?: any;
  categoryId?: string[];
  radius?: string;
  limit?: number;
  offset?: number;
  lat?: number;
  lon?: number;
  country?: string;
}

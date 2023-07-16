import { CoreApi } from '@/api';
import { Observable } from 'rxjs';
import { CategoryResponse, CitiesResponse } from './eventsFilter.types';

export class EventsFilterApi extends CoreApi {
  getCategories(): Observable<CategoryResponse[]> {
    return this.get('/category/find');
  }

  getCities(body: string): Observable<CitiesResponse[]> {
    return this.get(`/cities/${body}`);
  }
}

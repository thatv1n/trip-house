import { CoreApi } from '@/api';
import { FilterType } from '@/components/eventsFilter/eventsFilter.types';
import { Observable } from 'rxjs';
import { EventResponse } from '../aboutEvent/event.types';

export class GetEventsApi extends CoreApi {
  getEvents(params: FilterType | null): Observable<EventResponse[]> {
    const search =
      params &&
      `${params?.lat ? `lat=${params?.lat}&` : ''}${params?.lon ? `lon=${params?.lon}&` : ''}${
        params?.radius && params?.radius !== '0' ? `radius=${Number(params?.radius)}&` : ''
      }${params?.country ? `country=${params.country}&` : ''}${params?.city ? `city=${params.city}&` : ''}${
        params?.text ? `text=${params?.text}&` : ''
      }${params?.categoryId ? `categoryId=${params.categoryId}&` : ''}${
        params?.dateStart ? `dateStart=${params.dateStart}&` : ''
      }${params?.dateEnd ? `dateEnd=${params.dateEnd}&` : ''}${
        params?.limit ? `limit=${params.limit}&offset=${params.offset}` : ''
      }`;

    return this.get(`/event/search?${search}`);
  }
}

import { CoreApi } from '@/api';
import { Observable } from 'rxjs';

export class GetCountriesApi extends CoreApi {
  getCountries(): Observable<string[]> {
    return this.get(`/countries`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StatisticsResponse } from '@models/statistics-response';
import { isNullOrUndefined } from '@others/helper-functions';
import { DateRange } from '@models/date-range';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private url = '/api/statistics';

  constructor(private http: HttpClient) {
  }

  getData(range: DateRange, collectionId?: string): Observable<StatisticsResponse> {
    return this.http.post<StatisticsResponse>(!isNullOrUndefined(collectionId) ? `${this.url}/${collectionId}` : this.url, range);
  }
}

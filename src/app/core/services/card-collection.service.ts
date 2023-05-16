import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CrudService } from '@models/crud-service';
import { CardCollection } from '@models/card-collection';
import { Page } from '@models/page';

@Injectable({
  providedIn: 'root'
})
export class CardCollectionService implements CrudService<CardCollection> {
  private url = '/api/card-collections';

  constructor(private http: HttpClient) {
  }

  create(data: CardCollection): Observable<CardCollection> {
    return this.http.post<CardCollection>(this.url, data);
  }

  update(id: string, data: CardCollection): Observable<CardCollection> {
    return this.http.patch<CardCollection>(`${this.url}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getAll(params?: HttpParams): Observable<Page<CardCollection>> {
    return this.http.get<Page<CardCollection>>(`${this.url}`, {params});
  }

  getAllShared(): Observable<CardCollection[]> {
    return this.http.get<CardCollection[]>(`${this.url}/shared`, {});
  }

  share(id: string): Observable<void> {
    return this.http.post<void>(`${this.url}/${id}/share`, null);
  }

  save(id: string): Observable<void> {
    return this.http.post<void>(`${this.url}/${id}/save`, null);
  }

  stopSharing(id: string): Observable<void> {
    return this.http.post<void>(`${this.url}/${id}/stop-sharing`, null);
  }
}

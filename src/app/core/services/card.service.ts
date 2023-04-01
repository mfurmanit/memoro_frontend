import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CrudService } from '@models/crud-service';
import { Page } from '@models/page';
import { Card } from '@models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService implements CrudService<Card> {
  private url = '/api/cards';

  constructor(private http: HttpClient) {
  }

  create(data: Card): Observable<Card> {
    return this.http.post<Card>(this.url, data);
  }

  update(id: string, data: Card): Observable<Card> {
    return this.http.patch<Card>(`${this.url}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  markAsFavorite(id: string): Observable<void> {
    return this.http.post<void>(`${this.url}/${id}/favorite`, null);
  }

  getAll(params: HttpParams): Observable<Page<Card>> {
    return this.http.get<Page<Card>>(`/api/card-collections/${params.get('id')}/cards`, {params});
  }
}

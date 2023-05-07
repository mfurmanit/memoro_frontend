import { Injectable } from '@angular/core';
import { Card } from '@models/card';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnswerRequest } from '@models/answer-request';

@Injectable({
  providedIn: 'root'
})
export class LearningService {
  private url = '/api/learning';

  constructor(private http: HttpClient) {
  }

  start(collectionId: string): Observable<Card> {
    return this.http.post<Card>(`${this.url}/start/${collectionId}`, null);
  }

  stop(): Observable<void> {
    return this.http.post<void>(`${this.url}/stop`, null);
  }

  answer(request: AnswerRequest): Observable<Card> {
    return this.http.post<Card>(`${this.url}/answer`, request);
  }
}

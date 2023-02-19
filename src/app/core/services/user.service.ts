import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { filterNil } from '@others/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = '/api/user';

  constructor(private http: HttpClient) {
  }

  getUserDetails(): Observable<User> {
    return this.http.get<User>(this.url).pipe(filterNil());
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/logged-in`);
  }
}

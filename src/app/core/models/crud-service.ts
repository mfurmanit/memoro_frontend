import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '@models/page';

export interface CrudService<T> {
  getAll(params?: HttpParams): Observable<Page<T>>;

  create(data: T): Observable<T>;

  update(id: string, data: T): Observable<T>;

  delete(id: string): Observable<void>;
}

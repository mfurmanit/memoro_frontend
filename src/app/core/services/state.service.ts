import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public activeChanged: Subject<boolean> = new Subject<boolean>();
}

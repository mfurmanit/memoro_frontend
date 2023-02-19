import { filter } from 'rxjs/operators';
import { MonoTypeOperatorFunction } from 'rxjs';

export const filterNil = (): MonoTypeOperatorFunction<any> =>
  filter(value => value !== undefined && value !== null);

export const filterAccepted = (): MonoTypeOperatorFunction<any> =>
  filter(accepted => accepted);

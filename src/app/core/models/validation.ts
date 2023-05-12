import { Observable } from 'rxjs';

export interface ExistingValidatorConfig<T> {
  method: (value: T) => Observable<boolean>;
  methodArguments: (value: string) => T;
}

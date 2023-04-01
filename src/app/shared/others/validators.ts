import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEmpty, isObject } from 'lodash-es';

export class CustomValidators {
  public static selected: any = (error: string, required: boolean = true): ValidationErrors | null => (control: AbstractControl): ValidationErrors | null => {
    if (isEmpty(control.value) && !required) return null;
    if (isEmpty(control.value) && required) return {required: true};
    return isObject(control.value) ? null : {[error]: true};
  };
}

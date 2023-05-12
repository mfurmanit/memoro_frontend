import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ExistingValidatorConfig } from '@models/validation';
import { isEmpty } from 'lodash-es';
import { first, Observable, of, switchMap } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

export const passwordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const form = control as FormGroup;
  const password = form.controls['password'];
  const confirmPassword = form.controls['confirmPassword'];

  const passwordErrors = {
    required: password.errors?.['required'],
    weakPassword: !strongPassword(password),
    notSame: password.value === confirmPassword.value ? undefined : true
  };

  const confirmPasswordErrors = {
    required: confirmPassword.errors?.['required'],
    notSame: password.value === confirmPassword.value ? undefined : true
  };

  password.setErrors(Object.values(passwordErrors).filter(Boolean).length ? passwordErrors : null);
  confirmPassword.setErrors(Object.values(confirmPasswordErrors).filter(Boolean).length ? confirmPasswordErrors : null);

  return !passwordErrors.notSame ? null : {notSame: true};
};

export const strongPassword = (control: AbstractControl): boolean => {
  if (!control.value) return false;
  const regex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$!%&()*+,\\-./:;<=>?@[\\]^_`{|}~])' +
    '[a-zA-Z\\d#$!%&()*+,\\-./:;<=>?@[\\]^_`{|}~]{8,40}$'
  );
  return regex.test(control.value.toString());
};

export const existingValidator = <T>(existingConfig: ExistingValidatorConfig<T>,
                                     error: string = 'alreadyExists'): AsyncValidatorFn =>
  (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>
    !control.valueChanges || control.pristine ? of(null) : control.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(value => existingConfig.method(existingConfig.methodArguments(value))),
      map(response => response === true ? {[error]: true} : (!isEmpty(control.errors) ? control.errors : null)),
      first()
    );


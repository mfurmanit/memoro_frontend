import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmpty, isObject } from 'lodash-es';
import { isNullOrUndefined } from '@others/helper-functions';
import { differenceInDays } from 'date-fns';

export const selectedValidator = (error: string, required: boolean = true): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  if (isEmpty(control.value) && !required) return null;
  if (isEmpty(control.value) && required) return {required: true};
  return isObject(control.value) ? null : {[error]: true};
};

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

export const dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const from = control.get('from');
  const to = control.get('to');

  if (isNullOrUndefined(from) || isNullOrUndefined(to))
    return null;

  const fromDate = new Date(from.value);
  const toDate = new Date(to.value);

  const diffInDays = differenceInDays(toDate, fromDate);
  const error = diffInDays < 0 || diffInDays > 6;

  if (error) from.setErrors({invalidRange: true});
  else from.setErrors(null);

  return !error ? null : {invalidRange: true};
};

export const strongPassword = (control: AbstractControl): boolean => {
  if (!control.value) return false;
  const regex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$!%&()*+,\\-./:;<=>?@[\\]^_`{|}~])' +
    '[a-zA-Z\\d#$!%&()*+,\\-./:;<=>?@[\\]^_`{|}~]{8,40}$'
  );
  return regex.test(control.value.toString());
};

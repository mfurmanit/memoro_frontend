import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmpty, isObject } from 'lodash-es';

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

export const strongPassword = (control: AbstractControl): boolean => {
  if (!control.value) return false;
  const regex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$!%&()*+,\\-./:;<=>?@[\\]^_`{|}~])' +
    '[a-zA-Z\\d#$!%&()*+,\\-./:;<=>?@[\\]^_`{|}~]{8,40}$'
  );
  return regex.test(control.value.toString());
};

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function similarPassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirm_password')?.value;

    // Check if the password and confirm password fields are equal
    return password && confirmPassword && password === confirmPassword
      ? null // Valid
      : { passwordsNotMatch: true }; // Invalid
  };
}

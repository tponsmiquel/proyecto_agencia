import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/* ===========================
   Email
=========================== */
export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) return null;

  // Regex simple pero efectiva
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(value) ? null : { invalidEmail: true };
};

/* ===========================
   DNI (España)
   Formato: 8 dígitos + letra
=========================== */
export const dniValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const dni = control.value;
  if (!dni) return null;

  const dniRegex = /^[0-9]{8}[A-Z]$/;

  return dniRegex.test(dni) ? null : { invalidDNI: true };
};

/* ===========================
   NIE (España)
   Formato: X/Y/Z + 7 dígitos + letra
=========================== */
export const nieValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const nie = control.value;
  if (!nie) return null;

  const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/;

  return nieRegex.test(nie) ? null : { invalidNIE: true };
};

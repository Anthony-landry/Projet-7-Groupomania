import { FormControl } from '@angular/forms';

export class User {
  pseudo: string;
  email: string;
  password: string;

  constructor(pseudo: string, email: string, password: string) {
    this.pseudo = pseudo;
    this.email = email;
    this.password = password;
  }
}

export function noWhitespaceValidator(control: FormControl) {
  const isSpace = (control.value || '').match(/\s/g);
  return isSpace ? { whitespace: true } : null;
}

export function noBlackListValidator(control: FormControl) {
  const isNotAllowed = ['Passw0rd', 'Password123'].includes(
    control.value || ''
  );
  return isNotAllowed ? { blacklist: true } : null;
}

export function digitValidator(control: FormControl) {
  if (control.value) {
    const hasdigit = control.value.match('.*[0-9].*');
    return hasdigit ? null : { digit: true };
  }
  return null;
}

export function lowerCaseValidator(control: FormControl) {
  if (control.value) {
    const hasLower = control.value.match('.*[a-z].*');
    return hasLower ? null : { lower: true };
  }
  return null;
}

export function upperCaseValidator(control: FormControl) {
  if (control.value) {
    const hasUpper = control.value.match('.*[A-Z].*');
    return hasUpper ? null : { upper: true };
  }
  return null;
}

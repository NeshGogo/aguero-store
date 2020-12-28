import { AbstractControl } from '@angular/forms';

export class MyValidators {
  static isPriceValided(control: AbstractControl): {} {
    const value = control.value;
    if (value > 10000) {
      return {
        priceInvalid: true,
      };
    }
    return null;
  }

  static validPassword(control: AbstractControl): {} {
    const value = control.value;
    if(!containsNumber(value)){
      return {invalid_password: true};
    }
    return null;
  }
}

const containsNumber = (value: string): boolean => {
  return value.split('').find(v => isNumber(v)) !== undefined;
}

const isNumber = (value:string): boolean => {
  return !isNaN(parseInt(value,10));
}

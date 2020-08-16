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
}

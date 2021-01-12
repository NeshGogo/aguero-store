import { AbstractControl } from '@angular/forms';
import { CategoryService } from '@core/services/category.service';
import { map } from 'rxjs/operators';

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

  static matchPasswords( control: AbstractControl){
    const password = control.value.password;
    const confirmPassword = control.value.confirmPassword;
    if( password !== confirmPassword ){
      return {notMatch_password: true};
    }
    return null;
  }

  static checkCategoryName(service: CategoryService){
    return (control: AbstractControl) => {
      const value = control.value;
      return service.checkName(value).pipe(
        map( (response: any) => {

          if(! response.isAvailable ){
            return {not_available: true};
          }
          return null;
        })
      )
    }
  }
}

const containsNumber = (value: string): boolean => {
  return value.split('').find(v => isNumber(v)) !== undefined;
}

const isNumber = (value:string): boolean => {
  return !isNaN(parseInt(value,10));
}

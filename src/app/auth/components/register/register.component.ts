import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from '../../../utils/my-validatos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}
  register(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.createUser(value.email, value.password).then(() => {
        this.router.navigate(['/auth/login']);
      });
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            MyValidators.validPassword,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        type: ['company',[Validators.required]],
        companyName: ['', [Validators.required]],
      },
      {
        validators: [ MyValidators.matchPasswords]
      }
    );

    this.typeField.valueChanges
    .subscribe(value => {
      if (value === 'company') {
        this.companyNameField.setValidators([Validators.required]);
      } else {
        this.companyNameField.setValidators(null);
      }
      this.companyNameField.updateValueAndValidity();
    })
  }

  public get typeField() : AbstractControl {
    return this.form.get('type');
  }

  public get companyNameField() : AbstractControl {
    return this.form.get('companyName');
  }

}

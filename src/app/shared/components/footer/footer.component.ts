import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  emailField: FormControl;
  constructor() {
    this.emailField = new FormControl(
      '',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(4),
        Validators.email
      ]
    );
    this.emailField.valueChanges
    .subscribe(value => console.log(value));
  }

  ngOnInit(): void {
  }

  sendMail(): void {
    console.log(this.emailField.value);
  }

}

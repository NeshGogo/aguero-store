import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-basic-forms',
  templateUrl: './basic-forms.component.html',
  styleUrls: ['./basic-forms.component.scss'],
})
export class BasicFormsComponent implements OnInit {
  nameField: FormControl = new FormControl('',[Validators.required, Validators.maxLength(10)]);
  numberField: FormControl = new FormControl();
  telField: FormControl = new FormControl();
  emailField: FormControl = new FormControl();
  colorField: FormControl = new FormControl();
  dateField: FormControl = new FormControl();
  ageField: FormControl = new FormControl();
  categoryField: FormControl = new FormControl('categoria-4');
  tagField: FormControl = new FormControl('tag-4');
  agreeField: FormControl = new FormControl(false);
  genderField: FormControl = new FormControl('male');
  zoneField: FormControl = new FormControl('');
  constructor() {}

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe((value) => console.log(value));
  }

  getNameValue() {
    console.log(this.nameField.value);
  }

  get isNameFieldValid(){
    return this.nameField.touched && this.nameField.valid;
  }
  get isNameFieldInValid(){
    return this.nameField.touched && this.nameField.invalid;
  }
}

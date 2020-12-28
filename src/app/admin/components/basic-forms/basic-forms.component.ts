import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-basic-forms',
  templateUrl: './basic-forms.component.html',
  styleUrls: ['./basic-forms.component.scss'],
})
export class BasicFormsComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => console.log(value));
  }

  getNameValue() {
    console.log(this.form.value.name);
  }

  get isNameFieldValid(){
    return this.form.get('name').touched && this.form.get('name').valid;
  }
  get isNameFieldInValid(){
    return this.form.get('name').touched && this.form.get('name').invalid;
  }
  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['',[Validators.required, Validators.maxLength(10)]],
      number:[0],
      tel:[''],
      email:[''],
      color:[''],
      date:[''],
      age:[''],
      category:['categoria-4'],
      tag:['tag-4'],
      agree:[false],
      gender:['male'],
      zone:[''],
    });
  }
  save(event: Event){
    event.preventDefault();
    if(this.form.invalid) return;
    console.log(this.form.value);
  }
}

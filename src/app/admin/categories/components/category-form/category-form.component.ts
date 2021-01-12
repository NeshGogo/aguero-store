import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Event, Router, Params } from '@angular/router';
import { Category } from '@core/models/category';
import { CategoryService } from '@core/services/category.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { MyValidators } from 'src/app/utils/my-validatos';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  isNew = true;
  @Input()
  public set category(data: Category) {
    if (data) {
      this.isNew = false;
      this.form.patchValue(data);
    }
  }
  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private storage: AngularFireStorage,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.form.patchValue(this.category);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [
        '',
        [Validators.required],
        [MyValidators.checkCategoryName(this.categoryService)],
      ],
      image: ['', Validators.required],
    });
  }

  public get nameField(): AbstractControl {
    return this.form.get('name');
  }

  public get imageField(): AbstractControl {
    return this.form.get('image');
  }

  save() {
    if (this.form.valid) {
      if (this.isNew) {
        this.create.emit(this.form.value);
      } else {
        this.update.emit(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  uploadFile(event: any) {
    const imageFile = event.target.files[0];
    const name = 'category.png';
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, imageFile);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const url$ = ref.getDownloadURL();
          url$.subscribe((url) => {
            console.log(url);
            this.imageField.setValue(url);
          });
        })
      )
      .subscribe();
  }
}

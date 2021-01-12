import { Component, OnInit } from '@angular/core';
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
  categoryId: string;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private route: Router,
    private storage: AngularFireStorage,
    private activeRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.categoryId = params.id;
      if (this.categoryId) {
        this.getCategory();
      }
    });
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
      if (this.categoryId) {
        this.updateCategory();
      } else {
        this.createCategory();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private createCategory() {
    const data: Partial<Category> = this.form.value;
    this.categoryService.create(data).subscribe((rta) => {
      this.route.navigate(['./admin/categories']);
    });
  }
  private updateCategory() {
    const data = this.form.value;
    this.categoryService.update(this.categoryId, data).subscribe((rta) => {
      this.route.navigate(['./admin/categories']);
    });
  }
  private getCategory() {
    this.categoryService
      .get(this.categoryId)
      .subscribe((category) => this.form.patchValue(category));
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

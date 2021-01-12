import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { ProductService } from '../../../core/services/product/product.service';
import { MyValidators } from '../../../utils/my-validatos';
import { map, finalize, tap } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { CategoryService } from '@core/services/category.service';
import { Category } from '@core/models/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  percenUpload$: Observable<number>;
  categories: Category[] = [];
  private image$: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private angularFireStorage: AngularFireStorage,
    private categoryServices: CategoryService,
  ) {
    this.buildForm();
  }
  ngOnInit(): void {
    this.getCategories();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if(this.form.valid){
      const product = this.form.value;
      this.productService.createProduct(product)
      .subscribe(newProduct => {
        console.log(newProduct);
        this.router.navigate(['admin/products'])
      });
    }
  }
  // Asi es como construimos el formulario cuando tenemos multiples campos.
  private buildForm(): void{
    this.form = this.formBuilder.group({
      name: ['', [Validators.required] ],
      price: [0, [Validators.required, MyValidators.isPriceValided] ],
      description: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
  }

  get priceField(): AbstractControl{
    return this.form.get('price');
  }

  uploadFile(event: any): void {
    const file = event.target.files[0];
    const dir = 'pictures/products';
    const storeRef = this.angularFireStorage.ref(`/${dir}/${file.name}`);
    const uploadFile = storeRef.put(file);
    this.percenUpload$ = uploadFile.percentageChanges();
    uploadFile.snapshotChanges().pipe(
      finalize(() => {
        this.image$ = storeRef.getDownloadURL();
        this.image$.subscribe( url => {
          this.form.get('image').setValue(url);
        });
      }),
    ).subscribe();
  }

  private getCategories() {
    this.categoryServices.getAll()
    .subscribe( categories => this.categories = categories);
  }
}
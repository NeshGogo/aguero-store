import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MyValidators } from 'src/app/utils/my-validatos';
import { Category } from '@core/models/category';
import { CategoryService } from '@core/services/category.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  id: string;
  categories: Category[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private categoryServices: CategoryService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getCategories();
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue(product);
      });
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if(this.form.valid){
      const product = this.form.value;
      this.productService.updateProduct(this.id, product)
      .subscribe(newProduct => {
        console.log(newProduct);
        this.router.navigate(['admin/products'])
      });
    }
    console.log(this.form.value);
  }
  // Asi es como construimos el formulario cuando tenemos multiples campos.
  private buildForm(): void{
    this.form = this.formBuilder.group({
      name: ['', [Validators.required] ],
      price: [0, [Validators.required, MyValidators.isPriceValided] ],
      category_id: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  get priceField(): AbstractControl{
    return this.form.get('price');
  }

  private getCategories() {
    this.categoryServices.getAll()
    .subscribe( categories => this.categories = categories);
  }

}

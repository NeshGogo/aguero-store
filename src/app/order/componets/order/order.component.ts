import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Observable, pipe } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { map } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  productsDistinct$: Observable<Product[]>;
  products$: Observable<Product[]>;
  form: FormGroup;
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.products$ = this.cartService.cart$;
    this.productsDistinct$ = this.cartService.cart$.pipe(
      map((products) => {
        const newListProducts = [];
        products.forEach((element) => {
          if (!newListProducts.some((el) => el.id === element._id)) {
            newListProducts.push(element);
          }
        });
        return newListProducts;
      })
    );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      addresses: this.formBuilder.array([]),
    });
  }

  addAddressField() {
    this.adreessFields.push(this.createAddressField());
  }

  private createAddressField() {
    return this.formBuilder.group({
      zip: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  save(): void {
    console.log(this.form.value);
  }

  public get adreessFields(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

 
}

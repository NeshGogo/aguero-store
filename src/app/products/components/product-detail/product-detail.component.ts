import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '@core/services/product/product.service';
import { Product } from '@core/models/product';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.params
    .pipe(
      // Nos permite cambiar un observable por otro.
      switchMap((param: Params) => {
        return this.productService.getProduct(param.id);
      })
    );
  }

  createProduct(): void {
    const prop: Product = {
      id: '220',
      title: 'Producto nuevo',
      price: 1500,
      image: './assets/images/product9.jpg',
      description: 'Esto es un producto prueba.',
    };
    this.productService.createProduct(prop)
    .subscribe(product => console.log(product));
  }

  updateProduct(): void {
    const change: Partial<Product> = {
      price: 2000,
      description: 'Actualizando el producto.',
    };
    this.productService.updateProduct('220', change)
    .subscribe(product => console.log(product));
  }

  deleteProduct(): void {
    this.productService.deleteProduct('2000')
    .subscribe(value => console.log(value));
  }
}

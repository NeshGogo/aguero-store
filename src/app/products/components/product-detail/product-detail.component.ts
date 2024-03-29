import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '@core/services/product/product.service';
import { Product } from '@core/models/product';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CssSelector } from '@angular/compiler';

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
      _id: '220',
      name: 'Producto nuevo',
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

  randomUsers(): void {
    alert('Esta es una funcion que se creo para mostrar el manejo de errores. El error es enviado a sentry que es un log de errores');
    this.productService.getRandomUsers()
    .subscribe(
      users => console.log(users),
      error =>  console.error(error, '(error provocado intencionalmente)')
    );

    alert('Abre la consola para que veas el error');
  }

  getFile(): void {
    this.productService.getFile()
    .subscribe( response => console.log(response));
    alert('Abre la consola');
  }
}

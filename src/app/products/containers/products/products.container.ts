import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product';
import {ProductService} from '../../../core/services/product/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.container.html',
  styleUrls: ['./products.container.scss']
})
export class ProductsContainer implements OnInit {
  // products: Product[] = [
  //   {
  //     id: 1,
  //     image:
  //       'https://images.pexels.com/photos/891252/pexels-photo-891252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     title: 'Tasa',
  //     price: 1200,
  //     description: 'Una tasa especial para una persona especial.',
  //   },
  //   {
  //     id: 2,
  //     image:
  //       'https://images.pexels.com/photos/891252/pexels-photo-891252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     title: 'Camisa',
  //     price: 1200,
  //     description: 'Una tasa especial para una persona especial.',
  //   },
  //   {
  //     id: 3,
  //     image:
  //       'https://images.pexels.com/photos/891252/pexels-photo-891252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     title: 'Pantalon',
  //     price: 1200,
  //     description: 'Una tasa especial para una persona especial.',
  //   },
  //   {
  //     id: 4,
  //     image:
  //       'https://images.pexels.com/photos/891252/pexels-photo-891252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     title: 'Broche',
  //     price: 1200,
  //     description: 'Una tasa especial para una persona especial.',
  //   },
  //   {
  //     id: 5,
  //     image:
  //       'https://images.pexels.com/photos/891252/pexels-photo-891252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     title: 'Zapato',
  //     price: 1200,
  //     description: 'Una tasa especial para una persona especial.',
  //   },
  // ];
  products: Product[] = [];
  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void{
    this.productService.getAllProducts().subscribe( products => {
      this.products = products;
    });
  }

  productClicked(id: any): void {
    console.log(`Se dio click al producto con el ${id}`);
  }
}

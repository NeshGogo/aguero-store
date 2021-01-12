import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product/product.service';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService
      .getAllProducts()
      .subscribe((products) => {this.products = products;
       console.log(products);
      });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe((status) => {
      if (status) {
        const product = this.products.filter((pro) => pro._id === id);
        const index = this.products.indexOf(product[0]);
        this.products.splice(index, 1);
        this.products = [...this.products];
      }
    });
  }
}

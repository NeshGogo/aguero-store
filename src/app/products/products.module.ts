import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsContainer } from './containers/products/products.container';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ProductsContainer,
    ProductDetailComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule
  ]
})
export class ProductsModule { }

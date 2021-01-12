import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './containers/category/category.component';


@NgModule({
  declarations: [CategoryFormComponent, CategoriesComponent, CategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class CategoriesModule { }

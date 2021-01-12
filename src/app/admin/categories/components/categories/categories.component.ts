import { Component, OnInit } from '@angular/core';
import { Category } from '@core/models/category';
import { CategoryService } from '@core/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'image', 'actions'];

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.categoryService.getAll()
    .subscribe(categories => {
      this.categories = categories;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from '@core/models/category';
import { CategoryService } from '@core/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category;
  constructor(
    private categoryService: CategoryService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.getCategory(params.id);
      }
    });
  }

  createCategory(category: Partial<Category>) {
    this.categoryService.create(category).subscribe((rta) => {
      this.route.navigate(['./admin/categories']);
    });
  }

  updateCategory(category: Partial<Category>) {
    this.categoryService.update(category._id, category).subscribe((rta) => {
      this.route.navigate(['./admin/categories']);
    });
  }

  private getCategory(id) {
    this.categoryService
      .get(id)
      .subscribe((category) => this.category = {...category}) ;
  }
}

import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/Category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories$?: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {}

  onSearch(query: string) {
    this.categories$ = this.categoryService.getAllCategories(query);
  }

  // ngOnInit, al iniciar el componente carga todas las categorias sin filtrar.
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }
}

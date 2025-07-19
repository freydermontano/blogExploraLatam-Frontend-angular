import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-model';
import { Observable } from 'rxjs';
import { Category } from '../models/Category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  //Metodo para agregar una categoria
  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/categories`,
      model
    );
  }

  //Metodo para obtener todas las categorias
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${environment.apiBaseUrl}/api/categories`
    );
  }

  //Metodo para obtener una categoria por id
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(
      `${environment.apiBaseUrl}/api/categories/${id}`
    );
  }

  //Metodo para editar una categoria
  updateCategory(
    id: string,
    updateCategoryRequest: UpdateCategoryRequest
  ): Observable<Category> {
    return this.http.put<Category>(
      `${environment.apiBaseUrl}/api/categories/${id}`,
      updateCategoryRequest
    );
  }

  //Metodo para eliminar una categoria
  deleteCategory(id: string): Observable<Category>{
    return this.http.delete<Category>(
      `${environment.apiBaseUrl}/api/categories/${id}`
    );
  }
}

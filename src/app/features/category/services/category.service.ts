import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

import { Category } from '../models/Category.model';
import { AddCategoryRequest } from '../models/add-category-model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  //Metodo para obtener todas las categorias
  getAllCategories(query?: string, sortBy?: string, sortDirection?: string): Observable<Category[]> {
    //recoger parametro
    let params = new HttpParams();

    if (query) {
      params = params.set('query', query);
    }

    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }

    if (sortDirection) {
       params = params.set('sortDirection', sortDirection);
    }

    return this.http.get<Category[]>(
      `${environment.apiBaseUrl}/api/categories`,
      {
        params: params,
      }
    );
  }

  //Metodo para obtener una categoria por id
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(
      `${environment.apiBaseUrl}/api/categories/${id}`
    );
  }

  //Metodo para agregar una categoria
  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/categories`,
      model
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
  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(
      `${environment.apiBaseUrl}/api/categories/${id}`
    );
  }
}

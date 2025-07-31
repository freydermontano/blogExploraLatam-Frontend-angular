import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/Category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubcription?: Subscription;
  updateCategorySubcription?: Subscription;
  selectedCategories?: string[];


  //Crear Objeto para asignar los datos obtenidos del id, como nombre y urlHandle
  category?: Category;

  //ActivatedRoute: Para acceder a los parametros de la ruta, como el id
  constructor(
    private route: ActivatedRoute,
    private categoryServices: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubcription = this.route.paramMap.subscribe((params) => {
      //Obtener el id de la ruta
      this.id = params.get('id');

      if (this.id) {
        this.categoryServices.getCategoryById(this.id).subscribe({
          next: (response) => {
            //Asignamos los datos obtenidos a la propiedad 'category'
            this.category = response;
          },
        });
      }
    });
  }

  //Editar formulario
  onFormSubmit() {
    //Pasamos objeto para editar category
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name || '',
      urlHandle: this.category?.urlHandle || '',
    };

    //Pasamos el objeto al servicio
    if (this.id) {
      this.updateCategorySubcription = this.categoryServices
        .updateCategory(this.id, updateCategoryRequest)
        .subscribe({
          next: (response) => {
            //devolvemos a la lista de categoria
            this.router.navigateByUrl('/admin/categories');
          },
        });
    }
  }

  //Eliminar
  onDelete() {
    if (this.id) {
      this.categoryServices.deleteCategory(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubcription?.unsubscribe();
    this.updateCategorySubcription?.unsubscribe();
  }
}

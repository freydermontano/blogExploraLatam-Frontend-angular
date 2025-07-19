import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-model'; // Interfaz que representa el modelo de datos para agregar una categoria
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnDestroy {
  // Declara una propiedad del tipo AddCategoryRequest, que representara los datos del formulario
  model: AddCategoryRequest;

  // Suscripcion al servicio, usada para cancelar la suscripcion y evitar fugas de memoria
  private addCategorySubscription?: Subscription;

  constructor(private categoryService: CategoryService) {
    // Inicializa el modelo con valores vacios para el formulario
    this.model = {
      name: '',
      urlHandle: '',
    };
  }

  // Metodo que se ejecutara cuando se envie el formulario
  onFormSubmit() {
    this.addCategorySubscription = this.categoryService
      .addCategory(this.model)
      .subscribe({
        next: (response) => {
          console.log('Categoria agregada correctamente');
          this.model = { name: '', urlHandle: '' };
        },
      });
  }

  // Metodo del ciclo de vida que se ejecuta al destruir el componente
  // Cancela la suscripción activa para liberar recursos
  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}

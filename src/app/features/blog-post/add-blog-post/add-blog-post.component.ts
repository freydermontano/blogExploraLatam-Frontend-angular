import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../blog-post.service';
import { AddBlogPost } from '../models/add-blogPost.model';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/Category.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css'],
})
export class AddBlogPostComponent implements OnInit, OnDestroy {
  categories$?: Observable<Category[]>;

  // Declara una propiedad del tipo AddBlogPostRequest, que representara los datos del formulario
  model: AddBlogPost;
  isImageSelected: boolean = false;


  //Subscriptions
  imageSelectionSubscription?: Subscription;


  constructor(
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private router: Router
  ) {
    // Inicializo el modelo con valores vacios para el formulario
    this.model = {
      title: '',
      content: '',
      shortDescription: '',
      publishedDate: new Date(),
      author: '',
      urlHandle: '',
      featureImageUrl: '',
      isVisible: true,
      categories: [],
    };
  }

  //Obtener categoria de la api para  en agregar en el formulario blogPost
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    // Obtener imagen seleccionada
    this.imageService.onSelectImage()
    .subscribe({
      next:(selectedImage)=>{
        this.model.featureImageUrl = selectedImage.url;
        this.closeModalSelectorImage(); // Cerrar modal despues de seleccionar la imagen
        console.log('Imagen seleccionada:', selectedImage);
      }
    })
  }

  //Metodo Registrar BlogPost
  onFormSubmit() {
    this.blogPostService.createBlogPost(this.model).subscribe({
      next: (response) => {
        console.log('Categoria agregada correctamente', this.model);
        this.model = {
          title: '',
          content: '',
          shortDescription: '',
          publishedDate: new Date(),
          author: '',
          urlHandle: '',
          featureImageUrl: '',
          isVisible: true,
          categories: [],
        };

        this.router.navigateByUrl('/admin/blogposts');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //Metodo para abrir el modal de seleccion de imagen
  openModalSelectorImage() {
    this.isImageSelected = true;
  }
  //Metodo para cerrar el modal de seleccion de imagen
  closeModalSelectorImage() {
    this.isImageSelected = false;
  }

  //Desuscribirse de las suscripciones
  ngOnDestroy(): void {
    this.imageSelectionSubscription?.unsubscribe();
  }
}

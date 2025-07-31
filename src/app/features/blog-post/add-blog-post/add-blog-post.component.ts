import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../blog-post.service';
import { AddBlogPost } from '../models/add-blogPost.model';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../category/models/Category.model';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css'],
})

export class AddBlogPostComponent implements OnInit {


  categories$?: Observable<Category[]> ;

  // Declara una propiedad del tipo AddBlogPostRequest, que representara los datos del formulario
  model: AddBlogPost;

  constructor(
    private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService
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
      categories: []
    };
  }


  //Obtener categoria de la api para  en agregar en el formulario blogPost
  ngOnInit(): void {
    this.categories$ =  this.categoryService.getAllCategories();
  };

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
          categories: []
        };

        this.router.navigateByUrl('/admin/blogposts');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

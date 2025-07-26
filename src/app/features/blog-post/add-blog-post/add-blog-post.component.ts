import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogPostService } from '../blog-post.service';
import { AddBlogPost } from '../models/add-blogPost.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css'],
})
export class AddBlogPostComponent {
  // Declara una propiedad del tipo AddBlogPostRequest, que representara los datos del formulario
  model: AddBlogPost;

  constructor(private blogPostService: BlogPostService, private router: Router) {
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
    };
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
        };

        this.router.navigateByUrl('/admin/blog-posts');
      },
      error: (error) => {
        console.log(error);
      },
    });

    console.log(this.model);
  }
}

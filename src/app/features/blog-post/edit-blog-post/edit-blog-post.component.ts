import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from '../blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/Category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { CategoryService } from '../../category/services/category.service';

@Component({
  selector: 'app-edit-blog-post',
  templateUrl: './edit-blog-post.component.html',
  styleUrls: ['./edit-blog-post.component.css'],
})
export class EditBlogPostComponent implements OnInit, OnDestroy {

  //Variables
  id: string | null = null;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];

  //Subscriptions
  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;

  //Constructor
  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  onFormSubmit() {
    //Convertir modelo a objeto request
    if (this.model && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        title: this.model.title,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        publishedDate: this.model.publishedDate,
        author: this.model.author,
        urlHandle: this.model.urlHandle,
        featureImageUrl: this.model.featureImageUrl,
        isVisible: this.model.isVisible,
        categories: this.selectedCategories ?? [],
      };

      //Actualizar BlogPost
      this.updateBlogPostSubscription = this.blogPostService
        .updateBlogPost(this.id, updateBlogPost)
        .subscribe({
          next: (response) => {
            console.log('BlogPost actualizado correctamente', response);
            this.router.navigateByUrl('/admin/blogposts');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  ngOnInit(): void {

    //Obtener categoria de la api para  en agregar en el formulario blogPost
    this.categories$ =  this.categoryService.getAllCategories();


    //Obtener id de la ruta
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        //Obtener BlogPost API
        if (this.id) {
         this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCategories = response.categories.map(
                (category) => category.id
              );
            },
            error: (error) => {
              console.log(error);
            },
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
  }
}

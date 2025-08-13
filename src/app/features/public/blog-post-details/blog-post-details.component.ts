import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-blog-post-details',
  templateUrl: './blog-post-details.component.html',
  styleUrls: ['./blog-post-details.component.css'],
})
export class BlogPostDetailsComponent implements OnInit {
  //Variables
  url: string | null = '';

  //Observables
  blogPost$?: Observable<BlogPost>;

  constructor(
    private router: ActivatedRoute,
    private blogPostService: BlogPostService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe({
      next: (params) => {
        this.url = params.get('urlHandle');
        console.log(params.get('urlHandle'));
      },
      error: (error) => {
        console.log(error);
      },
    });

    //Fecth blogPost detalles por url
    if (this.url) {
      this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
    }
  }
}

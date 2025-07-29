import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.css']
})
export class BlogPostListComponent implements OnInit {


  constructor(private blogPostService: BlogPostService) { }

   blogPosts$?: Observable<BlogPost[]> ;

  ngOnInit(): void {
    //Obtener todos los blogPost de la API
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();

  }

}

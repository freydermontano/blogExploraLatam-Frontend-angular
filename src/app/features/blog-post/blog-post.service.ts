import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBlogPost } from './models/add-blogPost.model';
import { BlogPost } from './models/blog-post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private httpClient: HttpClient) {}

  createBlogPost(data: AddBlogPost): Observable<BlogPost> {
    return this.httpClient.post<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts`,
      data
    );
  }
}

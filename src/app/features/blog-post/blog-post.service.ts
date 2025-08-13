import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBlogPost } from './models/add-blogPost.model';
import { BlogPost } from './models/blog-post.model';
import { environment } from 'src/environments/environment';
import { UpdateBlogPost } from './models/update-blog-post.model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private httpClient: HttpClient) {}

  createBlogPost(data: AddBlogPost): Observable<BlogPost> {
    return this.httpClient.post<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts`,data
    );
  }

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.httpClient.get<BlogPost[]>(
      `${environment.apiBaseUrl}/api/blogposts`
    );
  }

  getBlogPostById(id: string):Observable<BlogPost> {
    return this.httpClient.get<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts/${id}`
    );
  }

  getBlogPostByUrlHandle(urlHandle: string):Observable<BlogPost>{
    return this.httpClient.get<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts/${urlHandle}`
    );
  }


  updateBlogPost(id: string, updateBlogPostData: UpdateBlogPost): Observable<BlogPost> {
    return this.httpClient.put<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts/${id}`,
      updateBlogPostData
    );
  }

  deleteBlogPost(id:string): Observable<BlogPost>{
    return this.httpClient.delete<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts/${id}`
    );
  }



}

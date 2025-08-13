import { NgModule } from '@angular/core';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogPostListComponent } from './features/blog-post/blog-post-list/blog-post-list.component';
import { AddBlogPostComponent } from './features/blog-post/add-blog-post/add-blog-post.component';
import { RouterModule, Routes } from '@angular/router';
import { EditBlogPostComponent } from './features/blog-post/edit-blog-post/edit-blog-post.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogPostDetailsComponent } from './features/public/blog-post-details/blog-post-details.component';

const routes: Routes = [
  //Home
  {
    path:'',
    component: HomeComponent

  },
  //BlogPostDetails
  {
    path:'blog/:urlHandle',
    component: BlogPostDetailsComponent

  },

  //Categories
  {
    path:'admin/categories',
    component:CategoryListComponent
  },
   {
    path:'admin/categories/add',
    component:AddCategoryComponent
  },
  {
    path:'admin/categories/:id',
    component:EditCategoryComponent
  },

  //BlogPosts
  {
    path:'admin/blogposts',
    component:BlogPostListComponent
  },
  {
    path:'admin/blogposts/add',
    component:AddBlogPostComponent
  },
   {
    path:'admin/blogposts/:id',
    component:EditBlogPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export interface UpdateBlogPost{

     title: string;
     content: string;
     shortDescription: string;
     publishedDate: Date;
     author: string;
     urlHandle: string;
     featureImageUrl: string;
     isVisible: boolean;
     //Mostrar las categorias asociada a blogPost
     categories:string[];


}


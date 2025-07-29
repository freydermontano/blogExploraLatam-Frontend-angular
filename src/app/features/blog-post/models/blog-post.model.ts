import { Category } from "../../category/models/Category.model";

export interface BlogPost{

     id: string;
     title: string;
     content: string;
     shortDescription: string;
     publishedDate: Date;
     author: string;
     urlHandle: string;
     featureImageUrl: string;
     isVisible: boolean;
     //Mostrar las categorias asociada a blogPost
     categories:Category[];

}

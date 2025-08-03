import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }


  //Metodos
  uploadImageSelected(File: File, fileName: string, title: string):Observable<BlogImage>{

    const formData = new FormData();
    formData.append('file', File);
    formData.append('fileName', fileName);
    formData.append('title', title);

    //Enviar url
   return this.http.post<BlogImage>( `${environment.apiBaseUrl}/api/images`, formData )
  }

  getAllImages():Observable<BlogImage[]>{
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}/api/images`)
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  //Variables

  //Subject para manejar la imagen seleccionada, y poder compartirla entre componentes
  //BehaviorSubject para que los componentes que se suscriban reciban el valor actual
  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileName: '',
    title: '',
    fileExtension: '',
    url: '',
  });

  constructor(private http: HttpClient) {}

  //Metodos
  uploadImageSelected(
    file: File,
    fileName: string,
    title: string
  ): Observable<BlogImage> {
    const formData = new FormData();
    //Agregar propiedades al FormData
    //Pasar en Orden las propiedades para que coincidan y no de error
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    //Enviar url
    return this.http.post<BlogImage>(
      `${environment.apiBaseUrl}/api/images`,
      formData
    );
  }

  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}/api/images`);
  }

  // Permite seleccionar una imagen y compartirla entre componentes usando BehaviorSubject.
  // Los componentes pueden suscribirse para recibir la imagen seleccionada y reaccionar a cambios.
  selectImage(image: BlogImage): void {
    this.selectedImage.next(image);
  }

  // Permite a los componentes suscribirse para recibir la imagen seleccionada.
  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}

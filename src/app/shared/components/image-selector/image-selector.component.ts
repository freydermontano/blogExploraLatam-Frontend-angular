import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'],
})
export class ImageSelectorComponent implements OnInit {
  //Variables
  private file?: File;
  fileName: string = '';
  title: string = '';
  images$?: Observable<BlogImage[]>;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event: Event): void {
    const elements = event.currentTarget as HTMLInputElement;
    this.file = elements.files?.[0];
  }

  onUploadImage(): void {
    if (this.file) {
      if (this.file && this.fileName !== '' && this.title !== '') {
        //Servicio Imagen
        this.imageService
          .uploadImageSelected(this.file, this.fileName, this.title)
          .subscribe({
            next: (response) => {
              console.log('Imagen subida correctamente', response);
              this.imageUploadForm?.resetForm();
              this.getImages();
            },
            error: (error) => {
              console.log(error);
            },
          });
      }
    }
  }

  // Seleccionar Imagen
  selectImage(image: BlogImage): void{
    this.imageService.selectImage(image);

  }


  private getImages() {
    this.images$ = this.imageService.getAllImages();
  }
}

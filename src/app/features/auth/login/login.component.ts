import { Component } from '@angular/core';
import { LoginRequestModel } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  //Modelo para enlazar los datos del formulario
  model: LoginRequestModel;

  //Inyectar el servicio de autenticacion
  constructor(private authService: AuthService) {
    this.model = {
      email: '',
      password: '',
    };
  }

  //Metodo para manejar el envio del formulario
  onFormSubmit(): void {
    this.authService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(' error' , error);
        console.error('Mensaje:', error?.error);
      },
    });
  }
}

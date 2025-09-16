import { Component } from '@angular/core';
import { LoginRequestModel } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  //Modelo para enlazar los datos del formulario
  model: LoginRequestModel;

  //Inyectar el servicio de autenticacion
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: '',
    };
  }

  //Metodo para manejar el envio del formulario
  onFormSubmit(): void {
    this.authService.login(this.model).subscribe({
      next: (response) => {
        //Guardar el token en una cookie
        this.cookieService.set(
          'Authorization',
          `Bearer ${response.token}`,
          undefined,'/',undefined,true,'Strict'
        );

        //Escuchar los cambios si el usuario esta logeado o no lo esta. subcriptores y Observable
        // antes de redirigirlo al componente home
        this.authService.setUser({
          email:response.email,
          roles:response.roles
        });


        //Redirigir al usuario a la pagina de Inicio
        this.router.navigateByUrl('/');
        console.log(response);
      },
      error: (error) => {
        console.log(' error', error);
        console.error('Mensaje:', error?.error);
      },
    });


  }
}

import { Injectable } from '@angular/core';
import { LoginRequestModel } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponseModel } from '../models/login-response-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    // Al crear el servicio, intenta cargar usuario desde localStorage
    const storedUser = this.getUser();
    if (storedUser) {
      this.$user.next(storedUser);
    }
  }

  // BehaviorSubject que mantiene el estado del usuario actual
  $user = new BehaviorSubject<User | undefined>(undefined);

  // Login,  llama al backend y devuelve un observable
  login(request: LoginRequestModel): Observable<LoginResponseModel> {
    console.log('request', request);
    return this.httpClient.post<LoginResponseModel>(
      `${environment.apiBaseUrl}/api/auth/login`,
      {
        email: request.email,
        password: request.password,
      }
    );
  }

  // Guardar usuario en BehaviorSubject y localStorage
  setUser(user: User): void {
    this.$user.next(user); // notifica a todos los suscriptores
    //Almacenaremos los dos valores email y roles
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-role', user.roles.join(','));
  }

  // Permite observar los cambios en el usuario
  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  //Obtener usuario
  getUser(): User | undefined {
    // Busca en el localStorage del navegador el valor guardado con la clave, user-email, user-roles
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-role');

    if (email && roles) {
    //  Crea un objeto que cumple con la interfaz
      const user: User = {
        email: email,
        roles: roles.split(','),
      };
      return user;
    }
    return undefined;
  }


  //Cerrar seccion
  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}

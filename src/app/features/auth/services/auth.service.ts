import { Injectable } from '@angular/core';
import { LoginRequestModel } from '../models/login-request.model';
import { Observable } from 'rxjs';
import { LoginResponseModel } from '../models/login-response-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

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
}

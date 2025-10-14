import { Component } from '@angular/core';
import { RegisterRequestModel } from '../models/register-request.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  model: RegisterRequestModel = {
    email: '',
    password: '',
  };

  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router:Router) {}

  onFormSubmit() {
    if (!this.model.email || !this.model.password) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.model).subscribe({
      next: () => {
        alert('Cuenta creada con éxito. Ahora puedes iniciar sesión.');
        this.router.navigateByUrl('/login');
      },
      error:(err)=>{
        console.log(err);
  if (err.error && err.error.errors) {
    this.errorMessage = Object.values(err.error.errors).flat().join(' ');
  } else if(err.error?.title) {
    this.errorMessage = err.error.title;
  } else {
    this.errorMessage = 'Error al registrarse';
  }
  this.isLoading = false;
   } });
  }
}

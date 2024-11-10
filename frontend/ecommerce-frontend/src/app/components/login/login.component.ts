import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  // Método que se llama al enviar el formulario
  onLogin(): void {
    this.userService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        // Puedes almacenar un token o alguna información aquí si es necesario
        this.router.navigate(['/products']);  // Redirigir al dashboard u otra página
      },
      error: (error) => {
        console.error('Error al hacer login:', error);
        this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
      }
    });
  }

}

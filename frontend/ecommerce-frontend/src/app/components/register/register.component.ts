import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule,CommonModule],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  onRegister() {
    this.userService.register(this.name, this.email, this.password).subscribe(
      (response) => {
        // Mostrar alerta y redirigir al login
        alert('Usuario creado correctamente');
        this.router.navigate(['/login']); // Redireccionar al login
      },
      (error) => {
        this.errorMessage = 'Error al crear el usuario';
      }
    );
  }
}

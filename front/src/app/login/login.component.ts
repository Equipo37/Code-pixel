import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Aquí puedes implementar la lógica de autenticación
    if (this.username === 'usuario' && this.password === 'contraseña') {
      console.log('Inicio de sesión exitoso');
    } else {
      console.log('Inicio de sesión fallido');
    }
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}

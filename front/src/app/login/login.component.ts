import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../core/services/user.service';
import { Client } from '../core/interfaces/Client';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  error: string = '';
  username: string = '';
  password: string = '';
  cliente: Client = {
    dni: '',
    personahumana: true,
    nombre: '',
    email: '',
    celular: '',
    empresa: '',
    password: '',
    admin: false,
    token: '',
    avatar: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  async onSubmit() {
    try {
      const data: any = await this.http
        .post('https://code-pixel-back.onrender.com/clientes/login', {
          email: this.username,
          password: this.password,
        })
        .toPromise();

      if (data.accessToken) {
        this.cliente.celular = data.cliente.cli_celular;
        this.cliente.dni = data.cliente.cli_dni;
        this.cliente.email = data.cliente.cli_email;
        this.cliente.empresa = data.cliente.cli_empresa;
        this.cliente.nombre = data.cliente.cli_nombre;
        this.cliente.password = data.cliente.cli_password;
        this.cliente.personahumana = data.cliente.cli_personahumana;
        this.cliente.token = data.accessToken;
        this.cliente.avatar = data.cliente.cli_avatar;
        console.log('Inicio de sesión exitoso');
        this.userService.setUserData(this.cliente);
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Email y/o contraseña inválidos';
        console.log('Inicio de sesión fallido');
      }
    } catch (error) {
      this.error =
        'Email y/o contraseña inválidos';
      console.error('Error al iniciar sesión:', error);
    }
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}

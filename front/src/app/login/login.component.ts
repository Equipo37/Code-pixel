import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

type Client = {
  dni: string,
  personahumana: boolean,
  nombre: string,
  email: string,
  celular: string,
  empresa: string,
  password: string,
  admin: boolean,
  token: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})




export class LoginComponent {

  error: string = "";
  username: string = '';
  password: string = '';	
  cliente: Client = {
    dni: "",
  personahumana: true,
  nombre: "",
  email: "",
  celular: "",
  empresa: "",
  password: "",
  admin: false,
  token: ""
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient 
  ) { }

  onSubmit() {
    this.http.post("https://code-pixel-back.onrender.com/clientes/login", {
      email: this.username,
      password: this.password
    }).subscribe((data: any) => {
      // Verifica si la solicitud fue exitosa (status 200)
      if (data.status === 200) {
        this.cliente.celular = data.cliente.cli_celular;
        this.cliente.dni = data.cliente.cli_dni;
        this.cliente.email = data.cliente.cli_email;
        this.cliente.empresa = data.cliente.cli_empresa;
        this.cliente.nombre = data.cliente.cli_nombre;
        this.cliente.password = data.cliente.cli_password;
        this.cliente.personahumana = data.cliente.cli_personahumana;
        this.cliente.token = data.accessToken;
        console.log('Inicio de sesión exitoso');
      } else {
        console.log('Inicio de sesión fallido');
      }
    });
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}




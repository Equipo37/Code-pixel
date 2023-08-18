import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  nombres: string = '';
  apellidos: string = '';
  dni: string = '';
  email: string = '';
  celular: string = '';
  personahumana: boolean = false;
  empresa: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  getBackgroundImageUrl(): SafeStyle {
    const imageUrl = '../../assets/img/fondoHomePage.jpg';
    const backgroundImageStyle = `url(${imageUrl})`;
    return this.sanitizer.bypassSecurityTrustStyle(backgroundImageStyle);
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }

    const nombreCompleto = `${this.nombres} ${this.apellidos}`;

    const requestData = {
      dni: this.dni,
      personahumana: this.personahumana,
      nombre: nombreCompleto,
      email: this.email,
      celular: this.celular,
      empresa: this.empresa,
      password: this.password,
    };

    console.log(requestData);

    const URL = 'http://localhost:4001/clientes/';

    this.http.post(URL, requestData).subscribe(
      (response) => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error en el registro', error);
      }
    );
  }
}

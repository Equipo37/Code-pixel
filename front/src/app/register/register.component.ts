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
  personahumana: boolean = true;
  empresa: string = 'N/A';
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
      personahumana: this.personahumana || true,
      nombre: nombreCompleto,
      email: this.email,
      celular: this.celular,
      empresa: this.empresa || '',
      password: this.password,
    };

    console.log(requestData);

    const URL = 'http://localhost:4001/clientes/';
    // const URL = 'https://code-pixel-back.onrender.com/clientes/';

    this.http.post(URL, requestData, { responseType: 'text' }).subscribe(
      (response) => {
        try {
          const responseData = JSON.parse(response);
          console.log('Registro exitoso', responseData);
          alert('Cliente creado con éxito');
          this.router.navigate(['/dashboard']);
        } catch (jsonError) {
          console.log('Respuesta:', response);
          alert('Cliente creado con éxito');
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        if (error.status === 400) {
          try {
            const errorMessage = JSON.parse(error.error).message;
            alert(errorMessage);
          } catch (jsonError) {
            console.error('Error en el registro', error);
            alert('Error en el registro');
          }
        } else {
          console.error('Error en el registro', error);
          alert('Error en el registro');
        }
      }
    );
  }
}

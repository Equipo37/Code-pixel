import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/interfaces/Client';
import { UserService } from 'src/app/core/services/user.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  user: Client = {
    nombre: '',
    dni: '',
    email: '',
    celular: '',
    personahumana: true,
    empresa: '',
    password: '',
    admin: false,
    token: '',
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  onSubmit() {
    const URL = `https://code-pixel-back.onrender.com/clientes/${this.user.dni}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.user.token}`
    });
    this.http.put(URL, this.user, { headers, responseType: 'text' }).subscribe(
      (response) => {
        try {
          const responseData = JSON.parse(response);
          this.userService.setUserData(this.user)
          console.log('Ediciión exitosa', responseData);
          alert('Cliente editado con éxito');
          this.router.navigate(['/user/profile']);
        } catch (jsonError) {
          console.log('Respuesta:', response);
          alert('Cliente editado con éxito');
          this.router.navigate(['/user/profile']);
        }
      },
      (error) => {
        if (error.status === 400) {
          try {
            const errorMessage = JSON.parse(error.error).message;
            alert(errorMessage);
          } catch (jsonError) {
            console.error('Error en la edicion', error);
            alert('Error en la edicion');
          }
        } else {
          console.error('Error en la edicion', error);
          alert('Error en la edicion');
        }
      }
    );
  }

  ngOnInit(): void {
    const userData = this.userService.getUserData();
    if (userData) {
      this.user = userData;
    }
  }
}

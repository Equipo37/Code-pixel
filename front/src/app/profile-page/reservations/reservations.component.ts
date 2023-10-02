import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/core/interfaces/Client';
import { Reservation } from 'src/app/core/interfaces/Reservation';
import { Reservations } from 'src/app/core/interfaces/Reservations';
import { BackendService } from 'src/app/core/services/backend.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  user: Client = {
    dni: '',
    personahumana: false,
    nombre: '',
    email: '',
    celular: '',
    empresa: '',
    password: '',
    admin: false,
    token: ''
  };
  
  reservas = [];

  constructor(private userService: UserService, private backendService: BackendService) { }

  ngOnInit(): void {
    const userData = this.userService.getUserData()
    console.log(userData)
    if (userData?.dni) {
      this.user = userData;
      this.backendService.getReservasByDni(this.user.dni, this.user.token).subscribe((data: any) => {
        this.reservas = data

      });
    }
    
  }

}

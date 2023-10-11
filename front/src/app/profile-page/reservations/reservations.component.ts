import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/core/interfaces/Client';
import { Product } from 'src/app/core/interfaces/Product';
import { Reservation } from 'src/app/core/interfaces/Reservation';

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
    token: '',
    avatar: ''
  };

  reserva: Reservation = {
    res_id: 0,
    cli_dni1: '',
    eve_id1: 0,
    res_envio: false,
    syp_id1: [],
    res_monto: 0
  }
  
  producto: Product = {
    id: 0,
    nombre: '',
    categoriaId: 0,
    url: '',
    precio: 0,
    descripcion: ""
  }
  reservas: any = [];

  constructor(private userService: UserService, private backendService: BackendService) { }

  ngOnInit(): void {
    const userData = this.userService.getUserData()
    if (userData?.dni) {
      this.user = userData;
      this.backendService.getReservasByDni(this.user.dni, this.user.token).subscribe((data: any) => {
        this.reservas = data
        
      });
    }
    
  }

}

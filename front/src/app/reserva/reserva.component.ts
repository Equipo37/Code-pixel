import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../core/interfaces/Client';
import { Event } from '../core/interfaces/Event';
import { Product } from '../core/interfaces/Product';
import { Reservation } from '../core/interfaces/Reservation';
import { BackendService } from '../core/services/backend.service';
import { UserService } from '../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Products } from '../core/interfaces/Products';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
})
export class ReservaComponent implements OnInit {
  error: String = '';

  reserva: Reservation = {
    res_id: 0,
    cli_dni1: '',
    eve_id1: 0,
    res_envio: false,
    syp_id1: [],
    res_monto: 0,
  };

  evento: Event = {
    id: 0,
    fechainicio: new Date(),
    fechafin: new Date(),
    lugar: '',
  };

  user: Client = {
    dni: '',
    personahumana: true,
    nombre: '',
    email: '',
    celular: '',
    empresa: '',
    password: '',
    admin: false,
    token: '',
  };

  cart: any;

  productos: any = [];

  onSubmit() {
    this.BackendService.postEvento(this.evento, this.user.token).subscribe(
      (response) => {
        const eventData: Event = response;
        if (eventData) {
          this.evento = eventData;
          this.reserva.eve_id1 = eventData.id;
          console.log(this.reserva);
          this.BackendService.postReserva(
            { ...this.reserva },
            this.user.token
          ).subscribe((res) => {
            console.log(res);
            const reservaData: Reservation = res;
            if (reservaData) {
              this.reserva = reservaData;
              this.showMessage('La reserva se realizó con éxito', false);
              setTimeout(() => {
                this.router.navigate([`/user/profile`]);
                this.cartService.clearCartData();
              }, 2000);
            } else {
              this.showMessage('Hubo un error en la reserva', true);
            }
          });
        }
      }
    );
  }

  calcularMonto() {
    const fechaInicio = new Date(this.evento.fechainicio);
    const fechaFin = new Date(this.evento.fechafin);
    if (!isNaN(fechaInicio.getTime()) && !isNaN(fechaFin.getTime())) {
      const diferenciaEnMilisegundos =
        fechaFin.getTime() - fechaInicio.getTime();
      const dias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
      if (dias > 0) {
        if (this.cart.length > 0) {
          this.reserva.res_monto = this.cart.reduce((acc: number, el: any) => {
            return acc + el.precio * dias;
          }, 0);
        }
      }
    } else {
      console.error('Fechas no válidas');
    }
    if (this.reserva.res_envio == true) {
      this.reserva.res_monto += 300;
    }
  }

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private BackendService: BackendService,
    private snackBar: MatSnackBar,
    private router: Router,
    private cartService: CartService
  ) {}

  showMessage(message: string, isError: boolean = false) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: isError ? 'error-snackbar' : 'success-snackbar',
    });
  }

  idCart = [];

  ngOnInit(): void {
    this.cart = this.cartService.getCartData();
    this.idCart = this.cart.map((prod: { id: any }) => {
      return prod.id;
    });
    this.reserva.syp_id1 = this.idCart;
    const userData = this.userService.getUserData();
    if (userData?.dni) {
      this.user = userData;
      this.reserva.cli_dni1 = userData.dni;
    }
  }
}

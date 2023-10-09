import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/Client';
import { Event } from '../interfaces/Event';
import { Product } from '../interfaces/Product';
import { Reservation } from '../interfaces/Reservation';

@Injectable({
  providedIn: 'root'
})
export class BackendService {



  constructor(private http: HttpClient) { }

  obtenerProductoPorId(id: string): Observable<any> {
    const url = `https://code-pixel-back.onrender.com/syp/${id}`; 
    return this.http.get<Product>(url); 
  }

  postEvento(evento: Event, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url=`https://code-pixel-back.onrender.com/eventos`;
    return this.http.post(url, evento, {headers});
  }

  postReserva(reserva: Reservation, token: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url=`https://code-pixel-back.onrender.com/reservas`;
    return this.http.post(url, reserva, {headers})
  }

  getReservasByDni(dni: string, token: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url=`https://code-pixel-back.onrender.com/reservas/cliente/${dni}`;
    return this.http.get(url, {headers})
  }

  putCliente(user: Client): Observable<any>{
    const headers = new HttpHeaders({'Authorization': `Bearer: ${user.token}`})
    const url=`https://code-pixel-back.onrender.com/clientes/${user.dni}`
    return this.http.put(url,{headers})
  }

}
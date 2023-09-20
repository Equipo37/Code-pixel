import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  producto: any; // Define la estructura real de tu producto

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient // Inyecta HttpClient
  ) { }

  ngOnInit(): void {
    // Recuperar el ID del producto de la URL
    this.route.params.subscribe(params => {
      const productoId = params['id']; // Asegúrate de que 'id' coincida con el nombre de parámetro en tu enrutador

      // Realiza la solicitud GET al backend para obtener los detalles del producto
      this.obtenerProductoPorId(productoId).subscribe((data: any) => {
        console.log(data)
        this.producto = data;
        
      });
    });
  }

  obtenerProductoPorId(id: string): Observable<any> {
    const url = `https://code-pixel-back.onrender.com/syp/${id}`; // Define la URL para la solicitud
    return this.http.get(url); // Realiza la solicitud GET y devuelve un Observable
  }
}

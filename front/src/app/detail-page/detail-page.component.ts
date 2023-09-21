import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Product } from '../core/interfaces/Product';



@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  producto: Product = {
    id: 0,
    nombre: '',
    categoriaId: 0,
    url: ''
  }
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient 
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productoId = params['id']; 

      this.obtenerProductoPorId(productoId).subscribe((data: any) => {
        this.producto.nombre = data.syp_nombre
        this.producto.categoriaId = data.syp_categoriaId
        this.producto.url = data.syp_url
        this.producto.id = data.id
        
      });
    });
  }

  obtenerProductoPorId(id: string): Observable<any> {
    const url = `https://code-pixel-back.onrender.com/syp/${id}`; // Define la URL para la solicitud
    return this.http.get<Product>(url); // Realiza la solicitud GET y devuelve un Observable
  }
}

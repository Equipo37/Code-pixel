import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

type Producto = {
    id: number,
    syp_nombre: string,
    syp_url: string,
    syp_descripcion: null,
    syp_categoriaId: number
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

    productos: Producto[] = [];

    constructor( private http: HttpClient ) {
        
    }
    ngOnInit(): void {
        this.http.get<Producto[]>('https://code-pixel-back.onrender.com/syp').subscribe((productoList: Producto[]) => {
            this.productos = productoList.filter( producto => producto.syp_categoriaId === 2 )
        });
    }

    

}

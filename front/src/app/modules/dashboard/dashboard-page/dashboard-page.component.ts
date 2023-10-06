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
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

    productosCat1: Producto[] = [];
    productosCat2: Producto[] = [];
    productosCat3: Producto[] = [];

    constructor( private http: HttpClient ) {
        
    }
    ngOnInit(): void {
        this.http.get<Producto[]>('https://code-pixel-back.onrender.com/syp').subscribe((productoList: Producto[]) => {
            this.productosCat1 = productoList.filter( producto => producto.syp_categoriaId === 1 )
            this.productosCat2 = productoList.filter( producto => producto.syp_categoriaId === 2 )
            this.productosCat3 = productoList.filter( producto => producto.syp_categoriaId === 3 )
        });
    }

    

}

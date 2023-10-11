import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Products } from '../core/interfaces/Products';
import { Product } from '../core/interfaces/Product';
@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}


  productos: Products[] = []
  productosFiltrados: Products[] = []

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.obtenerProductosPorCategoriaId(id).subscribe((data: any) => {
        this.productos = data
        this.productosFiltrados = data
      });
    });
  }

  searchTerm: string = ''

  
  busqueda = (e: string): void =>  {
    if (e == "") {
      this.productosFiltrados = this.productos
    }
    this.productosFiltrados = this.productos.filter((item: any) => item?.syp_nombre.toLowerCase()?.includes(e.toLowerCase()));
    this.searchTerm = e;
  }

  obtenerProductosPorCategoriaId(id: string): Observable<any> {
    const url = `https://code-pixel-back.onrender.com/syp/categoria/${id}`; 
    return this.http.get<Products>(url); 
  }

  seleccionarOrden(orden: string) {
    if (orden === "menor-mayor") {
      const copiaProductos = [...this.productos];
      this.productosFiltrados = copiaProductos.sort((a: any, b: any) => a.syp_precio - b.syp_precio);
    } else if (orden === "mayor-menor") {
      const copiaProductos = [...this.productos];
      this.productosFiltrados = copiaProductos.sort((a: any, b: any) => b.syp_precio - a.syp_precio);
    } else if (orden === "alfabeticamente") {
      const copiaProductos = [...this.productos];
      this.productosFiltrados = copiaProductos.sort((a: any, b: any) => a.syp_nombre.localeCompare(b.syp_nombre));
    }
  }
}

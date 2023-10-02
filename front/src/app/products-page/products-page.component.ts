import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Products } from '../core/interfaces/Products';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}


  productos: Products[] = []
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.obtenerProductosPorCategoriaId(id).subscribe((data: any) => {
        this.productos = data
        console.log(data)        
      });
    });
  }


  obtenerProductosPorCategoriaId(id: string): Observable<any> {
    const url = `https://code-pixel-back.onrender.com/syp/categoria/${id}`; 
    return this.http.get<Products>(url); 
  }
}

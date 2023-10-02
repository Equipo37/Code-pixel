import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../core/interfaces/Product';
import { BackendService } from '../core/services/backend.service';



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
    url: '',
    precio: 0
  }

  showReservation: Boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private BackendService: BackendService
   
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productoId = params['id']; 

      this.BackendService.obtenerProductoPorId(productoId).subscribe((data: any) => {
        this.producto.nombre = data.syp_nombre
        this.producto.categoriaId = data.syp_categoriaId
        this.producto.url = data.syp_url
        this.producto.id = data.id
        this.producto.precio = data.precio
        
      });
    });
  }


  openReservation = () => {
    this.router.navigate([`/products/${this.producto.id}/reservation`]);
  }

  


}

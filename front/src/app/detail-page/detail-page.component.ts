import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../core/interfaces/Product';
import { BackendService } from '../core/services/backend.service';
import { CartService } from '../core/services/cart.service';



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
    precio: 0,
    descripcion: ""
  }

  showReservation: Boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private BackendService: BackendService,
    private cartService: CartService,
    private snackBar: MatSnackBar
   
  ) { }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productoId = params['id']; 

      this.BackendService.obtenerProductoPorId(productoId).subscribe((data: any) => {
        this.producto.nombre = data.syp_nombre
        this.producto.categoriaId = data.syp_categoriaId
        this.producto.url = data.syp_url
        this.producto.id = data.id
        this.producto.precio = data.syp_precio
        this.producto.descripcion = data.syp_descripcion
      });
    });
  }

  showMessage(message: string, isError: boolean = false) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: isError ? 'error-snackbar' : 'success-snackbar', 
    });
  }

  addToCart = () => {
    this.cartService.setCartData(this.producto)
    this.showMessage("Se agregó al carrito con éxito", false)
    this.router.navigate([`/dashboard`]);
  }

}

import { Component, OnInit } from '@angular/core';
import { Products } from '../core/interfaces/Products';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any = []
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    const cartData = this.cartService.getCartData()
    if (cartData && cartData.length > 0) {
      this.cart = cartData
      console.log(cartData)
    }
  }

}

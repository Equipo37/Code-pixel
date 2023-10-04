import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from '../core/interfaces/Products';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cart: any = []
  private cartSubscription: Subscription = new Subscription;
  constructor(private cartService: CartService, private router: Router) { }

  removeItem = (id: any) => {
    this.cartService.removeCartData(id)
  }
  
  clearData = () => {
    this.cartService.clearCartData()
  }

  confirmReservation = () => {
    this.router.navigate(['/cart/reservation'])
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCartDataObservable().subscribe((cartData: any) => {
      if (cartData && cartData.length > 0) {
        this.cart = cartData;
      } else {
        this.cart = [];
      }
    });
  }

  ngOnDestroy(): void { 
    this.cartSubscription.unsubscribe();
  }

}

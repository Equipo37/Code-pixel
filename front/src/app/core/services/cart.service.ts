import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/Product';
import { Products } from '../interfaces/Products';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cartDataKey = 'cartData';
  private cartDataSubject: BehaviorSubject<Products[] | undefined>;
  
  constructor() {
    const storedCartData = localStorage.getItem(this.cartDataKey);
    const initialCartData = storedCartData ? JSON.parse(storedCartData) : undefined;
    this.cartDataSubject = new BehaviorSubject<Products[] | undefined>(initialCartData);
  }

  setCartData(product: Product): void {
    const cart: any = this.cartDataSubject.value || []
    cart.push(product)
    
    this.cartDataSubject.next(cart);
    localStorage.setItem(this.cartDataKey, JSON.stringify(cart));
  }

  getCartData(): Products[] | undefined {
    return this.cartDataSubject.value;
  }

  clearCartData(): void {
    this.cartDataSubject.next(undefined);
    localStorage.removeItem(this.cartDataKey);
  }

  getCartDataObservable() {
    return this.cartDataSubject.asObservable();
  }
}

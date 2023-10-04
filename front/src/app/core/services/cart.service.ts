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
    console.log(product)
    const cart: any = this.cartDataSubject.value || []
    cart.push(product)
    console.log(cart)
    this.cartDataSubject.next(cart);
    localStorage.setItem(this.cartDataKey, JSON.stringify(cart));
  }

  getCartData(): Products[] | undefined {
    return this.cartDataSubject.value;
  }

  removeCartData(id: any): void {
    const cart: any = this.cartDataSubject.value || []
    const cartFiltered = cart.filter((prod: { id: any; }) => prod.id !== id)

    this.cartDataSubject.next(cartFiltered);
    localStorage.setItem(this.cartDataKey, JSON.stringify(cartFiltered));
  }

  clearCartData(): void {
    this.cartDataSubject.next(undefined);
    localStorage.removeItem(this.cartDataKey);
  }

  getCartDataObservable() {
    return this.cartDataSubject.asObservable();
  }
}

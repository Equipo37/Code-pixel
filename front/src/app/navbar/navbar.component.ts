import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { NgZone } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any
  cart: any
  constructor(
    private ngZone: NgZone, 
    private userService: UserService, 
    private cartService: CartService,
    private router: Router
    ) { }

  openCart = () => {
    this.router.navigate((['/cart']))
  }

  ngOnInit(): void {
    this.userService.getUserDataObservable().subscribe((userData) => {
      this.user = userData;
    });
    this.cartService.getCartDataObservable().subscribe((cartData) => {
      this.cart = cartData
    })
  }
}

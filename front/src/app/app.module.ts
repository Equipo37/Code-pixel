import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from '../app/register/register.component';
import { LoginComponent } from './login/login.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductListComponent } from './products-page/product-list/product-list.component';
import { ProductCardComponent } from './products-page/product-list/product-card/product-card.component';
import { LogoutComponent } from './logout/logout.component';
import { EditProfileComponent } from './profile-page/edit-profile/edit-profile.component';
import { ReservaComponent } from './reserva/reserva.component';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { ReservationsComponent } from './profile-page/reservations/reservations.component';
import { CartComponent } from './cart/cart.component';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, DetailPageComponent, ProfilePageComponent, NavbarComponent, ProductsPageComponent, ProductListComponent, ProductCardComponent, LogoutComponent, EditProfileComponent, ReservaComponent, ReservationsComponent, CartComponent],
  imports: [BrowserModule, MatIconModule, AppRoutingModule, HttpClientModule, FormsModule, BrowserAnimationsModule, MatSlideToggleModule, MatCardModule, MatButtonModule, MatMenuModule, MatSnackBarModule, MatTableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

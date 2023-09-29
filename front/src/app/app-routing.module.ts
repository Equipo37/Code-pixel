import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { LogoutComponent } from './logout/logout.component';
import { EditProfileComponent } from './profile-page/edit-profile/edit-profile.component';
import { ReservaComponent } from './reserva/reserva.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: "products/:id",
    component: DetailPageComponent
  }, {
    path: "products/:id/reservation",
    component: ReservaComponent
  },
  {
    path: "user/profile",
    component: ProfilePageComponent
  }, {
    path: "user/profile/edit",
    component: EditProfileComponent
  },
  {
    path: "products/category/:id",
    component: ProductsPageComponent
  },
  {
    path: "logout",
    component: LogoutComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

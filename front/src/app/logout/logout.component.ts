import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../core/interfaces/Client';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  user: any
  logoutUser: Client = {
    nombre: "",
    dni: "",
    personahumana: true,
    email: "",
    empresa: "",
    celular: "",
    admin: false,
    password: "",
    token: "",
  }
  constructor(private userService: UserService, private router: Router) { 
    setTimeout(() => {
      this.userService.setUserData(this.logoutUser)
      this.router.navigate(['/login']); 
    }, 2000);

  }

  ngOnInit(): void {
    this.user = this.userService.getUserData() ;

  }

}

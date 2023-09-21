import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any

  constructor(private ngZone: NgZone, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserDataObservable().subscribe((userData) => {
      this.user = userData;
    });
  }
}

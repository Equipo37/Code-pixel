import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: any
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUserData();
    console.log(this.user)
  }

}


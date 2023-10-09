import { Component } from '@angular/core';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  user = {
    dni: '',
    personahumana: false,
    nombre: '',
    email: '',
    celular: '',
    empresa: '',
    password: '',
    admin: false,
    token: '',
    avatar: '',
  };
  imageUrl = this.user.avatar;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userData = this.userService.getUserData();
    if (userData?.nombre) {
      this.user = userData;
    }
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.readAndStoreImage(file);
    }
  }

  readAndStoreImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const imageBase64 = reader.result as string;
      this.imageUrl = imageBase64;
      this.user.avatar = this.imageUrl
      this.userService.setUserData(this.user);
    };
    reader.readAsDataURL(file);
  }
}

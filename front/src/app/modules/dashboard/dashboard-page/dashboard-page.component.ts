import { Component } from '@angular/core';

interface Productos {
  categoria: string,
  nombre: string,
  material: string,
  color: string,
  medida: string,
  imgUrl: string
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {

  productos: Productos[] = [];

  constructor() {
    this.productos = [
        {
            categoria: "sillas",
            nombre: "SILLON",
            material: "madera",
            color: "marron",
            medida: "12x12x12",
            imgUrl: "https://res.cloudinary.com/dgkyrag0b/image/upload/v1692196212/Productos/Sillones/Sillon1.svg"
        },
        {
          categoria: "sillas",
            nombre: "SILLA",
            material: "madera",
            color: "marron",
            medida: "12x12x12",
            imgUrl: "https://res.cloudinary.com/dgkyrag0b/image/upload/v1692194932/Productos/Sillas/Silla1.svg"
        },
        {
            categoria: "sillas",
            nombre: "MESA",
            material: "madera",
            color: "marron",
            medida: "12x12x12",
            imgUrl: "https://res.cloudinary.com/dgkyrag0b/image/upload/v1692195722/Productos/Mesas/Mesa1.svg"
        },

    ]
  }

}

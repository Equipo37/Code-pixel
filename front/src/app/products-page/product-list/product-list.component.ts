import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'src/app/core/interfaces/Products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input()
  products: Products[] = []; 
  constructor() { }

  ngOnInit(): void {
  }

}

import { ProductService } from './../services/product.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    HeaderComponent
],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

  productsData: any;
  cardColors: any = [];

constructor(private productService : ProductService) { }
ngOnInit() : void{
  this.loadProducts();
}

loadProducts() {
  this.productService.getAllProducts().subscribe({
    next: (res) => {
      this.productsData = res;
    },
    error: (err) => {
      console.error(err);
    }
  });

  this.cardColors = ["card text-bg-primary", "card text-bg-danger", "card text-bg-secondary"];


}

cardColorsMap: { [key: string]: string } = {
  "Contemporary Fiction": "card text-bg-primary",
  "Russian Classics": "card text-bg-danger",
  "Classic Literature": "card text-bg-secondary",
  // Add more categories as needed
};

getCardClass(category: string): string {
  return this.cardColorsMap[category] || "card text-bg-light"; // Default color
}

}

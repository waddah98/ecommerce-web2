import { Component } from '@angular/core';
import { HeaderSidebarComponent } from "../header-sidebar/header-sidebar.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeaderSidebarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}

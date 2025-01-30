import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent {

  menuItems = [
    {
      name: "Categories",
      icon: "bi bi-tags-fill",
      link: "/admin/categories"
    },
    {
      name: "Products",
      icon: "bi bi-shop",
      link: "/admin/products"
    },
    {
      name: "Users",
      icon: "bi bi-people-fill",
      link: "/admin/users"
    },
    
  ];

}

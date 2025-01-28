import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header-sidebar.component.html',
  styleUrl: './header-sidebar.component.scss'
})
export class HeaderSidebarComponent {
  sidelineItems = [
    {
      name: "Home",
      icon: "bi bi-house-door-fill",
      link: "/admin/home"
    },
    {
      name: "Products",
      icon: "bi bi-shop",
      link: "/admin/products"
    },
    {
      name: "Categories",
      icon: "bi bi-tags-fill",
      link: "/admin/categories"
    }
  ];
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from "../categories/categories.component";
import { ProductsComponent } from "../products/products.component";
import { UsersComponent } from "../users/users.component";

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    RouterLink,
    CategoriesComponent,
    ProductsComponent,
    UsersComponent
],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent implements OnInit, OnDestroy{
  ngOnInit(): void {
    // this.loadedPage = "Categories";
  }
  ngOnDestroy(): void {
    // this.loadedPage = ""
  }

  loadedPage:string = "Categories";

  menuItems = [
    {
      name: "Categories",
      tagId: "categoriesBtn",
      icon: "bi bi-tags-fill",
      link: "/admin/categories",
      clicked: true,
    },
    {
      name: "Products",
      tagId: "productsBtn",
      icon: "bi bi-shop",
      link: "/admin/products",
      clicked: false,
    },
    {
      name: "Users",
      tagId: "usersBtn",
      icon: "bi bi-people-fill",
      link: "/admin/users",
      clicked: false,
    },
    
  ];

  public clickedBtnStyle = {
    'background-color':'#0944ba',
    'padding': '10px',
    'color': 'white',
    'font-weight': 'bold',
    'font-size': '18px',
    'border-radius': '10px',
    'border-color': '',
  };

  public btnStyle = {
    'background-color':'white',
    'padding': '10px',
    'color': '#0944ba',
    'font-size': '18px',
    'border': '1px solid',
    'border-radius': '10px',
    'border-color': '#0944ba',
  };

  onNavBtnClick(item:any){
    this.loadedPage = item.name;
    this.menuItems.forEach(item => {
      item.clicked = false;
    });
    item.clicked = true;
    console.log("🚀 ~ HomeAdminComponent ~ onNavBtnClick ~ this.loadedPage:", this.loadedPage);
    return this.loadedPage;
  }

}

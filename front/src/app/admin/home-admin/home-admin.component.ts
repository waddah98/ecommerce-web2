import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from "../categories/categories.component";
import { ProductsComponent } from "../products/products.component";
import { UsersComponent } from "../users/users.component";
import { HeaderComponent } from "../../header/header.component";
import { CategoriesService } from '../../services/categories.service';

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
    UsersComponent,
    HeaderComponent
],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent implements OnInit, OnDestroy{
  fetching: boolean = false;
  categoriesData: any;

  currentPage: number = 1;
  totalPages: number = 0;
  constructor(
    private categoriesService: CategoriesService,
  ){}
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
    return this.loadedPage;
  }

  loadCategories(page:number){
    this.fetching = true;
    this.categoriesService.getAllCategories().subscribe({
      next: (res:any)=>{
        this.categoriesData = res.categories;
        this.totalPages = res.pagination.total;

      },
      error: (err:any)=>{
        this.fetching = false;
      },
      complete: ()=>{
        this.fetching = false;
      },
    })
  }

  // createRange(totalPages:number): number[] {
  //   return Array.from({length: totalPages}, (_, i) => i + 1);
  // }

  // changePage(page: number) {
  //   if (page >= 1 && page <= this.totalPages) {
  //     this.loadCategories(page);
  //   }
  // }

}

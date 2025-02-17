import { CategoriesService } from './../../services/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{



  constructor(private categoriesService:CategoriesService){}

  ngOnInit(): void {
    this.loadCategories(this.currentPage);
  }
;
  fetching : boolean = false;
  categoriesData : any;
  paginationData : any;

  currentPage : number = 1;
  totalPages: number = 0;

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

  createRange(totalPages:number): number[] {
    return Array.from({length: totalPages}, (_, i) => i + 1);
  }

  readonly dialog = inject(MatDialog);
  openAddDialog(){
    const dialogRef = this.dialog.open(AddCategoryComponent);
  }
  openEditDialog(categoryId: number ){
    const dialogRef = this.dialog.open(EditCategoryComponent);
    const instance = dialogRef.componentInstance;
    instance.categoryId = categoryId;
  }
  openDeleteDialog(categoryId: number ){
    const dialogRef = this.dialog.open(DeleteCategoryComponent);
    const instance = dialogRef.componentInstance;
    instance.categoryId = categoryId;
  }
}

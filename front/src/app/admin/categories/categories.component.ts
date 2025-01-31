import { Component, inject } from '@angular/core';
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
export class CategoriesComponent {
  categoriesData:any = [
    {
      image:"https://loremflickr.com/640/480?lock=6145031270301696",		
      categoryLabel:"Steel",		
      productsNumber:3,
    },
    
  ]

  readonly dialog = inject(MatDialog);
  openAddDialog(){
    const dialogRef = this.dialog.open(AddCategoryComponent);
  }
  openEditDialog(categoryId: string ){
    const dialogRef = this.dialog.open(EditCategoryComponent);
    const instance = dialogRef.componentInstance;
    instance.categoryId = categoryId;
  }
  openDeleteDialog(categoryId: string ){
    const dialogRef = this.dialog.open(DeleteCategoryComponent);
    const instance = dialogRef.componentInstance;
    // instance.categoryId = categoryId;
  }
}

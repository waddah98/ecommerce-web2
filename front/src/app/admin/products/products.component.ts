import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteCategoryComponent } from '../categories/delete-category/delete-category.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productsData:any = [
    {
      image:"https://loremflickr.com/640/480?lock=3635778403958784",		
      category:"Concrete",		
      label:"Generic Soft Car",		
      price:"588.00"
    },
    {
      image:"https://loremflickr.com/640/480?lock=623936706445312",		
      category:"Wooden",		
      label:"Luxurious Soft Bike",		
      price:"33.00"
    },
    {
      image:"https://loremflickr.com/640/480?lock=2539282191351808",		
      category:"Steel",		
      label:"Luxurious Plastic Fish",		
      price:"456.00"
    },
  ]

  columnNames = Object.keys(this.productsData[0]);

  readonly dialog = inject(MatDialog);
  openAddDialog(){
    const dialogRef = this.dialog.open(AddProductComponent);
  };
  openEditDialog(productId: string ){
      const dialogRef = this.dialog.open(EditProductComponent);
      const instance = dialogRef.componentInstance;
      instance.productId = productId;
    }
    openDeleteDialog(productId: string ){
      const dialogRef = this.dialog.open(DeleteProductComponent);
      const instance = dialogRef.componentInstance;
      instance.productId = productId;
    }


}
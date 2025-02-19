import { ProductService } from './../../services/product.service';
import { Component, inject, OnInit } from '@angular/core';
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
export class ProductsComponent implements OnInit {
  constructor(private productService:ProductService) { }
  productsData:any;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.productsData = data;
        console.log("🚀 ~ ProductsComponent ~ this.productService.getAllProducts ~ this.productsData:", this.productsData)
      },
      error: (error) => {console.log(error);},
      complete: () => {console.log('completed');}
    })
  };


  readonly dialog = inject(MatDialog);
  openAddDialog(){
    const dialogRef = this.dialog.open(AddProductComponent);
  };
  openEditDialog(productId: number){
      const dialogRef = this.dialog.open(EditProductComponent);
      const instance = dialogRef.componentInstance;
      instance.productId = productId;
    }
    openDeleteDialog(productId: number){
      const dialogRef = this.dialog.open(DeleteProductComponent);
      const instance = dialogRef.componentInstance;
      instance.productId = productId;
    }


}

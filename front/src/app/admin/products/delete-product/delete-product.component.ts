import { Component, Input } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [
    MatDialogModule,
  ],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss'
})
export class DeleteProductComponent {
  constructor(
    private productService: ProductService,
    private dialogRef: MatDialogRef<DeleteProductComponent>,
  ){
    this.dialog = dialogRef;
  }

  @Input() productId !: number;
  private dialog !: MatDialogRef<DeleteProductComponent>;

  deleteProduct(){
    this.productService.deleteProduct(this.productId).subscribe({
      next: (res:any)=>{
        alert('Product deleted successfully');
        this.closeDialog();
      },
      error: (err:any)=>{
        alert('Error deleting product');
        console.log(err);
      }
    });
  }

  closeDialog(){
    this.dialog.close();
  }
}

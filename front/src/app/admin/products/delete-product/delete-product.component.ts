import { Component, Input } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

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
  @Input() productId !: number;
  private dialog !: MatDialogRef<DeleteProductComponent>;

  deleteProduct(){}

  closeDialog(){
    this.dialog.close();
  }
}

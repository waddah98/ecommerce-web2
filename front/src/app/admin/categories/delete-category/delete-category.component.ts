import { Component, Input } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../../services/categories.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-delete-category',
  standalone: true,
  imports: [MatDialogModule,],
  providers:[MessageService],
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.scss'
})
export class DeleteCategoryComponent {

  constructor(
    private categoriesService:CategoriesService,
    private dialogRef: MatDialogRef<DeleteCategoryComponent>,
    private messageService: MessageService
  ){
    this.dialog = dialogRef;
  }

  @Input() categoryId !: number;
  private dialog !: MatDialogRef<DeleteCategoryComponent>;

  deleteCategory(){
    this.categoriesService.deleteCategory(this.categoryId).subscribe({
      next: (response) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Category deleted successfully!'});
        this.dialog.close();

      },
      error: (err) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to delete category.'});
      },
      complete: ()=>{
        this.dialog.close();
      }
    })
  }

  closeDialog(){
    this.dialog.close();
  }
}

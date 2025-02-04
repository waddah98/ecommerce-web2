import { Component, Input } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-delete-category',
  standalone: true,
  imports: [
    MatDialogModule,
  ],
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.scss'
})
export class DeleteCategoryComponent {

  constructor(private categoriesService:CategoriesService){}

  @Input() categoryId !: number;
  private dialog !: MatDialogRef<DeleteCategoryComponent>;
  
  deleteCategory(){
    this.categoriesService.deleteCategory(this.categoryId).subscribe({
      next: (response) => {
        alert('Category deleted successfully!');
        this.closeDialog();
      },
      error: (err) => {
        alert('Failed to delete category.');
      },
    })
  }

  closeDialog(){
    this.dialog.close();
  }
}

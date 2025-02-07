import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent implements OnInit{

  constructor(private categoriesService: CategoriesService){}

  @Input() categoryId !: number;
  editCategoryForm !: FormGroup;
  private dialog!: MatDialogRef<EditCategoryComponent>;

  ngOnInit(): void {
    this.editCategoryForm = new FormGroup({
      label: new FormControl('', []),
      description: new FormControl('', []),
    });
  }

  editCategory(){
    if(this.editCategoryForm.invalid){
      alert('Please fill all required fields');
      return;
    }
    const formData = new FormData();
    formData.append('label', this.editCategoryForm.get('label')?.value);
    formData.append('description', this.editCategoryForm.get('description')?.value);

    this.categoriesService.updateCategory(this.categoryId, formData).subscribe({
      next: (response) => {
        alert('Category updated successfully!');
        this.closeDialog();
      },
      error: (err) => {
        alert('Failed to update category.');
      },
    })
  }

  closeDialog(){
    this.editCategoryForm.reset();
    this.dialog.close();
  }

}

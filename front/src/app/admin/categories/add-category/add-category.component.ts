import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../../services/categories.service';


@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit{
    constructor(private categoriesService: CategoriesService){}
  
  
  addCategoryForm !: FormGroup;
  private dialog!: MatDialogRef<AddCategoryComponent>;
  
  ngOnInit(): void {

    this.addCategoryForm = new FormGroup({
      label: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });


  }

  addCategory(){
    if (this.addCategoryForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('label', this.addCategoryForm.get('label')?.value);
    formData.append('description', this.addCategoryForm.get('description')?.value);

    this.categoriesService.addCategory(formData).subscribe({
      next: (response) => {
        alert('Category added successfully!');
        this.closeDialog();
      },
      error: (err) => {
        alert('Failed to add category.');
      },
    })
  }

  closeDialog(){
    this.addCategoryForm.reset();
    this.dialog.close();
  }

}

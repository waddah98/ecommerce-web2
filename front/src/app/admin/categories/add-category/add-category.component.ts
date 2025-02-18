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
    constructor(
      private categoriesService: CategoriesService,
      private dialogRef: MatDialogRef<AddCategoryComponent>,

    ){
      this.dialog = dialogRef;
    }


  addCategoryForm !: FormGroup;
  private dialog!: MatDialogRef<AddCategoryComponent>;

  ngOnInit(): void {
    this.addCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  addCategory(){
    if (this.addCategoryForm.invalid) {
      return;
    }

    this.categoriesService.addCategory(this.addCategoryForm.value).subscribe({
      next: (response) => {
        alert('Category added successfully!');
        this.addCategoryForm.reset();
        this.dialog.close();
      },
      error: (err) => {
        alert('Failed to add category.');
      },
      complete: ()=>{
        this.dialog.close();
        this.addCategoryForm.reset();
      }
    })
  }

  closeDialog(){

  }

}

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
  fetching: boolean = false;
  categoriesData: any;
  oneCategoryData: any;

  currentPage: number = 1;
  totalPages: number=0;

  constructor(private categoriesService: CategoriesService){}

  @Input() categoryId !: number;
  editCategoryForm !: FormGroup;
  private dialog!: MatDialogRef<EditCategoryComponent>;

  ngOnInit(): void {
    this.editCategoryForm = new FormGroup({
      name: new FormControl('', []),
    });

    this.fetchCategoryById();
  }

  editCategory(){
    if(this.editCategoryForm.invalid){

      // alert('Please fill all required fields');
      return;
    }

    this.categoriesService.updateCategory(this.categoryId, this.editCategoryForm.value).subscribe({
      next: (response) => {
        alert('Category updated successfully!');

        this.closeDialog();
        this.loadCategories();
      },
      error: (err) => {
        alert('Failed to update category.');
      },
      complete: ()=>{
        this.closeDialog();
      }
    })
  }

  closeDialog(){
    this.editCategoryForm.reset();
    this.dialog.close();
  }

  loadCategories(page:number = 1){
    this.fetching = true;
    this.categoriesService.getAllCategories().subscribe({
      next: (res:any)=>{
        this.categoriesData = res.categories;
        this.totalPages = res.pagination.total;

      },
      error: (err:any)=>{
        this.fetching = false;
      },
      complete: ()=>{
        this.fetching = false;
      },
    })
  }

  fetchCategoryById(){
    this.categoriesService.getCategoryById(this.categoryId).subscribe({
      next: (res:any)=>{
        this.oneCategoryData = res.name;
        this.editCategoryForm.patchValue({
          name: res.name,
        });
      },
      error: (err:any)=>{
        this.fetching = false;
      },
    })
  }

}

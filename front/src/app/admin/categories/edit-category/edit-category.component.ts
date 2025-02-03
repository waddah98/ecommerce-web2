import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

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
  @Input() categoryId !: string;
  editCategoryForm !: FormGroup;
  private dialog!: MatDialogRef<EditCategoryComponent>;

  ngOnInit(): void {
    this.editCategoryForm = new FormGroup({
      label: new FormControl('', []),
      description: new FormControl('', []),
    });
  }

  editCategory(){}
  closeDialog(){
    this.editCategoryForm.reset();
    this.dialog.close();
  }

}

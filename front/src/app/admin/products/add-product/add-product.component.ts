import { CategoriesService } from './../../../services/categories.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,

  ],
  providers:[MessageService],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{
  constructor(
    private productService: ProductService,
    private categoriesService:CategoriesService,
    private dialogRef: MatDialogRef<AddProductComponent>,
    private messageService: MessageService
  ){
    this.dialog = dialogRef;
  }
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null; // Holds the Base64-encoded image URL

  categoriesData: any;
  addProductForm !: FormGroup
  private dialog!: MatDialogRef<AddProductComponent>;


  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      isbn: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      category_id: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      published_year: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });

    this.loadCategories();
  };
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    this.addProductForm.get('price')?.setValue(numericValue, { emitEvent: false });
  };
  onKeyPress(event: KeyboardEvent): boolean {
    const charCode = event.key.charCodeAt(0);
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false; // Prevent non-numeric input
    }
    return true;
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

    // Validate file type (e.g., allow only images)
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Only JPEG, PNG, and GIF files are allowed.',});
      return;
    }

    this.selectedFile = file;
    this.previewFile(file);
    }
  }

  previewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string; // Set the Base64-encoded image URL
      this.addProductForm.get('file')?.setValue(this.previewUrl); // Update the form control
    };
    reader.readAsDataURL(file); // Converts the file to a Base64-encoded string
  }

  addProduct(){
    if (this.addProductForm.invalid) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all required fields',});
      return;
    };

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    formData.append('isbn', this.addProductForm.get('isbn')?.value);
    formData.append('category_id', this.addProductForm.get('category_id')?.value);
    formData.append('title', this.addProductForm.get('title')?.value);
    formData.append('author', this.addProductForm.get('author')?.value);
    formData.append('published_year', this.addProductForm.get('published_year')?.value);
    formData.append('description', this.addProductForm.get('description')?.value);
    formData.append('quantity', this.addProductForm.get('quantity')?.value);
    formData.append('price', this.addProductForm.get('price')?.value);

    this.productService.addProduct(formData).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully!' });
        this.addProductForm.reset();
        this.dialog.close();

      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add product' });
    }
  })
  }

  loadCategories(){
    this.categoriesService.getAllCategories().subscribe({
      next: (data:any) => {
        this.categoriesData = data.categories;
      },
      error: (error) => {console.log(error);},
      complete: () => {console.log('completed');}
    })
  }
}

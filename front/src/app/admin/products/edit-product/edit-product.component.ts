import { CategoriesService } from './../../../services/categories.service';
import { ProductService } from './../../../services/product.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit{
  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private dialogRef:MatDialogRef<EditProductComponent>
  ){
    this.dialog = dialogRef;
  }

  @Input() productId !: number;
  editProductForm !: FormGroup;
  private dialog!: MatDialogRef<EditProductComponent>;

  fetching: boolean = false;
  categoriesData: any;

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null; // Holds the Base64-encoded image URL

  ngOnInit(): void{
    this.editProductForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      published_year: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      category_id: new FormControl('', [Validators.required]),
    })
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    this.editProductForm.get('price')?.setValue(numericValue, { emitEvent: false });
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
      alert('Only JPEG, PNG, and GIF files are allowed.');
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
      this.editProductForm.get('file')?.setValue(this.previewUrl); // Update the form control
    };
    reader.readAsDataURL(file); // Converts the file to a Base64-encoded string
  }

  editProduct(){
    if (this.editProductForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    formData.append('title', this.editProductForm.get('title')?.value);
    formData.append('author', this.editProductForm.get('author')?.value);
    formData.append('description', this.editProductForm.get('description')?.value);
    formData.append('published_year', this.editProductForm.get('published_year')?.value);
    formData.append('price', this.editProductForm.get('price')?.value);
    formData.append('quantity', this.editProductForm.get('quantity')?.value);
    formData.append('category_id', this.editProductForm.get('category_id')?.value);
  }

  fetchProductById(){
    this.productService.getProductById(this.productId).subscribe({
      next: (data) => {
        this.editProductForm.get('title')?.setValue(data.title);
        this.editProductForm.get('author')?.setValue(data.author);
        this.editProductForm.get('description')?.setValue(data.description);
        this.editProductForm.get('published_year')?.setValue(data.published_year);
        this.editProductForm.get('price')?.setValue(data.price);
        this.editProductForm.get('quantity')?.setValue(data.quantity);
        this.editProductForm.get('category_id')?.setValue(data.category_id);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      }
  });
}

loadCategories(page:number = 1){
  this.fetching = true;
  this.categoriesService.getAllCategories().subscribe({
    next: (res:any)=>{
      this.categoriesData = res.categories;

    },
    error: (err:any)=>{
      this.fetching = false;
    },
    complete: ()=>{
      this.fetching = false;
    },
  })
}

  closeDialog(){
    this.dialog.close();
  }
}

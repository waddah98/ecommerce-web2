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
  @Input() productId !: number;
  editProductForm !: FormGroup;
  private dialog!: MatDialogRef<EditProductComponent>;
  
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null; // Holds the Base64-encoded image URL

  ngOnInit(): void{
    this.editProductForm = new FormGroup({
      isbn: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
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
      formData.append('file', this.selectedFile);
    }
    formData.append('isbn', this.editProductForm.get('isbn')?.value);
    formData.append('title', this.editProductForm.get('title')?.value);
    formData.append('description', this.editProductForm.get('description')?.value);
    formData.append('category', this.editProductForm.get('category')?.value);
    formData.append('price', this.editProductForm.get('price')?.value);
  }

  closeDialog(){
    this.dialog.close();
  }
}

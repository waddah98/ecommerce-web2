import { Component, Input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

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
  @Input() categoryId !: string;
  
}

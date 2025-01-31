import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

}

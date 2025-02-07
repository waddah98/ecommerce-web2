import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GalleriaModule } from 'primeng/galleria';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    GalleriaModule,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

}

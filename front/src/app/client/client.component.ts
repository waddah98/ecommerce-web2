import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    HeaderComponent
],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

  images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);



ngOnInit() {}

}

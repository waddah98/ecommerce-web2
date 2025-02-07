import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GalleriaModule } from 'primeng/galleria';
import { PhotoService } from '@/service/photoservice';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    GalleriaModule,
  ],
  providers: [PhotoService],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  images = model([]);

  responsiveOptions: any[] = [
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
];

constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images: never[]) => this.images.set(images));
    }

}

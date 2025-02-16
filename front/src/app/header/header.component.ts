import { CommonModule } from '@angular/common';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private authservice:AuthService){}

  getRole(): string{
    return this.authservice.getRole()
  }
  logout(){
    this.authservice.logout();
  }

}

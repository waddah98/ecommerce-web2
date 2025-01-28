import { Component } from '@angular/core';
import { HeaderSidebarComponent } from "../header-sidebar/header-sidebar.component";

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [HeaderSidebarComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent {

}

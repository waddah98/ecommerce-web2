import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  usersData:any = [
    {
      email:"ivan_daniel86@hotmail.com",
      phoneNumber:"00 000 000",
      name:"Moses Shields",
      registrationDate:"02/11/2024",
      numberOfFavourites:19,
    },
    {
      email:"jerald.monahan@hotmail.com",
      phoneNumber:"11 111 111",
      name:"Kristin Hessel",
      registrationDate:"02/01/2025",
      numberOfFavourites:3,
    },
    
  ]
}

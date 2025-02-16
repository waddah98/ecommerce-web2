import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { error } from 'console';
import { ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  constructor(private adminService:AdminService){}
  ngOnInit(): void {}

  fetching: boolean = false;
  usersData:any;
  getAllUsers(){
    this.fetching = true;
    this.adminService.fetchUsers().subscribe({
      next: (response:any)=>{
        this.usersData = response; //in the  backend add pagination data to the response
        //the number of lines returned is false verify it
      },
      error: (err:any)=>{
        this.fetching = false;
      },
      complete: () => {
        this.fetching = false;
      }
    })
  }
}

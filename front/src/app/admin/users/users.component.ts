import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { error } from 'console';
import { ɵInternalFormsSharedModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  providers:[DatePipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  constructor(
    private adminService:AdminService,
    private datePipe: DatePipe,
  ){}
  ngOnInit(): void {
    this.getAllUsers();
  }

  fetching: boolean = false;
  usersData:any;
  getAllUsers(){
    this.fetching = true;
    this.adminService.fetchUsers().subscribe({
      next: (response:any)=>{
        this.usersData = response;
      },
      error: (err:any)=>{
        this.fetching = false;
      },
      complete: () => {
        this.fetching = false;
      }
    })
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || 'Invalid Date';
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.api_URL + "/modules/users/userRoutes.php";
  constructor(
    private http: HttpClient,
    private router:Router
  ) { }

  fetchUsers(){
    return this.http.get(`${this.apiUrl}/fetchAllUsers`);
  }

}

import { HttpClient } from '@angular/common/http';
import { APP_ID, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
    private apiUrl = environment.api_URL;

  constructor(private http: HttpClient) {}

  addCategory(formData: FormData){
    return this.http.post(`${this.apiUrl}/categories`, formData);
  }
}

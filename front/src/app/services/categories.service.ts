import { HttpClient, HttpParams } from '@angular/common/http';
import { APP_ID, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
    private apiUrl = `${environment.api_URL}/categories`;

  constructor(private http: HttpClient) {}

  addCategory(formData: FormData){
    return this.http.post(`${this.apiUrl}/addCategory`, formData);
  }

  updateCategory(categoryId:number, formData:FormData){
    return this.http.put(`${this.apiUrl}/updateCategory/${categoryId}`, formData);
  }

  getAllCategories(){
    return this.http.get(`${this.apiUrl}/fetchAll`);
  }
  getCategoryById(categoryId:number){
    return this.http.get(`${this.apiUrl}/fetchById/${categoryId}`);
  }

  deleteCategory(categoryId:number){
    return this.http.delete(`${this.apiUrl}/deleteCategory/${categoryId}`);
  }
}

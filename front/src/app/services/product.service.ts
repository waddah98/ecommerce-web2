import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.api_URL;
  
  constructor(private http: HttpClient) { }
  
  addProduct(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.api_URL + "/modules/products/productRoutes.php";

  constructor(private http: HttpClient) { }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/addProduct`, formData);
  }

  updateProduct(productId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateProduct/${productId}`, formData);
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fetchAllProducts`);
  }
  getProductById(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/fetchProductById/${productId}`);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteProduct/${productId}`);
  }
}

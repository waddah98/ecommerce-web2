import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.api_URL+"/modules/users/userRoutes.php";

  constructor(private http: HttpClient) { }

  signup(userData: { name: string, email: string, password: string, role?: string }): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, userData);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    const url = `${this.apiUrl}/signin`;
    return this.http.post(url, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): any{
    const token = localStorage.getItem('authToken');
    return token;
  }

  getRole():string{
    const decoded_token = this.decryptToken();

    return decoded_token.payload.role || undefined
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Add logic to verify token's validity (e.g., check if it’s expired)
    return token !== null;
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  decryptToken():any{
    try{
      const jwtParts = this.getToken().split('.');
      const header = JSON.parse(this.base64UrlDecode(jwtParts[0]));
      const payload = JSON.parse(this.base64UrlDecode(jwtParts[1]));
      return{header:header, payload:payload};

    }catch(error){
      console.log("🚀 ~ HomeUserPage ~ decryotToken ~ error:", error);
      return null;
    }
  }

  base64UrlDecode(base64Url: string): string {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = atob(base64); // Decode Base64
    return decodedData;
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.api_URL + "/modules/users/userRoutes.php";

  constructor(
    private httpClient: HttpClient
  ) { }

  // getFavorite
}

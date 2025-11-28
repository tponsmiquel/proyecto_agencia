import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Client {
  id: number;
  client_type: string;
  first_name: string;
  last_name: string;
  document_type: string;
  document_number: string;
  email: string;
  phone_mobile: string | null;
  phone_landline: string | null;
  address: string;
  city: string;
  postal_code: string;
  province: string;
  country: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}


@Injectable({
  providedIn: 'root',
})
export class ClientsService {

  // Ajustaremos esta URL cuando me digas cuál es tu endpoint Django real
  private apiUrl = 'http://localhost:8000/api/clients/';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }
}


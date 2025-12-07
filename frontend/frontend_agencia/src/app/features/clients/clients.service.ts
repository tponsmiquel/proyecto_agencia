import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  // CLIENTS //
  private apiUrl = 'http://localhost:8000/api/clients/';

  constructor(private http: HttpClient) {}

  public getClients(params?: HttpParams): Observable<Client[]> {
  return this.http.get<Client[]>(this.apiUrl, { params });
}

  public getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}${id}/`);

}

  public createClient(clientData: Partial<Client>): Observable<Client> {
  return this.http.post<Client>(this.apiUrl, clientData);
}

public updateClient(id: number, clientData: Partial<Client>): Observable<Client> {
  return this.http.patch<Client>(`${this.apiUrl}${id}/`, clientData);
}

// DOSSIERS //

public getClientDossiers(clientId: number): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:8000/api/dossiers/?client=${clientId}`);
}

// INVOICES //
public getClientInvoices(clientId: number): Observable<any[]> {
  let params = new HttpParams().set('client', clientId);
  return this.http.get<any[]>(`http://localhost:8000/api/invoices/`, { params });
}



}

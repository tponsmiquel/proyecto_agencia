import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Service {
  id: number;
  dossier: number;
  service_type: string;
  supplier: number | null;

  booking_date: string | null;
  start_date: string | null;
  departure_date: string | null;

  origin: string | null;
  destination: string | null;
  description: string | null;

  ticket_number: string | null;
  locator: string | null;

  total_client: string;
  total_supplier: string;
}

@Injectable({ providedIn: 'root' })
export class ServicesService {

  private apiUrl = 'http://localhost:8000/api/services/';

  constructor(private http: HttpClient) {}

  public getServicesByDossier(dossierId: number): Observable<Service[]> {
    const params = new HttpParams().set('dossier', dossierId);
    return this.http.get<Service[]>(this.apiUrl, { params });
  }
}

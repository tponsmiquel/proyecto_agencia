import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Dossier {
  id: number;
  code: string;
  title: string | null;
  status: string;
  client: number;
  client_full_name?: string;

  // Totales económicos
  total_pvp: string;
  total_paid: string;
  total_pending: string;
  total_invoiced: string;

  // Fechas de viaje
  start_date: string | null;
  end_date: string | null;

  // Info adicional opcional
  service_count?: number;
}


@Injectable({ providedIn: 'root' })
export class DossiersService {

  private apiUrl = 'http://localhost:8000/api/dossiers/';

  constructor(private http: HttpClient) {}

  public getDossiers(params?: HttpParams): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  public getDossier(id: number): Observable<Dossier> {
    return this.http.get<Dossier>(`${this.apiUrl}${id}/`);
  }

  public updateDossier(id: number, data: Partial<Dossier>): Observable<Dossier> {
  return this.http.patch<Dossier>(`${this.apiUrl}${id}/`, data);
  }
}

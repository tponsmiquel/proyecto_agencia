import { HttpParams } from '@angular/common/http';

export function buildDossierQuery(filters: any): HttpParams {
  let params = new HttpParams();

  if (filters.code) {
    params = params.set('code', filters.code);
  }

  if (filters.title) {
    params = params.set('title', filters.title);
  }

  if (filters.status) {
    params = params.set('status', filters.status);
  }

  // type person/company
  if (filters.client_type && filters.client_type !== 'all') {
    params = params.set('client_type', filters.client_type);
  }

  // multifiltro: nombre, documento, email, teléfono
  if (filters.client_search) {
    params = params.set('search', filters.client_search);
  }

  return params;
}

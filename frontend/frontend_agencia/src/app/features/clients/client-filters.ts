import { HttpParams } from '@angular/common/http';

export interface ClientFilters {
  name?: string;
  document_number?: string;
  email?: string;
}

export function buildClientQuery(filters: any): HttpParams {
  let params = new HttpParams();

  if (filters.search) {
    params = params.set('search', filters.search);
  }

  return params;
}






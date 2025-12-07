import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home').then(m => m.HomeComponent)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('./features/clients/clients-list/clients-list')
            .then(m => m.ClientsListComponent)
      },
      {
        path: 'clients/:id',
        loadComponent: () =>
          import('./features/clients/client-edit/client-edit.component')
            .then(m => m.ClientEditComponent)
      }
    ]
  }
];

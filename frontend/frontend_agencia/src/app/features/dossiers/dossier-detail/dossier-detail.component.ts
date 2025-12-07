import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DossiersService, Dossier } from '../dossiers.service';
import { ClientsService, Client } from '../../clients/clients.service';
import { MatTabsModule } from '@angular/material/tabs';
import { DossierGeneralComponent } from './general/dossier-general.component';
import { DossierServicesComponent } from './services/dossier-services.component';

@Component({
  selector: 'app-dossier-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatTabsModule,
    DossierGeneralComponent,
    DossierServicesComponent
  ],
  templateUrl: './dossier-detail.component.html',
  styleUrls: ['./dossier-detail.component.css']
})
export class DossierDetailComponent implements OnInit {

  public dossier!: Dossier;
  public client?: Client;

  constructor(
    private route: ActivatedRoute,
    private dossiersService: DossiersService,
    private clientsService: ClientsService,
  ) {}

  public ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id) {
      this.loadDossier(id);
    } else {
      console.error('No se encontró el id de dossier en la ruta');
    }
  }

  private loadDossier(id: number): void {
    this.dossiersService.getDossier(id).subscribe({
      next: (dossier: Dossier) => {
        this.dossier = dossier;
        this.loadClient(dossier.client);
      },
      error: (err) => console.error('Error cargando dossier', err),
    });
  }

  private loadClient(clientId: number): void {
    this.clientsService.getClient(clientId).subscribe({
      next: (client: Client) => this.client = client,
      error: (err) => console.error('Error cargando cliente del dossier', err),
    });
  }

  public getClientFullName(): string {
    if (!this.client) return '';
    return `${this.client.first_name} ${this.client.last_name ?? ''}`.trim();
  }

  public reloadDossier(): void {
    this.dossiersService.getDossier(this.dossier.id).subscribe(d => {
      this.dossier = d;
    });
    }
}
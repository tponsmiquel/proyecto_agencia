import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService, Client } from '../clients.service';

import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

import { ClientEditFichaComponent } from './components/client-edit-ficha/client-edit-ficha.component';
import { ClientEditExpedientesComponent } from './components/client-edit-expedientes/client-edit-expedientes.component';
import { ClientEditGestionComponent } from './components/client-edit-gestion/client-edit-gestion.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { ClientInfoHeaderComponent } from './components/client-info-header/client-info-header.component';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    ClientInfoHeaderComponent,
    ClientEditFichaComponent,
    ClientEditExpedientesComponent,
    ClientEditGestionComponent,
    MatToolbarModule
],
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css'],
})
export class ClientEditComponent implements OnInit {

  public client!: Client;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadClient(id);
  }

  private loadClient(id: number): void {
    this.clientsService.getClient(id).subscribe({
      next: (client: Client) => this.client = client
    });
  }

  public reloadClient(): void {
    this.loadClient(this.client.id);
  }
}

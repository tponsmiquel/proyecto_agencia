import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DossiersService } from '../dossiers.service';
import { ClientsService } from '../../clients/clients.service';

@Component({
  selector: 'app-dossier-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTabsModule,

  ],
  templateUrl: './dossier-edit.component.html',
  styleUrls: ['./dossier-edit.component.css'],
})
export class DossierEditComponent implements OnInit {

  public dossier: any;
  public client: any;

  constructor(
    private route: ActivatedRoute,
    private dossiersService: DossiersService,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    const dossierId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDossier(dossierId);
  }

  private loadDossier(id: number): void {
    this.dossiersService.getDossier(id).subscribe({
      next: dossier => {
        this.dossier = dossier;

        // cargar cliente
        this.clientsService.getClient(dossier.client).subscribe({
          next: (c) => (this.client = c)
        });
      }
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ClientsService } from '../../../clients.service';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DossierStatusPipe } from '../../../../../shared/pipes/dossier-status.pipe';

@Component({
  selector: 'app-client-edit-expedientes',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterModule, MatButtonModule, DossierStatusPipe],
  templateUrl: './client-edit-expedientes.component.html',
  styleUrls: ['./client-edit-expedientes.component.css']
})
export class ClientEditExpedientesComponent implements OnInit {

  @Input() clientId!: number;

  public dossiers: any[] = [];
  public displayedColumns = [
    'code',
    'title',
    'status',
    'pvp',
    'paid',
    'invoiced',
  ];

  constructor(private clientsService: ClientsService) {}

  ngOnInit(): void {
    this.loadDossiers();
  }

  private loadDossiers(): void {
    this.clientsService.getClientDossiers(this.clientId).subscribe({
      next: data => this.dossiers = data,
      error: err => console.error('Error loading dossiers', err)
    });
  }

  public createDossier(): void {
    console.log('Crear nuevo expediente para cliente', this.clientId);
    // Más adelante implementaremos modal / navegación
  }
}

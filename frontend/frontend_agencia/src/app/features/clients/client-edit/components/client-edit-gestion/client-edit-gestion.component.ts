import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ClientsService } from '../../../clients.service';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-edit-gestion',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterModule],
  templateUrl: './client-edit-gestion.component.html',
  styleUrls: ['./client-edit-gestion.component.css']
})
export class ClientEditGestionComponent implements OnInit {

  @Input() clientId!: number;

  public invoices: any[] = [];

  public displayedColumns = [
    'code',
    'issue_date',
    'total_amount',
    'is_settled',
    'num_services',
  ];

  constructor(private clientsService: ClientsService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  private loadInvoices(): void {
    this.clientsService.getClientInvoices(this.clientId).subscribe({
      next: data => this.invoices = data,
      error: err => console.error('Error loading invoices', err)
    });
  }
}

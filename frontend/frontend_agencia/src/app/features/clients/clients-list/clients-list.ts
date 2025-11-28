import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Client, ClientsService } from '../clients.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
],
  templateUrl: './clients-list.html',
  styleUrl: './clients-list.css',
})
export class ClientsListComponent implements OnInit {
  displayedColumns = ['name', 'email', 'phone_mobile', 'actions'];

  dataSource: Client[] = [];

  constructor(
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    this.clientsService.getClients()
    .subscribe({
      next: (data) => this.dataSource = data,
      error: (error) => console.error('Error fetching clients:', error),  
    })
}

getFullName(client: Client): string {
    return `${client.first_name} ${client.last_name}`;
  }

editClient(id: number) {
    console.log('Edit client with ID:', id);
  }
}
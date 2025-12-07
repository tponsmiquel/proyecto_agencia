import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Client, ClientsService } from '../clients.service';
import { buildClientQuery } from '../client-filters';
import { CreateClientDialogComponent } from '../create-client-dialog/create-client-dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  templateUrl: './clients-list.html',
  styleUrls: ['./clients-list.css'],
})
export class ClientsListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['name', 'document_number', 'email', 'phone_mobile', 'actions'];

  public dataSource = new MatTableDataSource<Client>([]);

  public filtersForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clientsService: ClientsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.initFilterForm();
    this.getClients();

    this.filtersForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => this.applyFilters());
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private initFilterForm(): void {
    this.filtersForm = this.fb.group({
      search: [''],
    });
  }

  private getClients(): void {
  this.clientsService.getClients().subscribe({
    next: (data) => {
      this.dataSource.data = data;
    },
    error: (error) => console.error('Error fetching clients:', error),
  });
}

  public applyFilters(): void {
  const filters = this.filtersForm.value;

  const params = buildClientQuery(filters);

  this.clientsService.getClients(params).subscribe({
    next: (data) => {
      this.dataSource.data = data;

      if (this.paginator) {
        this.paginator.firstPage();
      }
    },
    error: (err) => console.error('Error filtering clients:', err)
  });
}

  public clearFilters(): void {
    this.filtersForm.reset();
    this.getClients();
  }

  public getFullName(client: Client): string {
    return `${client.first_name} ${client.last_name}`;
  }

  public editClient(id: number): void {
  this.router.navigate(['/clients', id]);
}

  public openCreateClientModal(): void {
    this.dialog.open(CreateClientDialogComponent, {
      width: '900px',
      maxHeight: '85vh',
      panelClass: 'custom-dialog-container'
    })
    .afterClosed().subscribe(result => {
      if (result) {
        this.getClients();
      }
    });
  }
}

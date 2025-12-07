import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { DossiersService, Dossier } from '../dossiers.service';
import { ClientsService, Client } from '../../clients/clients.service';
import { DossierStatusPipe } from '../../../shared/pipes/dossier-status.pipe';
import { buildDossierQuery } from '../dossier-filters';

@Component({
  selector: 'app-dossiers-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    RouterModule,
    DossierStatusPipe,
  ],
  templateUrl: './dossiers-list.html',
  styleUrls: ['./dossiers-list.css'],
})
export class DossiersListComponent implements OnInit, AfterViewInit {

  public displayedColumns = [
    'code',
    'title',
    'client',
    'status',
    'pvp',
    'paid',
    'invoiced',
  ];

  public dataSource = new MatTableDataSource<Dossier>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public form!: FormGroup;

  private clientsMap: Record<number, Client> = {};

  constructor(
    private fb: FormBuilder,
    private dossiersService: DossiersService,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadClients();
    this.loadDossiers();

    this.handleFilterChanges();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private initForm(): void {
    this.form = this.fb.group({
      code: [''],
      title: [''],
      status: [''],
      client_search: [''],
      client_type: ['all'],
    });
  }

  private handleFilterChanges(): void {
    this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.loadDossiers();
        if (this.paginator) this.paginator.firstPage();
      });
  }

  private loadDossiers(): void {
    const params = buildDossierQuery(this.form.value);

    this.dossiersService.getDossiers(params).subscribe({
      next: dossiers => this.dataSource.data = dossiers,
      error: err => console.error('Error loading dossiers', err),
    });
  }

  private loadClients(): void {
    this.clientsService.getClients().subscribe({
      next: clients => {
        this.clientsMap = {};
        clients.forEach(c => (this.clientsMap[c.id] = c));
      },
      error: err =>
        console.error('Error loading clients for dossier list', err),
    });
  }

  public getClientName(clientId: number): string {
    const c = this.clientsMap[clientId];
    if (!c) return '';
    return `${c.first_name} ${c.last_name ?? ''}`.trim();
  }
}

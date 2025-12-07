import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Service, ServicesService } from './services.service';
import { MatDialog } from '@angular/material/dialog';
import { ServiceTypeDialogComponent } from './service-type-dialog/service-type-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dossier-services',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dossier-services.component.html',
  styleUrls: ['./dossier-services.component.css']
})
export class DossierServicesComponent implements OnInit {

  @Input() dossierId!: number;

  public services: Service[] = [];
  //private suppliersMap: Record<number, Supplier> = {};

  public displayedColumns = [
    'locator',
    'ticket',
    'type',
    //'supplier',
    'total_client',
    'total_supplier',
    'docs',
    'actions'
  ];

  constructor(
    private servicesService: ServicesService,
    private dialog: MatDialog,
    private router: Router,
    //private suppliersService: SuppliersService
  ) {}

  ngOnInit(): void {
    //this.loadSuppliers();
    this.loadServices();
  }

  /** private loadSuppliers(): void {
    this.suppliersService.getSuppliers().subscribe({
      next: suppliers => {
        this.suppliersMap = {};
        suppliers.forEach(s => this.suppliersMap[s.id] = s);
      }
    });
  } */

  private loadServices(): void {
    this.servicesService.getServicesByDossier(this.dossierId).subscribe({
      next: data => this.services = data,
      error: err => console.error('Error loading services', err),
    });
  }

  /** public getSupplierName(id: number | null): string {
    if (!id) return '-';
    return this.suppliersMap[id]?.name ?? '—';
  } */

  public createService(): void {
    console.log('Crear nuevo servicio');
  }

  public editService(serviceId: number): void {
    console.log('Editar servicio', serviceId);
  }

  public deleteService(serviceId: number): void {
    console.log('Eliminar servicio', serviceId);
  }

  public openTypeSelector(): void {
  this.dialog.open(ServiceTypeDialogComponent, {
    width: '350px'
  })
  .afterClosed()
  .subscribe(type => {
    if (!type) return;

    // 👉 Aquí ya sabemos qué tipo ha elegido el usuario
    console.log('Tipo seleccionado:', type);

    // Navegamos a creación/edición del servicio
    this.router.navigate(
      ['/booking-service/edit', 0],  // 0 = nuevo servicio
      { queryParams: { dossier: this.dossierId, type } }
    );
  });
}

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-type-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './service-type-dialog.component.html',
  styleUrls: ['./service-type-dialog.component.css']
})
export class ServiceTypeDialogComponent {

  public selectedType: string | null = null;

  public serviceTypes = [
    { value: 'flight', label: 'Vuelo' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'cruise', label: 'Crucero' },
    { value: 'bus', label: 'Autobús' },
  ];

  constructor(
    private dialogRef: MatDialogRef<ServiceTypeDialogComponent>
  ) {}

  public accept(): void {
    if (this.selectedType) {
      this.dialogRef.close(this.selectedType);
    }
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }
}

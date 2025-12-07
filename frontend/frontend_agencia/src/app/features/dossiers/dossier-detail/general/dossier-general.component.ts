import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { Dossier, DossiersService } from '../../dossiers.service';
import { EurRightPipe } from '../../../../shared/pipes/eur-right.pipe';

@Component({
  selector: 'app-dossier-general',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EurRightPipe
  ],
  templateUrl: './dossier-general.component.html',
  styleUrls: ['./dossier-general.component.css'],
})
export class DossierGeneralComponent implements OnInit {

  @Input() dossier!: Dossier;
  @Output() updated = new EventEmitter<void>();

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dossiersService: DossiersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // --------------------------------------------------------------------
  // FORM INIT — convierte correctamente YYYY-MM-DD → Date
  // --------------------------------------------------------------------
  private initForm(): void {
    this.form = this.fb.group({
      title: [this.dossier.title],
      status: [this.dossier.status],

      start_date: [this.toDateOnly(this.dossier.start_date)],
      end_date:   [this.toDateOnly(this.dossier.end_date)],
    });
  }

  // --------------------------------------------------------------------
  // SAVE — convierte Date → YYYY-MM-DD y hace PATCH
  // --------------------------------------------------------------------
  public save(): void {
    if (this.form.invalid) return;

    const payload = {
      title: this.form.value.title,
      status: this.form.value.status,
      start_date: this.formatDate(this.form.value.start_date),
      end_date: this.formatDate(this.form.value.end_date),
    };

    this.dossiersService.updateDossier(this.dossier.id, payload).subscribe({
      next: () => {
        this.snackBar.open('Expediente actualizado correctamente', 'Cerrar', {
          duration: 2500,
        });
        this.updated.emit();
      },
      error: () => {
        this.snackBar.open('Error al actualizar el expediente', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  // --------------------------------------------------------------------
  // HELPERS — conversiones de fecha sin problemas de zona horaria
  // --------------------------------------------------------------------

  /** Convierte "YYYY-MM-DD" → Date sin desfase horario */
  private toDateOnly(value: string | null): Date | null {
    if (!value) return null;
    const [y, m, d] = value.split('-').map(Number);
    return new Date(y, m - 1, d); // sin timezone shift
  }

  /** Convierte Date → "YYYY-MM-DD" */
  private formatDate(value: Date | null): string | null {
    if (!value) return null;

    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // --------------------------------------------------------------------
  // GETTERS CALCULADOS
  // --------------------------------------------------------------------
  public get pendingToInvoice(): number {
    const pvp = Number(this.dossier?.total_pvp ?? 0);
    const invoiced = Number(this.dossier?.total_invoiced ?? 0);
    return pvp - invoiced;
  }
}

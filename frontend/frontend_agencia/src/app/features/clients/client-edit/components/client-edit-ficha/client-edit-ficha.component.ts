import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Client, ClientsService } from '../../../clients.service';

// Validadores ya existentes
import { emailValidator, dniValidator, nieValidator } from '../../../../../shared/validators/client-validators';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-edit-ficha',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './client-edit-ficha.component.html',
  styleUrls: ['./client-edit-ficha.component.css'],
})
export class ClientEditFichaComponent implements OnInit, OnChanges {

  @Input() public client!: Client;
  @Output() public clientUpdated = new EventEmitter<void>();

  public form!: FormGroup;
  public isSaving = false;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private snackBar: MatSnackBar
  ) {}

  // 1) Creamos el formulario y configuramos validadores dinámicos
  public ngOnInit(): void {
    this.initForm();
    this.setupDocumentValidator();
  }

  // 2) Cada vez que cambie el @Input client, rellenamos el formulario
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['client'] && changes['client'].currentValue) {
      if (!this.form) {
        this.initForm();
        this.setupDocumentValidator();
      }
      this.form.patchValue(changes['client'].currentValue);
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      client_type: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: [''],

      document_type: ['', Validators.required],
      document_number: ['', Validators.required],

      email: ['', [Validators.required, emailValidator]],
      phone_mobile: [''],
      phone_landline: [''],

      address: [''],
      city: [''],
      postal_code: [''],
      province: [''],
      country: [''],
    });
  }

  private setupDocumentValidator(): void {
    this.form.get('document_type')?.valueChanges.subscribe(type => {
      const ctrl = this.form.get('document_number');
      if (!ctrl) return;

      ctrl.clearValidators();

      if (type === 'dni') {
        ctrl.setValidators([Validators.required, dniValidator]);
      } else if (type === 'nie') {
        ctrl.setValidators([Validators.required, nieValidator]);
      } else if (type === 'passport') {
        ctrl.setValidators([Validators.required]);
      }

      ctrl.updateValueAndValidity();
    });
  }

  public save(): void {
  if (this.form.invalid || !this.client) return;

  this.isSaving = true;

  this.clientsService.updateClient(this.client.id, this.form.value).subscribe({
    next: () => {
      this.isSaving = false;

      this.snackBar.open('Cliente actualizado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: 'snackbar-success'
      });

      this.clientUpdated.emit();
    },
    error: () => {
      this.isSaving = false;

      this.snackBar.open('Error al actualizar el cliente', 'Cerrar', {
        duration: 3000,
        panelClass: 'snackbar-error'
      });
    }
  });
}

}

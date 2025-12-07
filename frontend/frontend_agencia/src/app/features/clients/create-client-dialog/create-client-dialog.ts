import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClientsService } from '../clients.service';
import { dniValidator, emailValidator, nieValidator } from '../../../shared/validators/client-validators';

@Component({
  selector: 'app-create-client-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-client-dialog.html',
  styleUrls: ['./create-client-dialog.css'],
})
export class CreateClientDialogComponent {

  public form: FormGroup;

  public loading = false;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientsService,
    private dialogRef: MatDialogRef<CreateClientDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.form = this.initForm();
    this.setupDynamicLastNameValidation();
    this.setupDynamicDocumentValidation();
  }

  private initForm(): FormGroup {
    return this.fb.group({
      client_type: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: [''],
      document_type: ['', Validators.required],
      document_number: ['', Validators.required],
      email: ['', [Validators.required, emailValidator]],
      phone_mobile: [''],
      phone_landline: [''],
    });
  }

  private setupDynamicLastNameValidation(): void {
    this.form.get('client_type')?.valueChanges.subscribe(type => {
      const lastName = this.form.get('last_name');

      if (!lastName) return;

      if (type === 'person') {
        lastName.setValidators([Validators.required]);
        lastName.enable();
      } else {
        lastName.clearValidators();
        lastName.setValue('');
        lastName.disable();
      }

      lastName.updateValueAndValidity();
    });
  }

  private setupDynamicDocumentValidation(): void {
    this.form.get('document_type')?.valueChanges.subscribe(type => {
      const documentCtrl = this.form.get('document_number');
      if (!documentCtrl) return;

      documentCtrl.clearValidators();

      switch (type) {
        case 'dni':
          documentCtrl.setValidators([Validators.required, dniValidator]);
          break;

        case 'nie':
          documentCtrl.setValidators([Validators.required, nieValidator]);
          break;

        case 'passport':
          documentCtrl.setValidators([Validators.required]);
          break;
      }

      documentCtrl.updateValueAndValidity();
    });
  }

  public save(): void {
  if (this.form.invalid || this.loading) return;

  this.loading = true;

  if (this.form.value.client_type === 'company') {
    this.form.patchValue({ last_name: '' });
  }

  this.clientService.createClient(this.form.value).subscribe({
    next: client => {
      this.loading = false;

      this.snackBar.open('Cliente creado correctamente', 'Cerrar', {
        panelClass: ['snackbar-base', 'snackbar-success']
      });

      this.dialogRef.close(client);
    },
    error: err => {
      this.loading = false;

      this.snackBar.open('No se ha podido crear el cliente.', 'Cerrar', {
        panelClass: ['snackbar-base', 'snackbar-error']
});

    }
  });
}

  public cancel(): void {
    this.dialogRef.close();
  }
}

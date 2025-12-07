import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dossierStatus',
  standalone: true
})
export class DossierStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'open': return 'Abierto';
      case 'closed': return 'Cerrado';
      default: return value;
    }
  }
}

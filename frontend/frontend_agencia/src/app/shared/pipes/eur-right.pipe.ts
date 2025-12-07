import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eurRight',
  standalone: true
})
export class EurRightPipe implements PipeTransform {
  transform(value: any): string {
    if (value === null || value === undefined) return '';
    const num = Number(value);
    if (isNaN(num)) return value;

    return `${num.toFixed(2)} €`;
  }
}

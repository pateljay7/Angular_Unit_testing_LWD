import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strength',
})
export class StrengthPipe implements PipeTransform {
  transform(value: number): string {
    return value < 10
      ? value + ' (weak)'
      : value >= 10 && value < 20
      ? value + ' (strong)'
      : value + ' (strongest)';
  }
}

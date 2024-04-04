import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeTrailingZeros',
  standalone: true
})
export class RemoveTrailingZerosPipe implements PipeTransform {
  public transform(value: number | string): string {
    if (typeof value === 'number') {
      value = value.toString();
    }

    const parts = value.split('.');

    if (parts.length === 2) {
      parts[1] = parts[1].replace(/0+$/, '');

      if (parts[1].length === 0) {
        return parts[0];
      }

      return parts.join('.');
    }

    return value.toString();
  }
}

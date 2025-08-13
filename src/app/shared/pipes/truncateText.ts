import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 100, completeWords: boolean = true, ellipsis: string = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;

    if (completeWords) {

      limit = value.substr(0, limit).lastIndexOf(' ');
      if (limit === -1) limit = value.length;
      // Si no encuentra espacios, corta en el límite exacto
      return value.substr(0, limit) + ellipsis;
    }

    return value.substr(0, limit) + ellipsis;
  }

}

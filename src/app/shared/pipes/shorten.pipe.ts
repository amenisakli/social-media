import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string,maxlength:number ): string {
    if (value.length <= maxlength) {
      return value;
    }
    return value.substring(0, maxlength) + '…';
  }
}
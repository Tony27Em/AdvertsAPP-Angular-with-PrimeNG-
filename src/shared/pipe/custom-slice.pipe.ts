import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSlice'
})
export class CustomSlicePipe implements PipeTransform {

  transform(value: string): string {
    return value.length > 300 ? value.slice(0, 300) + '...' : value
  }

}

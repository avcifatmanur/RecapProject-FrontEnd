import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carAdded'
})
export class CarAddedPipe implements PipeTransform {

  transform(value:number): number {
    return 0;
  }

}

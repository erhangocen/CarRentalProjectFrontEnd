import { Pipe, PipeTransform } from '@angular/core';
import { Rental } from '../models/rental';

@Pipe({
  name: 'filterrental'
})
export class FilterrentalPipe implements PipeTransform {

  transform(value: Rental[], filterText:string): Rental[] {
    filterText = filterText
      ? filterText.toLocaleLowerCase()
      : "";
    
    return filterText
      ? value.filter((r: Rental) => r.carName.toLocaleLowerCase().indexOf(filterText) !== -1)
      : value;
  }

}

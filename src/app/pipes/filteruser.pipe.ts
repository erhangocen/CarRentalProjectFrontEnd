import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'filteruser'
})
export class FilteruserPipe implements PipeTransform {

  transform(value: User[], filterText:string): User[] {
    filterText = filterText
      ? filterText.toLocaleLowerCase()
      : "";
    
    return filterText
      ? value.filter((u: User) => u.firstName.toLocaleLowerCase().indexOf(filterText) !== -1)
      : value;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: Date, format:string): any {
    if (date) {
      return moment(date).format(format)
    }
    return null;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'momentjs'
})
export class MomentjsPipe implements PipeTransform {

  constructor(){
    moment.locale('es');
  }

  transform(value: string): string {
    return moment(value).fromNow();
  }

}

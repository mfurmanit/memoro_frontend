import { Pipe, PipeTransform } from '@angular/core';
import { titleCaseWord } from '@others/helper-functions';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: unknown): string {
    if (typeof value === 'string')
      return titleCaseWord(value);
    else throw Error(`InvalidPipeArgument: '${value}' for pipe 'CapitalizePipe'`);
  }
}

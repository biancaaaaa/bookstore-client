import { Pipe, PipeTransform } from '@angular/core';
/*
 * Converts number to correct currency format.
*/
@Pipe({name: 'currency'})
export class CurrencyPipe implements PipeTransform {
  transform(value: number): string {
    let formattedNumber = '' + Math.round(value * 100)/100;
    let formatArr = formattedNumber.split('.');
    if (formatArr[1]) {
      formatArr[1] = formatArr[1].length === 1 ? formatArr[1] + '0' : formatArr[1];
      formattedNumber = formatArr.join('.');
    } else {
      formattedNumber += '.00';
    }
    return 'EUR ' + formattedNumber.replace('.', ',');
  }
}

import { Injectable } from '@angular/core';
import { formatDateCustom, formatDateTime, isValidAdapterDate, parseDate } from './helper-functions';

@Injectable()
export class DateHelper {

  public static parse(value: any, format: string, regex?: RegExp): Date | null {
    if (isValidAdapterDate(value, format, regex)) return parseDate(value, format);
    else {
      const timestamp = typeof value === 'number' ? value : Date.parse(value);
      return new Date(timestamp);
    }
  }

  public static format(date: Date, displayFormat: string): string {
    switch (displayFormat) {
      case 'date':
        return formatDateCustom(date, 'dd.MM.yyyy');
      case 'time':
        return formatDateTime(date);
      case 'inputMonth':
        return formatDateCustom(date, 'MMM yyyy');
      default:
        return date.toDateString();
    }
  }
}

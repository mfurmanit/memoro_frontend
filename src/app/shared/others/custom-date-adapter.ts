import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { commonDateFormat, formatDate, parseDate } from './helper-functions';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: string): string {
    return formatDate(date);
  }

  override parse(value: any, parseFormat: string | string[]): Date | null {
    const parsedDate = parseDate(value, commonDateFormat);
    return this.isValid(parsedDate) ? parsedDate : null;
  }
}

import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Required } from '../../decorators/required.decorator';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent {

  @Input() appearance: MatFormFieldAppearance = 'standard';
  @Input() @Required form!: FormGroup;

  // dateFilter = (d: Date | null): boolean => {
  //   const from = this.form.get('from')?.value;
  //   const to = this.form.get('to')?.value;
  //
  //   if (from && to) {
  //     const fromDate = new Date(from);
  //     const toDate = new Date(to);
  //     const diffInTime = Math.abs(toDate.getTime() - fromDate.getTime());
  //     const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
  //
  //     return diffInDays <= 7;
  //   }
  //   return true;
  // };
}

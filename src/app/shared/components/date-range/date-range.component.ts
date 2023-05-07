import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateRange } from '@models/date-range';
import { Required } from '../../decorators/required.decorator';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { isNullOrUndefined } from '@others/helper-functions';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent {

  @Input() appearance: MatFormFieldAppearance = 'standard';
  @Input() @Required form!: FormGroup;
  @Output() readonly rangeChanged = new EventEmitter<DateRange>();
}

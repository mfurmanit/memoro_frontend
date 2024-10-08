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
}

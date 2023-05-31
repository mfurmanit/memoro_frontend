import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Required } from '../../decorators/required.decorator';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { DefaultErrorStateMatcher } from '@others/default-error-state-matcher';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() id?: string;
  @Input() appearance: MatFormFieldAppearance = 'standard';
  @Input() info?: string;
  @Input() matcher: ErrorStateMatcher = new DefaultErrorStateMatcher();
  @Input() @Required placeholder!: string;
  @Input() @Required form!: FormGroup;
  @Input() @Required controlName!: string;
  @Input() type: string = 'text';
  @Input() autocomplete?: string;
  @Input() maxlength: string | number = 255;
  @Input() minlength: string | number | null = null;
  @Input() readonly: boolean = false;
  @Input() hideCounter: boolean = false;
  @Input() autoFocus: boolean = false;
  @Input() translatePlaceholder: boolean = true;
  @Input() interpolateParams?: Record<string, string | number>;
  @Input() fieldClass?: string | string[] | Set<string> | {
    [clazz: string]: boolean;
  };
}

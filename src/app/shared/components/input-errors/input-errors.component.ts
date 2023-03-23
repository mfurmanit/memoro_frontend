import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss']
})
export class InputErrorsComponent {
  @Input() errors: ValidationErrors | null | undefined;
}

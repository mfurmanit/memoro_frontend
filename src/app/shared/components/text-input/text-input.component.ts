import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent extends InputComponent {
  @Input() rows: number = 4;

  constructor() {
    super();
  }
}

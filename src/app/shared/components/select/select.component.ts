import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { getProperty, isNullOrUndefined } from '@others/helper-functions';
import { MatSelectChange } from '@angular/material/select';
import { InputComponent } from '@components/input/input.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent<T> extends InputComponent implements OnInit {
  @Input() displayFnName!: string;
  @Input() compareWith?: keyof T;
  @Input() values?: T[];
  @Input() multiple: boolean = false;
  @Input() template: TemplateRef<T> | null = null;
  @Input() triggerTemplate: TemplateRef<T> | null = null;
  @Output() readonly selectionChanged: EventEmitter<MatSelectChange> =
    new EventEmitter<MatSelectChange>();
  comparator: (first: T, second: T) => boolean = () => false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.prepareComparator();
  }

  private prepareComparator(): void {
    this.comparator = (first: T, second: T): boolean => first === second;
    this.comparator = (first: T, second: T): boolean => !isNullOrUndefined(this.compareWith) ?
      getProperty(first, this.compareWith) === getProperty(second, this.compareWith) : first === second;
  }
}

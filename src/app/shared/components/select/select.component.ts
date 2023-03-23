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
  @Input() values?: any[];
  @Input() multiple: boolean = false;
  @Input() template: TemplateRef<any> | null = null;
  @Input() triggerTemplate: TemplateRef<any> | null = null;
  @Output() readonly selectionChanged: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
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

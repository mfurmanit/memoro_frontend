import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, startWith, switchMap } from 'rxjs/operators';
import { identity, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { isObject } from 'lodash-es';
import { MappingService } from '@services/mapping.service';
import { isNullOrUndefined } from '@others/helper-functions';
import { SelectComponent } from '@components/select/select.component';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent<T> extends SelectComponent<T> implements OnInit {
  @Input() distinct: boolean = true;
  @Input() asyncValuesFetch?: (search: string) => Observable<T[]>;
  @Input() filterFn?: (value: T, values: T[]) => boolean;

  filteredOptions?: Observable<T[]>;
  displayFn: (value: T) => string = (value) => `${value}`;

  constructor(protected mappingService: MappingService) {
    super();
  }

  override ngOnInit(): void {
    this.displayFn = this.mappingService.getMethod(this.displayFnName);
    this.watchControlChanges();
  }

  protected _filter(search: string): Observable<T[]> {
    if (this.asyncValuesFetch) return this.asyncValuesFetch(search);
    else return this.filterSimpleValues(search);
  }

  protected watchControlChanges(): void {
    const distinctOperator: MonoTypeOperatorFunction<any> = this.distinct ? distinctUntilChanged() : identity;
    const control = this.form.get(this.controlName);

    this.filteredOptions = isNullOrUndefined(control) ? of([]) :
      control.valueChanges.pipe(
        startWith(''),
        filter((value) => !isObject(value)),
        distinctOperator,
        debounceTime(300),
        switchMap((value: any) => this._filter(value))
      );
  }

  clearValue() {
    this.form.controls[this.controlName].setValue('');
  }

  private filterSimpleValues(search: string): Observable<T[]> {
    if (!this.values) return of([]);
    const filterValue = search?.toString().toLowerCase();
    return of(this.values.filter(option => this.displayFn(option)?.toString().toLowerCase().includes(filterValue)));
  }
}

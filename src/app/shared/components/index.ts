import { LayoutComponent } from '@components/layout/layout.component';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
import { BaseComponent } from '@components/base/base.component';
import { InputComponent } from '@components/input/input.component';
import { InputErrorsComponent } from '@components/input-errors/input-errors.component';
import { AutocompleteComponent } from '@components/autocomplete/autocomplete.component';
import { SelectComponent } from '@components/select/select.component';

export const components = [
  LayoutComponent,
  ToolbarComponent,
  BaseComponent,
  InputComponent,
  InputErrorsComponent,
  AutocompleteComponent,
  SelectComponent
];

export * from '@components/layout/layout.component';
export * from '@components/toolbar/toolbar.component';
export * from '@components/base/base.component';
export * from '@components/input/input.component';
export * from '@components/input-errors/input-errors.component';
export * from '@components/autocomplete/autocomplete.component';
export * from '@components/select/select.component';

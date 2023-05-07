import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ANGULAR_MATERIAL } from '@others/angular-material';

import * as fromComponents from './components/index';
import * as fromDialogs from './dialogs/index';
import * as fromPipes from './pipes/index';
import * as fromDirectives from './directives/index';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from '@others/custom-date-adapter';

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    dateInput: 'date',
    monthYearLabel: 'inputMonth',
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'}
  },
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ANGULAR_MATERIAL,
    RouterModule,
    TranslateModule
  ],
  exports: [
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    ANGULAR_MATERIAL,
    fromComponents.components,
    fromDialogs.dialogs,
    fromDirectives.directives,
    fromPipes.pipes
  ],
  declarations: [
    fromComponents.components,
    fromDialogs.dialogs,
    fromDirectives.directives,
    fromPipes.pipes
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    {provide: LOCALE_ID, useValue: 'pl-PL'},
    {provide: DateAdapter, useClass: CustomDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
  ]
})
export class SharedModule {
}

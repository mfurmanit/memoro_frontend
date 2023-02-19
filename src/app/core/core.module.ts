import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SharedModule } from '@shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './components/login/login.component';

import * as fromGuards from './guards/index';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [
    LoginComponent
  ],
  entryComponents: [],
  providers: [
    fromGuards.guards,
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'}
  ]
})
export class CoreModule {
}

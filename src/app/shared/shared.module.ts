import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ANGULAR_MATERIAL } from '@others/angular-material';

import * as fromComponents from './components/index';
import * as fromPipes from './pipes/index';
import * as fromDirectives from './directives/index';
import { CapitalizePipe } from './pipes/index';

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
    ReactiveFormsModule,
    ANGULAR_MATERIAL,
    CapitalizePipe
  ],
  declarations: [
    fromComponents.components,
    fromDirectives.directives,
    fromPipes.pipes
  ],
})
export class SharedModule {
}

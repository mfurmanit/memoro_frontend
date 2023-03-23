import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ANGULAR_MATERIAL } from '@others/angular-material';

import * as fromComponents from './components/index';
import * as fromDialogs from './dialogs/index';
import * as fromPipes from './pipes/index';
import * as fromDirectives from './directives/index';

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
})
export class SharedModule {
}

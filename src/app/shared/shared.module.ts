import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ANGULAR_MATERIAL } from '@others/angular-material';

import * as fromComponents from './components/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ANGULAR_MATERIAL,
    RouterModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ANGULAR_MATERIAL
  ],
  declarations: [
    fromComponents.components,
  ],
})
export class SharedModule {
}

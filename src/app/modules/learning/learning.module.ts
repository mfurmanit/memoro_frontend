import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningRoutingModule } from './learning-routing.module';
import { LearningComponent } from './learning.component';
import { SharedModule } from '@shared.module';

@NgModule({
  declarations: [
    LearningComponent
  ],
  imports: [
    CommonModule,
    LearningRoutingModule,
    SharedModule
  ]
})
export class LearningModule {
}

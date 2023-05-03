import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LearningPageComponent } from './learning-page/learning-page.component';

const routes: Routes = [
  {path: '', component: LearningPageComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LearningRoutingModule {
}

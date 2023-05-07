import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: '', component: StatisticsPageComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StatisticsRoutingModule {
}

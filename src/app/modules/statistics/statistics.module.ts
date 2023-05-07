import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';
import { SharedModule } from '@shared.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    StatisticsPageComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedModule,
    NgChartsModule
  ]
})
export class StatisticsModule {
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared.module';
import { HomePageRoutingModule } from './home-page.routing.module';
import { HomePageComponent } from './home-page.component';

@NgModule({
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [
    HomePageComponent
  ]
})
export class HomePageModule {
}

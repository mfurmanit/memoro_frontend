import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharingRoutingModule } from './sharing-routing.module';
import { SharingPageComponent } from './sharing-page/sharing-page.component';
import { SharedModule } from '@shared.module';

@NgModule({
  declarations: [
    SharingPageComponent
  ],
  imports: [
    CommonModule,
    SharingRoutingModule,
    SharedModule
  ]
})
export class SharingModule {
}

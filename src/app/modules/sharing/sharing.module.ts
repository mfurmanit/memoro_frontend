import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharingRoutingModule } from './sharing-routing.module';
import { SharingComponent } from './sharing.component';
import { SharedModule } from '@shared.module';

@NgModule({
  declarations: [
    SharingComponent
  ],
  imports: [
    CommonModule,
    SharingRoutingModule,
    SharedModule
  ]
})
export class SharingModule {
}

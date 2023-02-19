import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import { SharedModule } from '@shared.module';

@NgModule({
  declarations: [
    CollectionsComponent
  ],
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    SharedModule
  ]
})
export class CollectionsModule {
}

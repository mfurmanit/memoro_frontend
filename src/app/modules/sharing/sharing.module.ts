import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharingRoutingModule } from './sharing-routing.module';
import { SharingPageComponent } from './sharing-page/sharing-page.component';
import { SharedModule } from '@shared.module';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';

@NgModule({
  declarations: [
    SharingPageComponent,
    ShareDialogComponent
  ],
  imports: [
    CommonModule,
    SharingRoutingModule,
    SharedModule
  ]
})
export class SharingModule {
}

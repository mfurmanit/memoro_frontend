import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsPageComponent } from './collections-page/collections-page.component';
import { SharedModule } from '@shared.module';
import { CollectionDialogComponent } from './collection-dialog/collection-dialog.component';
import { CardDialogComponent } from './card-dialog/card-dialog.component';
import { CardsPageComponent } from './cards-page/cards-page.component';

@NgModule({
  declarations: [
    CollectionsPageComponent,
    CardsPageComponent,
    CollectionDialogComponent,
    CardDialogComponent
  ],
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    SharedModule
  ]
})
export class CollectionsModule {
}

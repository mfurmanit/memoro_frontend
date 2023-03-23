import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import { SharedModule } from '@shared.module';
import { CollectionDialogComponent } from './collection-dialog/collection-dialog.component';
import { CollectionTileComponent } from './collection-tile/collection-tile.component';

@NgModule({
  declarations: [
    CollectionsComponent,
    CollectionDialogComponent,
    CollectionTileComponent
  ],
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    SharedModule
  ]
})
export class CollectionsModule {
}

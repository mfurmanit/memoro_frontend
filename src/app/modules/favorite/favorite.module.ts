import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './favorite.component';
import { SharedModule } from '@shared.module';

@NgModule({
  declarations: [
    FavoriteComponent
  ],
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    SharedModule
  ]
})
export class FavoriteModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteComponent } from './favorite.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: '', component: FavoriteComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FavoriteRoutingModule {
}

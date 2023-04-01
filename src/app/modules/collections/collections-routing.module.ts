import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsPageComponent } from './collections-page/collections-page.component';
import { CommonModule } from '@angular/common';
import { CardsPageComponent } from './cards-page/cards-page.component';

const routes: Routes = [
  {path: '', component: CollectionsPageComponent},
  {
    path: ':id/cards',
    component: CardsPageComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CollectionsRoutingModule {
}

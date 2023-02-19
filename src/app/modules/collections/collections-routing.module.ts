import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './collections.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: '', component: CollectionsComponent}
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

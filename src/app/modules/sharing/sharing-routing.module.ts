import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharingComponent } from './sharing.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: '', component: SharingComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SharingRoutingModule {
}

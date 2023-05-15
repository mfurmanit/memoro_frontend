import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharingPageComponent } from './sharing-page/sharing-page.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: '', component: SharingPageComponent}
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

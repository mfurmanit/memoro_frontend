import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'collections', pathMatch: 'full'},
  {
    path: 'collections',
    loadChildren: () => import('./collections/collections.module').then(module => module.CollectionsModule)
  },
  {
    path: 'learning',
    loadChildren: () => import('./learning/learning.module').then(module => module.LearningModule)
  },
  {
    path: 'sharing',
    loadChildren: () => import('./sharing/sharing.module').then(module => module.SharingModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then(module => module.StatisticsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}

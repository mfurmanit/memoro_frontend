import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'home-page', pathMatch: 'full'},
  {
    path: 'home-page',
    loadChildren: () => import('./home-page/home-page.module').then(module => module.HomePageModule)
  },
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
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(module => module.ReportsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}

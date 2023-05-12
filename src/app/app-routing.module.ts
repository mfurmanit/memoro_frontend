import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard, LoginGuard } from './core/guards';
import { LayoutComponent } from '@components/layout/layout.component';
import { RegisterComponent } from './core/components/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/modules/main.module').then(module => module.MainModule),
  },
  {
    path: '**',
    redirectTo: 'collections',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

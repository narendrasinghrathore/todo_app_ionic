import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from './guards/home.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./shell/shell.module').then(shell => shell.ShellModule),
    canActivate: [HomeGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(login => login.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(reg => reg.RegisterModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

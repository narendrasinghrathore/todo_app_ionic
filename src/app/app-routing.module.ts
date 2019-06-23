import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from './guards/home.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'calendar',
    pathMatch: 'full'
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then(calendar => calendar.CalendarModule),
    pathMatch: 'full',
    canActivate: [HomeGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(home => home.HomePageModule),
    canActivate: [HomeGuard]
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(setting => setting.SettingModule ),
    canActivate: [HomeGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(login => login.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(reg => reg.RegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

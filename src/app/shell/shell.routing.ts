import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from '../guards/home.guard';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
    {
        path: '', component: ShellComponent,
        children: [
            {
                path: 'calendar',
                loadChildren: () => import('../calendar/calendar.module')
                .then(calendar => calendar.CalendarModule),
                canActivate: [HomeGuard]
            },
            {
                path: 'dashboard',
                loadChildren: () => import('../home/home.module')
                .then(home => home.HomePageModule),
                canActivate: [HomeGuard]
            },
            {
                path: 'setting',
                loadChildren: () => import('../setting/setting.module')
                .then(setting => setting.SettingModule),
                canActivate: [HomeGuard]
            },
            {
                path: '',
                redirectTo: 'calendar',
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShellRoutingModule { }

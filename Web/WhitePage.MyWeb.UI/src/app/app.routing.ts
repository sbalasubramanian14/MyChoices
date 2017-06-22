import { Routes } from '@angular/router';

import { FullLayoutComponent } from './layouts/full-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout.component';

export const AppRoutes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
}, {
    path: '',
    component: FullLayoutComponent,
    children: [
        {
            path: 'home',
            loadChildren: './dashboard/dashboard.module#DashboardModule'
        },
        {
            path: 'cases',
            loadChildren: './cases/cases.module#CasesModule'
        },
        {
            path: 'user',
            loadChildren: './user/user.module#UserModule'
        }
    ]
}, {
    path: '',
    component: AuthLayoutComponent,
    children: [
        {
            path: 'pages',
            loadChildren: './pages/pages.module#PagesModule'
        }
    ]
}, {
    path: '**',
    redirectTo: 'pages/404'
}];

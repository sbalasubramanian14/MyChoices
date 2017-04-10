import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import { Pages404Component } from './pages.404';
import { PagesSignInComponent } from './pages.signin';

const routes: Routes = [
    {
        path: '',
        children: [{
            path: '404',
            component: Pages404Component
        }, {
            path: 'signin',
            component: PagesSignInComponent
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import { CasesCreateComponent } from './cases.create';
import { CasesDetailedComponent } from './cases.detailed';
import { CasesViewComponent } from './cases.view';
import { CasesListComponent } from './cases.list';
import { CaseRedirectComponent } from './case.redirect';
import { CasesMoveComponent } from './cases.move';

import { AuthGuard } from '../services/authguard.service';

const routes: Routes = [
    {
        path: '',
        children: [{
            path: 'create',
            component: CasesCreateComponent,
            canActivate: [AuthGuard],
            data: {
                title: 'New Case'
            }
        }, {
            path: 'list',
            component: CasesListComponent,
            canActivate: [AuthGuard],
            data: {
                title: 'Cases'
            }
        }, {
            path: 'view/:id',
            component: CasesViewComponent,
            canActivate: [AuthGuard],
            data: {
                title: 'Manage Case'
            }
        }, {
            path: 'detailed/:id',
            component: CasesDetailedComponent,
            canActivate: [AuthGuard],
            data: {
                title: 'Manage Case'
            }
        },{
            path: 'redirect/:id',
            component: CaseRedirectComponent,
            canActivate: [AuthGuard],
            data: {
                title: 'Manage Case'
            }
        }, {
            path: 'move/:id',
            component: CasesMoveComponent,
            canActivate: [AuthGuard],
            data: {
                title: 'Manage Case'
            }
        },]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CasesRoutingModule { }

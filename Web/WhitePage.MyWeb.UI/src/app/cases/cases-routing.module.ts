import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { CasesCreateComponent } from './cases.create';
import { CasesDetailedComponent } from './cases.detailed';
import { CasesListComponent } from './cases.list';
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
            path: 'detailed/:id',
            component: CasesDetailedComponent,
            canActivate: [AuthGuard],
            data: {
                title: 'Manage Case'
            }
        }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule {}

import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import { UserCreateComponent } from './user.create';

import { AuthGuard } from '../services/authguard.service';

const routes: Routes = [
    {
        path: '',
        children: [{
            path: 'create',
            component: UserCreateComponent,
            canActivate: [AuthGuard],
            data: {
                title: 'User Management'
            }
        }, 
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }

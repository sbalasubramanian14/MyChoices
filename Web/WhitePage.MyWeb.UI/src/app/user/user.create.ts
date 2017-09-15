import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    templateUrl: 'user.create.html',
    styleUrls: ['user.create.scss']
})
export class UserCreateComponent {
    constructor(
        private vRef: ViewContainerRef,
        private toastr: ToastsManager,
        private authenticationService: AuthenticationService,) {
        this.toastr.setRootViewContainerRef(vRef);
    }
    public userData = this.authenticationService.getUser();
    public adminFlag = this.userData.typ == "1" ? true : false;
}
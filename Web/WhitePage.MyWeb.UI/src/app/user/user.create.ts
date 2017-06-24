import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

@Component({
    templateUrl: 'user.create.html',
    styleUrls: ['user.create.scss']
})
export class UserCreateComponent {
    constructor(private vRef: ViewContainerRef, private toastr: ToastsManager) {
        this.toastr.setRootViewContainerRef(vRef);
    }
}
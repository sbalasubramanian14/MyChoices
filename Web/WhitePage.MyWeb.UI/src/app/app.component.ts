import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'body',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {
    constructor(public vRef: ViewContainerRef, public toastr: ToastsManager) {
        this.toastr.setRootViewContainerRef(vRef);
    }
}

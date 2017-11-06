import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { AuthenticationService } from '../services/authentication.service';
import { CommonService } from '../services/common.services';
import { IOption } from 'ng-select';

@Component({
    templateUrl: 'user.create.html',
    styleUrls: ['user.create.scss']
})
export class UserCreateComponent {

    public roles: IOption[];
    public centers: IOption[];
    public userData = this.authenticationService.getUser();
    public isUserAdmin = this.userData.typ == "1" ? true : false;
    public isDataLoaded = false;
    public isRolesLoaded = false;
    public isCentersLoaded = false;
    public isDeactivateUserLoaded = false;

    constructor(
        private vRef: ViewContainerRef,
        private toastr: ToastsManager,
        private authenticationService: AuthenticationService,
        private commonService: CommonService) {
        this.toastr.setRootViewContainerRef(vRef);
        this.getUserRoles();
        this.getAllCenters();
    }

    private getUserRoles() {
        this.authenticationService.getUserRoles().subscribe(userRoles => {
            this.roles = userRoles.map(role => <IOption>{ label: role.Title, value: role.RoleId.toString() });
            //storing the roles to be used by child components
            localStorage.setItem('roles', JSON.stringify(this.roles));

            this.isRolesLoaded = true;
        }, error => console.log("unable to get user roles"));
    }

    private getAllCenters() {
        this.commonService.getAllCenters().subscribe(centers => {
            this.centers = centers.map(center => <IOption>{ label: center.Title, value: center.CenterId.toString() });
            //storing the centers to be used by child components
            localStorage.setItem('centers', JSON.stringify(this.centers));

            this.isCentersLoaded = true;
        }, error => console.log("unable to get centers"));
    }

    public onDeactivateUserLoaded(status: boolean): void {
        this.isDeactivateUserLoaded = status;
        this.isDataLoaded = this.isRolesLoaded && this.isCentersLoaded && this.isDeactivateUserLoaded;
    }
}
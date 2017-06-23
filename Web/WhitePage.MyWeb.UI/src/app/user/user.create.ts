import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { SelectModule, IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { CasesService } from '../services/cases.services';

import { CommonService } from '../services/common.services';

import { AuthenticationService } from '../services/authentication.service';
import { PeaceMaker } from '../models/entities';

@Component({
    templateUrl: 'user.create.html',
    styleUrls: ['user.create.scss']
})
export class UserCreateComponent {
    public addUserForm: FormGroup;

    public roles: IOption[];
    public centers: IOption[];

    constructor(
        private authenticationService: AuthenticationService,
        private commonService: CommonService,
        private fb: FormBuilder,
        private toastr: ToastsManager,
        private vRef: ViewContainerRef) {

        this.toastr.setRootViewContainerRef(vRef);

        this.authenticationService.getUserRoles().subscribe(userRoles => {
            this.roles = userRoles.map(role => <IOption>{ label: role.Title, value: role.RoleId.toString() });
        }, error => console.log("unable to get user roles"));

        this.commonService.getAllCenters().subscribe(centers => {
            this.centers = centers.map(center => <IOption>{ label: center.Title, value: center.CenterId.toString() });
        }, error => console.log("unable to get centers"));
    }

    ngOnInit() {
        this.addUserForm = this.fb.group({
            userDetails: this.fb.group({
                firstname: ['', Validators.required],
                lastname: ['', Validators.required],
                isNewLogin: [false],
                email: [''],
                peacemaker: [''],
                counselor: [''],
                role: ['', Validators.required],
                isGlobal: [false],
                center: ['']
            })
        });
    }

    public addNewUser() {
        let peaceMaker = new PeaceMaker();
        peaceMaker.FirstName = this.addUserForm.get("userDetails.firstname").value;
        peaceMaker.LastName = this.addUserForm.get("userDetails.lastname").value;
        peaceMaker.CenterId = this.addUserForm.get("userDetails.center").value;
        peaceMaker.IsActive = true;
        peaceMaker.Email = "";
        this.authenticationService.addPeaceMaker(peaceMaker).subscribe(
            response => {
                this.toastr.success('User created successfully');
                this.addUserForm.reset();
            },
            error => {
                this.toastr.error('User creation failed');
            });
        console.log(this.addUserForm.get("userDetails.counselor").value);
    }
}
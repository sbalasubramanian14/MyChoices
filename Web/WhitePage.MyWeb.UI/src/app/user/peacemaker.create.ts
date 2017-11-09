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
    selector: 'create-peacemaker',
    templateUrl: 'peacemaker.create.html',
    //styleUrls: ['user.create.scss']
})
export class PeacemakerCreateComponent {
    public addPeacemakerForm: FormGroup;

    public roles: IOption[];
    public centers: IOption[];
    public isNewLogin: boolean;

    constructor(
        private authenticationService: AuthenticationService,
        private commonService: CommonService,
        private fb: FormBuilder,
        private toastr: ToastsManager) {

    }

    ngOnInit() {
        this.addPeacemakerForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            isNewLogin: [false],
            email: [''],
            role: [''],
            center: ['', Validators.required]
        });

        this.setNewLoginValidation();
        this.roles = JSON.parse(localStorage.getItem('roles'));
        this.centers = JSON.parse(localStorage.getItem('centers'));
    }

    private setNewLoginValidation() {
        this.addPeacemakerForm.get('isNewLogin').valueChanges.subscribe(isNewLogin => {
            if (isNewLogin) {
                this.addPeacemakerForm.get('email').setValidators([Validators.required, Validators.email]);
                this.addPeacemakerForm.get('role').setValidators(Validators.required);
            }
            else {
                this.addPeacemakerForm.get('email').clearValidators();
                this.addPeacemakerForm.get('role').clearValidators();
            }

            this.addPeacemakerForm.get('email').updateValueAndValidity();
            this.addPeacemakerForm.get('role').updateValueAndValidity();
        });
    }

    public addNewUser() {
        let peaceMaker = new PeaceMaker();
        peaceMaker.FirstName = this.addPeacemakerForm.get("firstname").value;
        peaceMaker.LastName = this.addPeacemakerForm.get("lastname").value;
        peaceMaker.CenterId = this.addPeacemakerForm.get("center").value;
        peaceMaker.IsActive = true;
        peaceMaker.Email = this.addPeacemakerForm.get("email").value;

        this.authenticationService.addPeaceMaker(peaceMaker).subscribe(
            response => {
                this.toastr.success('User created successfully');
                this.addPeacemakerForm.reset();
            },
            error => {
                this.toastr.error('User creation failed');
            });

        let isNewLogin = <boolean>this.addPeacemakerForm.get("isNewLogin").value;

        if (isNewLogin) {
            let username = this.addPeacemakerForm.get("email").value;
            let roleId = this.addPeacemakerForm.get("role").value;

            this.authenticationService.addNewUserLogin(username, roleId, peaceMaker.FirstName, peaceMaker.LastName).
                subscribe(response => console.log("login added"), error => console.log("login not added"));
        }
    }
}
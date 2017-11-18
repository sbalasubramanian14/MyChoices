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
import { PeaceMaker, Counselor } from '../models/entities';

@Component({
    selector: 'create-counselor',
    templateUrl: 'counselor.create.html',
    //styleUrls: ['user.create.scss']
})
export class CounselorCreateComponent {
    public addCounselorForm: FormGroup;

    public roles: IOption[];
    public centers: IOption[];
    public isNewLogin: boolean;
    public isGlobal: boolean;

    constructor(
        private authenticationService: AuthenticationService,
        private commonService: CommonService,
        private fb: FormBuilder,
        private toastr: ToastsManager) {

        this.roles = JSON.parse(localStorage.getItem('roles'));
        this.centers = JSON.parse(localStorage.getItem('centers'));
    }

    ngOnInit() {
        this.addCounselorForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            isNewLogin: [false],
            email: [''],
            role: [''],
            isGlobal: [false],
            center: ['', Validators.required]
        });

        this.setNewLoginValidation();
        this.setGlobalCenterValidation();
    }

    private setNewLoginValidation() {
        this.addCounselorForm.get('isNewLogin').valueChanges.subscribe(isNewLogin => {
            if (isNewLogin) {
                this.addCounselorForm.get('email').setValidators([Validators.required, Validators.email]);
                this.addCounselorForm.get('role').setValidators(Validators.required);
            }
            else {
                this.addCounselorForm.get('email').clearValidators();
                this.addCounselorForm.get('role').clearValidators();
            }

            this.addCounselorForm.get('email').updateValueAndValidity();
            this.addCounselorForm.get('role').updateValueAndValidity();
        });
    }

    private setGlobalCenterValidation() {
        this.addCounselorForm.get('isGlobal').valueChanges.subscribe(isGlobal => {
            if (isGlobal) {
                this.addCounselorForm.get('center').clearValidators();
            }
            else {
                this.addCounselorForm.get('center').setValidators(Validators.required);
            }
            this.addCounselorForm.get('center').updateValueAndValidity();

        });
    }

    public addNewUser() {
        let counselor = new Counselor();
        counselor.FirstName = this.addCounselorForm.get("firstname").value;
        counselor.LastName = this.addCounselorForm.get("lastname").value;
        counselor.IsActive = true;
        counselor.IsGlobal = <boolean>this.addCounselorForm.get("isGlobal").value ? true : false;
        counselor.CenterId =  counselor.IsGlobal ? null : this.addCounselorForm.get("center").value;

        this.authenticationService.addCounselor(counselor).subscribe(
            response => {
                this.toastr.success('User created successfully');
                this.addCounselorForm.reset();
            },
            error => {
                this.toastr.error('User creation failed');
            });

        let isNewLogin = <boolean>this.addCounselorForm.get("isNewLogin").value;

        if (isNewLogin) {
            let username = this.addCounselorForm.get("email").value;
            let roleId = this.addCounselorForm.get("role").value;

            this.authenticationService.addNewUserLogin(username, roleId, counselor.FirstName, counselor.LastName).
                subscribe(response => console.log("login added"), error => console.log("login not added"));
        }
    }
}
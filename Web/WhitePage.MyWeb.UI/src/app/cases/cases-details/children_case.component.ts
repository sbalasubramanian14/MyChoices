import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { CaseBook, Case, CaseChildren, vCaseChildren } from '../../models/case.entities';

import { ValidationService } from '../../services/validation.service';
import { CasesService } from '../../services/cases.services';

import { SelectModule, IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { BaseCaseController } from './../basecase.controller';

import * as moment from 'moment';

@Component({
    selector: 'childrenCase',
    templateUrl: 'children_case.component.html',
    inputs: ['caseBook'],
})

export class ChildrenCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public caseChildrenForm: FormGroup;
    public isCaseBookDataLoaded: boolean = false;
    public relationshipWithAbuserLookupOptionsList: Array<IOption> = [];
    public genderLookupOptionsList: Array<IOption> = [];

    constructor(public fb: FormBuilder,
        public validationService: ValidationService,
        public casesService: CasesService,
        public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.isCaseBookDataLoaded = true;
        this.relationshipWithAbuserLookupOptionsList = BaseCaseController.staticParseLookups("RelationshipWithAbuser");
        this.genderLookupOptionsList = BaseCaseController.staticParseLookups("Gender");
    }

    /* Start - Children */
    @ViewChild('childrenModal') public childrenModal: ModalDirective;

    public addNewChild() {
        this.caseBook.SelectedChildren = new CaseChildren();
        this.caseBook.SelectedChildren.CaseId = this.caseBook.Case.CaseId;
        console.log(this.caseBook.SelectedChildren);

        this.caseChildrenForm = this.fb.group({
            Name: new FormControl(this.caseBook.SelectedChildren.Name, Validators.required),
            Age: new FormControl(this.caseBook.SelectedChildren.Age, [Validators.required, this.validationService.validateNumber]),
            GenderLookupId: new FormControl(this.caseBook.SelectedChildren.GenderLookupId == undefined ? null : this.caseBook.SelectedChildren.GenderLookupId.toString(), Validators.required),
            RelationshipWithAbuserLookupId: new FormControl(this.caseBook.SelectedChildren.RelationshipWithAbuserLookupId == undefined ? null : this.caseBook.SelectedChildren.RelationshipWithAbuserLookupId.toString(), Validators.required)
        });
        this.childrenModal.show();
    }

    public editChild(children: vCaseChildren) {
        this.caseBook.SelectedChildren = new CaseChildren();
        this.caseBook.SelectedChildren.CaseChildrenId = children.CaseChildrenId;
        this.caseBook.SelectedChildren.CaseId = children.CaseId;
        this.caseBook.SelectedChildren.Name = children.Name;
        this.caseBook.SelectedChildren.Age = children.Age;
        this.caseBook.SelectedChildren.GenderLookupId = children.GenderLookupId;
        this.caseBook.SelectedChildren.RelationshipWithAbuserLookupId = children.RelationshipWithAbuserLookupId;

        this.caseBook.SelectedChildren.CreatedBy = children.CreatedBy;
        this.caseBook.SelectedChildren.CreatedDateTime = children.CreatedDateTime;
        this.caseBook.SelectedChildren.ModifiedBy = children.ModifiedBy;
        this.caseBook.SelectedChildren.ModifiedDatetime = children.ModifiedDatetime;

        this.caseChildrenForm = this.fb.group({
            Name: new FormControl(this.caseBook.SelectedChildren.Name, Validators.required),
            Age: new FormControl(this.caseBook.SelectedChildren.Age, [Validators.required, this.validationService.validateNumber]),
            GenderLookupId: new FormControl(this.caseBook.SelectedChildren.GenderLookupId.toString(), Validators.required),
            RelationshipWithAbuserLookupId: new FormControl(this.caseBook.SelectedChildren.RelationshipWithAbuserLookupId.toString(), Validators.required)
        });
        this.childrenModal.show();
    }

    public hideChildrenModal(): void {
        this.childrenModal.hide();
    }

    public saveChildren(address: vCaseChildren) {
        this.caseBook.SelectedChildren.Name = this.caseChildrenForm.controls['Name'].value;
        this.caseBook.SelectedChildren.Age = this.caseChildrenForm.controls['Age'].value;
        this.caseBook.SelectedChildren.GenderLookupId = this.caseChildrenForm.controls['GenderLookupId'].value;
        this.caseBook.SelectedChildren.RelationshipWithAbuserLookupId = this.caseChildrenForm.controls['RelationshipWithAbuserLookupId'].value;

        this.casesService
            .updateChildren(this.caseBook).subscribe(data => {
                this.childrenModal.hide();
                this.caseBook.vChildren.push(data);
                this.toastr.success('Children updated successfully');
            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }
    /* End of - Children */
}
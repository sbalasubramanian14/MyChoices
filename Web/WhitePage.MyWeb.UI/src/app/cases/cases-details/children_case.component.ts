import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SelectModule, IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { ValidationService } from '../../services/validation.service';
import { CasesService } from '../../services/cases.services';

import { BaseCaseController } from './../basecase.controller';
import { CaseBook, Case, CaseChildren, vCaseChildren } from '../../models/case.entities';

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

    constructor(
        private fb: FormBuilder,
        private validationService: ValidationService,
        private casesService: CasesService,
        private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.isCaseBookDataLoaded = true;
        this.relationshipWithAbuserLookupOptionsList = BaseCaseController.staticParseLookups("RelationshipWithAbuser");
        this.genderLookupOptionsList = BaseCaseController.staticParseLookups("Gender");
    }

    @ViewChild('childrenModal') public childrenModal: ModalDirective;

    public addNewChild() {
        this.caseBook.SelectedChildren = new CaseChildren();
        this.caseBook.SelectedChildren.CaseId = this.caseBook.Case.CaseId;

        this.caseChildrenForm = this.fb.group({
            Name: [this.caseBook.SelectedChildren.Name, Validators.required],
            Age: [this.caseBook.SelectedChildren.Age, [Validators.required, this.validationService.validateNumber]],
            GenderLookupId: [this.caseBook.SelectedChildren.GenderLookupId == undefined ? null : this.caseBook.SelectedChildren.GenderLookupId.toString(), Validators.required],
            RelationshipWithAbuserLookupId: [this.caseBook.SelectedChildren.RelationshipWithAbuserLookupId == undefined ? null : this.caseBook.SelectedChildren.RelationshipWithAbuserLookupId.toString(), Validators.required]
        });

        this.childrenModal.show();
    }

    public editChild(children: vCaseChildren) {
        let childrenObject = new CaseChildren();

        childrenObject.CaseChildrenId = children.CaseChildrenId;
        childrenObject.CaseId = children.CaseId;
        childrenObject.Name = children.Name;
        childrenObject.Age = children.Age;
        childrenObject.GenderLookupId = children.GenderLookupId;
        childrenObject.RelationshipWithAbuserLookupId = children.RelationshipWithAbuserLookupId;

        childrenObject.CreatedBy = children.CreatedBy;
        childrenObject.CreatedDateTime = children.CreatedDateTime;
        childrenObject.ModifiedBy = children.ModifiedBy;
        childrenObject.ModifiedDatetime = children.ModifiedDatetime;

        this.caseBook.SelectedChildren = childrenObject;

        this.caseChildrenForm = this.fb.group({
            Name: [childrenObject.Name, Validators.required],
            Age: [childrenObject.Age, [Validators.required, this.validationService.validateNumber]],
            GenderLookupId: [childrenObject.GenderLookupId.toString(), Validators.required],
            RelationshipWithAbuserLookupId: [childrenObject.RelationshipWithAbuserLookupId.toString(), Validators.required]
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

        this.casesService.updateChildren(this.caseBook).subscribe(
            data => {
                this.childrenModal.hide();

                let selectedChildrenId = this.caseBook.SelectedChildren.CaseChildrenId;

                selectedChildrenId == undefined ?
                    this.caseBook.vChildren.push(data) :
                    this.caseBook.vChildren[this.caseBook.vChildren.findIndex(child => child.CaseChildrenId == selectedChildrenId)] = data

                this.toastr.success('Children updated successfully');
            },
            (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            }
        );
    }
}
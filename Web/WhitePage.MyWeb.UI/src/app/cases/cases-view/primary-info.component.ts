import { Component, Input, OnInit } from '@angular/core';
import { IOption } from 'ng-select';

import { CaseBook } from '../../models/case.entities';
import { Center, PeaceMaker, Counselor, Lookup } from '../../models/entities';
import { BaseCaseController } from './../basecase.controller';

@Component({
    selector:'primary-info',
    templateUrl: 'primary-info.component.html',
    inputs:['caseBook'],
    styleUrls: ['../cases.view.scss'],   
})
export class PrimaryInfoComponent  implements OnInit  {
    
    public caseBook: CaseBook;
    public primaryForm: any;
    public isPrimaryDataLoaded: boolean = false;

    public centerList: Array<Center> = [];
    public peaceMakersList: Array<PeaceMaker> = [];
    public counselorsList: Array<Counselor> = [];
    public lookupsList: Array<Lookup> = [];

    public centerOptionList: Array<IOption> = [];
    public peaceMakerOptionsList: Array<IOption> = [];
    public counselorOptionsList: Array<IOption> = [];
    public genderLookupOptionsList: Array<IOption> = [];
    public maritalStatusLookupOptionsList: Array<IOption> = [];
    public requireAssistanceLookupOptionsList: Array<IOption> = [];

    constructor() {
        /* getAllCenters - starts */
        this.centerList = JSON.parse(localStorage.getItem("getAllCenters"));
        var localCenterOptionList = new Array<IOption>();
        for (var i = 0; i < this.centerList.length; i++) {
            localCenterOptionList.push({
                value: this.centerList[i].CenterId.toString(),
                label: this.centerList[i].Title
            });
        }
        this.centerOptionList = localCenterOptionList;
        /* getAllCenters - ends */

        this.genderLookupOptionsList = BaseCaseController.staticParseLookups("Gender");
        this.maritalStatusLookupOptionsList = BaseCaseController.staticParseLookups("MaritalStatus");
        this.requireAssistanceLookupOptionsList = BaseCaseController.staticParseLookups("RequiredAssistance");       
    }
    ngOnInit() {
        /* getPeacemaker - starts */
        var localPeaceMakerOptionsList = new Array<IOption>();
        this.peaceMakersList = JSON.parse(localStorage.getItem("getAllPeaceMakers"));
        for (var i = 0; i < this.peaceMakersList.length; i++) {
            if (this.peaceMakersList[i].CenterId == this.caseBook.Case.CenterId) {
                localPeaceMakerOptionsList.push({
                    value: this.peaceMakersList[i].PeaceMakerId.toString(),
                    label: this.peaceMakersList[i].FirstName + ' ' + this.peaceMakersList[i].LastName
                });
            }
        }
        this.peaceMakerOptionsList = localPeaceMakerOptionsList;
        /* getPeacemaker - ends */

        /* getCounselor - starts */
        var localCounselorOptionsList = new Array<IOption>();
        this.counselorsList = JSON.parse(localStorage.getItem("getAllCounselors"));
        for (var i = 0; i < this.counselorsList.length; i++) {
            if (this.counselorsList[i].CenterId == this.caseBook.Case.CenterId || this.counselorsList[i].IsGlobal) {
                localCounselorOptionsList.push({
                    value: this.counselorsList[i].CounselorId.toString(),
                    label: this.counselorsList[i].FirstName + ' ' + this.counselorsList[i].LastName
                });
            }
        }
        this.counselorOptionsList = localCounselorOptionsList;
        /* getCounselor - ends */
        this.primaryForm = this.caseBook.Case;
        this.isPrimaryDataLoaded = true;
     }
}
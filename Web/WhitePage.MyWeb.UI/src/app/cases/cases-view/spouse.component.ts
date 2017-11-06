import { Component, Input, OnInit } from '@angular/core';
import { IOption } from 'ng-select';

import { CaseBook } from '../../models/case.entities';
import { BaseCaseController } from './../basecase.controller';
import { State } from '../../models/entities';

@Component({
    selector: 'spouse',
    templateUrl: 'spouse.component.html',
    inputs: ['caseBook'],
    styleUrls: ['../cases.view.scss'],
})
export class SpouseComponent implements OnInit {

    public caseBook: CaseBook;
    public spouseForm: any;
    public statesList: Array<State> = [];
    public isSpouseDataLoaded: boolean = false;

    public spouseEducationLookupIdLookupOptionsList: Array<IOption> = [];
    public spouseStateOptionsList: Array<IOption> = [];
    public spouseCityOptionsList: Array<IOption> = [];
    public emergencyRelationshipOptionsList: Array<IOption> = [];

    constructor() {
        this.statesList = JSON.parse(localStorage.getItem("getAllStates"));
        this.spouseEducationLookupIdLookupOptionsList = BaseCaseController.staticParseLookups("LevelOfEducation");
        this.emergencyRelationshipOptionsList = BaseCaseController.staticParseLookups("RelationshipWithClient");
    }

    ngOnInit() {
        this.spouseForm = this.caseBook.Spouse;
        this.isSpouseDataLoaded = true;
        /* spouseCity list */
        var localCityOptionsList = new Array<IOption>();
        for (var i = 0; i < this.statesList.length; i++) {
            for (var j = 0; j < this.statesList[i].Cities.length; j++) {
                localCityOptionsList.push({
                    value: this.statesList[i].Cities[j].CityId.toString(),
                    label: this.statesList[i].Cities[j].Title
                });
            }
        }
        this.spouseCityOptionsList = localCityOptionsList;
        /* spouseCity list */

        /* spouseState list */
        var localStatesOptionList = new Array<IOption>();
        for (var i = 0; i < this.statesList.length; i++) {
            localStatesOptionList.push({
                value: this.statesList[i].StateId.toString(),
                label: this.statesList[i].Title
            });
        }
        this.spouseStateOptionsList = localStatesOptionList;
        /* spouseState list*/       
    }
}
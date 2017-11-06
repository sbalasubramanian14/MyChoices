import { Component, Input, OnInit } from '@angular/core';
import {  ActivatedRoute, Params } from '@angular/router';

import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';
import { ChartsService } from '../services/charts.services';

import { CaseBook } from '../models/case.entities';
import { BaseCaseController } from './basecase.controller';

import { MatchesPipe } from './../pipes/Matches.Pipe';

@Component({
    templateUrl: 'cases.view.html',
    styleUrls: ['cases.view.scss']
})
export class CasesViewComponent extends BaseCaseController implements OnInit {
    public caseBook: CaseBook;
    private selectedCaseId: number;
    
    constructor(public casesService: CasesService,
        public commonService: CommonService,
        public chartsService: ChartsService,
        public activatedRoute: ActivatedRoute) {
        super(casesService, commonService, chartsService);
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.selectedCaseId = params['id'];

            this.casesService
                .GetCaseById(this.selectedCaseId)
                .subscribe(data => {
                    this.caseBook = data;
                });
        });
    }
}
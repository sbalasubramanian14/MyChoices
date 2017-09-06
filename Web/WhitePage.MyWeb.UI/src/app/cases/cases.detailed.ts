import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';
import { ChartsService } from '../services/charts.services'

import { BaseCaseController } from './basecase.controller';

import { CaseBook} from '../models/case.entities';

@Component({
    templateUrl: 'cases.detailed.html',
})

export class CasesDetailedComponent extends BaseCaseController implements OnInit {
    public caseBook: CaseBook;
    private selectedCaseId: number;
    public isCaseBookDataLoaded: boolean = false;
        
    constructor(
        public casesService: CasesService,
        public commonService: CommonService,
        public chartsService: ChartsService, 
        public activatedRoute: ActivatedRoute) {

        super(casesService, commonService, chartsService);
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.selectedCaseId = params['id'];

            this.casesService.GetCaseById(this.selectedCaseId).subscribe(
                data => {
                    this.caseBook = data;
                    this.isCaseBookDataLoaded = true;
                });
        });
    }
   
}

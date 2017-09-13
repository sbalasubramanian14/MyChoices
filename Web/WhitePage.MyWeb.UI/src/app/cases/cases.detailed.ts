import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';
import { ChartsService } from '../services/charts.services'

import { BaseCaseController } from './basecase.controller';

import { CaseBook} from '../models/case.entities';

@Component({
    templateUrl: 'cases.detailed.html',
    styleUrls: ['cases.detailed.scss'],
})

export class CasesDetailedComponent extends BaseCaseController implements OnInit {
    public caseBook: CaseBook;
    private selectedCaseId: number;
    public isCaseBookDataLoaded: boolean = false;
    public isLookupsLoaded:boolean = false;
    public isCentersLoaded:boolean = false;
    public isStatusesLoaded: boolean = false;
    public isStatesLoaded:boolean = false;
        
    constructor(
        public casesService: CasesService,
        public commonService: CommonService,
        public chartsService: ChartsService, 
        public activatedRoute: ActivatedRoute,
        public toastr: ToastsManager,
        public vRef: ViewContainerRef) {

        super(casesService, commonService, chartsService);

        this.toastr.setRootViewContainerRef(vRef);

        this.observerDataSubject.subscribe(data => {
            switch (data) {
                case "CaseStatuses":
                    this.isStatusesLoaded = true;
                    break;
                case "Centers":
                    this.isCentersLoaded = true;
                    break;
                case "States":
                    this.isStatesLoaded = true;
                    break;
                case "Lookups":
                    this.isLookupsLoaded = true;
                    break;
                default:
                    break;
            }
        });
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

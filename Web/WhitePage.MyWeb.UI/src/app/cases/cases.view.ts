import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';
import { ChartsService } from '../services/charts.services';

import { CaseBook } from '../models/case.entities';
import { BaseCaseController } from './basecase.controller';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { MatchesPipe } from './../pipes/Matches.Pipe';

@Component({
    templateUrl: 'cases.view.html',
    styleUrls: ['cases.view.scss']
})
export class CasesViewComponent extends BaseCaseController implements OnInit {
    public caseBook: CaseBook;
    private selectedCaseId: number;


    public router: Router;


    constructor(public casesService: CasesService,
        public commonService: CommonService,
        public chartsService: ChartsService,
        public routerObj: Router,
        public activatedRoute: ActivatedRoute) {
        super(casesService, commonService, chartsService);

        this.router = routerObj;
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.selectedCaseId = params['id'];

            this.casesService
                .GetCaseById(this.selectedCaseId)
                .subscribe(data => {
                    //console.log(data);

                    this.caseBook = data;
                    //console.log(this.caseBook);
                });
        });
    }

}
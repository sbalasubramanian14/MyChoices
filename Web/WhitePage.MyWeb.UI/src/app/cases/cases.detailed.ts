import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CasesService } from '../services/cases.services';

import { CaseBook} from '../models/case.entities';

@Component({
    templateUrl: 'cases.detailed.html',
})

export class CasesDetailedComponent implements OnInit {
    public caseBook: CaseBook;
    private selectedCaseId: number;
        
    constructor(
        private casesService: CasesService, 
        public activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.selectedCaseId = params['id'];

            this.casesService.GetCaseById(this.selectedCaseId).subscribe(
                data => {
                    this.caseBook = data;
                });
        });
    }
   
}

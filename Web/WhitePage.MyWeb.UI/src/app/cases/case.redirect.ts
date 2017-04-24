import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'case-redirect',
    template: ''
})
export class CaseRedirectComponent implements OnInit {

    constructor(private router: Router,
        private _route: ActivatedRoute)
    { }
    private selectedCaseId: number;

    ngOnInit() {        
        this._route.params.forEach((params: Params) => {
            this.selectedCaseId = params['id'];

            var url = '/cases/detailed/' + this.selectedCaseId;
            this.router.navigate([url]);
        });
        
    }

}
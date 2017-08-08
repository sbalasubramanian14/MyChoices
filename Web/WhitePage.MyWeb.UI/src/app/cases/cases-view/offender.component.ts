import { Component, Input } from '@angular/core';
import { CaseBook } from '../../models/case.entities';
import { BaseCaseController } from './../basecase.controller';

@Component({
    selector: 'offender',
    templateUrl: 'offender.component.html',
    inputs: ['caseBook'],
    styleUrls: ['../cases.view.scss'],

})
export class OffenderComponent {

    public caseBook: CaseBook;
    constructor() {
    }

}
import { Component, Input } from '@angular/core';
import { IOption } from 'ng-select';

import { CaseBook } from '../../models/case.entities';
import { BaseCaseController } from './../basecase.controller';

@Component({
    selector: 'children',
    templateUrl: 'children.component.html',
    inputs: ['caseBook'],
    styleUrls: ['../cases.view.scss'],

})
export class ChildrenComponent {

    public caseBook: CaseBook;
    public relationshipWithAbuserLookupOptionsList: Array<IOption> = [];

    constructor() {
       this.relationshipWithAbuserLookupOptionsList = BaseCaseController.staticParseLookups("RelationshipWithAbuser");
 
    }
}

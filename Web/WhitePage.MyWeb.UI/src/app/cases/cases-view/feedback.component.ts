import { Component, Input } from '@angular/core';
import { CaseBook } from '../../models/case.entities';

@Component({
    selector: 'feedback',
    templateUrl: 'feedback.component.html',
    inputs: ['caseBook'],
    styleUrls: ['../cases.view.scss'],

})
export class FeedbackComponent {

    public caseBook: CaseBook;

    constructor() {
        
   }
}

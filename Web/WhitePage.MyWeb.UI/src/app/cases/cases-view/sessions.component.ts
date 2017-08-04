import { Component, Input} from '@angular/core';
import { CaseBook } from '../../models/case.entities';

@Component({
    selector: 'sessions',
    templateUrl: 'sessions.component.html',
    inputs: ['caseBook'],
    styleUrls: ['../cases.view.scss'],

})
export class SessionsComponent {
 
    public caseBook: CaseBook;

    constructor() {
    }

}
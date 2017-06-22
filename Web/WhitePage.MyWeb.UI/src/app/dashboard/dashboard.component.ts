import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardModule } from './dashboard.module';
import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';
import { ChartsService } from '../services/charts.services';

import { Case } from '../models/case.entities'

@Component({
    selector: 'charts',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    providers: [ CasesService, CommonService, ChartsService ]
})

export class DashboardComponent implements OnInit {

    constructor()
    {
    };

    ngOnInit(): void { 
    };  
}

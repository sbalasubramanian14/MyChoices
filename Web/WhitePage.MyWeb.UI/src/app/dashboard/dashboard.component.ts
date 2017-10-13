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
    //styleUrls: ['dashboard.component.scss'],
    providers: [ CasesService, CommonService, ChartsService ]
})

export class DashboardComponent implements OnInit {

    public isAllChartsLoaded = false;
    public isNewCasesChartsLoaded = false;
    public isClosedCasesChartsLoaded = false;
    public isOpenCasesChartsLoaded = false;
    public isResolutionRatesChartsLoaded = false;
    public isCounsellingHoursChartsLoaded = false;
    public isSessionsChartsLoaded = false;
    public isSoughtHelpChartsLoaded = false;
    public isSignedCasesChartsLoaded = false;
    constructor()
    {
    };

    ngOnInit(): void { 
    };  
    public onChartsLoaded(status: string) {
        switch (status) {
            case "NewCasesLoaded":
                this.isNewCasesChartsLoaded = true;
                break;
            case "ClosedCasesLoaded":
                this.isClosedCasesChartsLoaded = true;
                break;
            case "OpenCasesLoaded":
                this.isOpenCasesChartsLoaded = true;
                break;
            case "ResolutionRatesLoaded":
                this.isResolutionRatesChartsLoaded = true;
                break;
            case "CounsellingHoursLoaded":
                this.isCounsellingHoursChartsLoaded = true;
                break;
            case "SessionsLoaded":
                this.isSessionsChartsLoaded = true;
                break;
            case "SoughtHelpLoaded":
                this.isSoughtHelpChartsLoaded = true;
                break;
            case "SignedCasesLoaded":
                this.isSignedCasesChartsLoaded = true;
                break;
            default: console.log("Check the message emitted by your component");
        }
        if (this.isNewCasesChartsLoaded &&  this.isClosedCasesChartsLoaded &&   this.isOpenCasesChartsLoaded  && this.isResolutionRatesChartsLoaded
            && this.isCounsellingHoursChartsLoaded  &&  this.isSessionsChartsLoaded && this.isSoughtHelpChartsLoaded && this.isSignedCasesChartsLoaded)
        {
            this.isAllChartsLoaded = true;
        }
    }
}

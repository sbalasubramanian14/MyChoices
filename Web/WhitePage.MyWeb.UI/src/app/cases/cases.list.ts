import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { CasesService } from '../services/cases.services';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import { Case, CaseAddress, CaseBook, CaseHeader } from '../models/case.entities';

@Component({
    templateUrl: 'cases.list.html'
})
export class CasesListComponent implements OnInit {
    @ViewChild('moveModal')
    public moveModal: ModalDirective;

    public router: Router;
    public casesList: CaseHeader[] = [];
    public selectedCaseHeader: CaseHeader;

    constructor(private casesService: CasesService, private routerObj: Router) {
        this.router = routerObj;
        this.length = this.casesList.length;
    }

    ngOnInit() {
        this.onChangeTable(this.config);
        this.getAllCaseHeaders();
    }

    private getAllCaseHeaders() {
        this.casesList = [];
        this.casesService
            .GetAll()
            .subscribe(data => {
                data.forEach(d => this.casesList.push(d));
                this.length = this.casesList.length;
                this.onChangeTable(this.config);
            });
    }

    viewCase(caseDetails: any) {
        var url = '/cases/detailed/' + caseDetails.CaseId;
        this.router.navigate([url]);
    }

    editCase(caseDetails: any) {
        var url = '/cases/detailedview/' + caseDetails.CaseId;
        this.router.navigate([url]);
    }

    deleteCase(caseDetails: any) {
        var url = '/cases/detailed/' + caseDetails.CaseId;
        this.router.navigate([url]);
    }

    moveCase(caseDetails: CaseHeader) {
        console.log(caseDetails);
        this.selectedCaseHeader = caseDetails;
        this.moveModal.show();
        //var url = '/cases/detailed/' + caseDetails.CaseId;
        //this.router.navigate([url]);
    }

    public hideChildModal(): void {
        this.moveModal.hide();
    }

    public rows: Array<any> = [];
    public columns: Array<any> = [
        { title: 'No#', name: 'CaseNumber', sort: true, filtering: { filterString: '', placeholder: 'No#' } },
        { title: 'Name', name: 'ClientName', sort: true, filtering: { filterString: '', placeholder: 'Name#' } },
        { title: 'Status', name: 'CaseStatus', sort: true, filtering: { filterString: '', placeholder: 'Status' } },
        { title: 'Date', name: 'RegisterDateString', sort: true, filtering: { filterString: '', placeholder: 'Date' } },
        { title: 'Center', name: 'CenterTitle', sort: true, filtering: { filterString: '', placeholder: 'Center' } },
        { title: 'Peace Maker', name: 'PeaceMaker', sort: true, filtering: { filterString: '', placeholder: 'Peace Maker' } },
        { title: 'Mobile', name: 'MobileNumber', sort: true, filtering: { filterString: '', placeholder: 'Mobile' } }
    ];
    public page: number = 1;
    public itemsPerPage: number = 10;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;

    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['case-list-table', 'table-bordered']
    };

    public changePage(page: any, data: Array<any> = this.casesList): Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

    public changeSort(data: any, config: any): any {
        if (!config.sorting) {
            return data;
        }

        let columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }

        if (!columnName) {
            return data;
        }

        // simple sorting
        return data.sort((previous: any, current: any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }

    public changeFilter(data: any, config: any): any {
        let filteredData: Array<any> = data;
        this.columns.forEach((column: any) => {
            if (column.filtering) {
                filteredData = filteredData.filter((item: any) => {
                    return item[column.name].toLowerCase().match(column.filtering.filterString.toLowerCase());
                });
            }
        });

        if (!config.filtering) {
            return filteredData;
        }

        if (config.filtering.columnName) {
            return filteredData.filter((item: any) =>
                item[config.filtering.columnName].match(this.config.filtering.filterString.toLowerCase()));
        }

        let tempArray: Array<any> = [];
        filteredData.forEach((item: any) => {
            let flag = false;
            this.columns.forEach((column: any) => {
                if (item[column.name].toString().match(this.config.filtering.filterString.toLowerCase())) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;

        return filteredData;
    }

    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }

        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.casesList, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }

    public onCellClick(data: CaseHeader): any {
        console.log("cell click");
        console.log(data);
    }

    public onMoveClick(data: CaseHeader): any {
        console.log("move click");
        console.log(data);
    }

    public onEditClick(data: CaseHeader): any {
        var url = '/cases/detailed/' + data.CaseId;
        this.router.navigate([url]);        
    }

    public onViewClick(data: CaseHeader): any {
        console.log("view click");
        console.log(data);
    }

    public onDeleteClick(data: CaseHeader): any {
        console.log("delete click");
        console.log(data);
    }
}

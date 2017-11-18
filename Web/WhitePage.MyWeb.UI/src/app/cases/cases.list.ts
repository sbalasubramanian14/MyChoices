import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { CasesService } from '../services/cases.services';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import { Case, CaseAddress, CaseBook, CaseHeader } from '../models/case.entities';
import { AuthenticationService } from '../services/authentication.service';
@Component({
    templateUrl: 'cases.list.html'
})
export class CasesListComponent implements OnInit {
   
    @ViewChild('deleteModal')
    public deleteModal: ModalDirective;
    public router: Router;
    public casesList: CaseHeader[] = [];
    public selectedCaseHeader: CaseHeader;
    public enableSpinner: boolean = true;
    public caseDictionary: any = new Object;
    public selectedCaseId: number;
    public caseNumber: string;

    constructor(private casesService: CasesService, private routerObj: Router,
        private authenticationService: AuthenticationService,
        public toastr: ToastsManager,
        public vRef: ViewContainerRef) {

        this.router = routerObj;
        this.toastr.setRootViewContainerRef(vRef);
    }

    ngOnInit() {
        this.getData();
    }
    public getData():any {
        this.onChangeTable(this.config);
        this.getCasesCount();
    }
    private getAllCaseHeaders(page: any, itemsPerPage: any) {
        this.casesService
            .GetAllActive(page, itemsPerPage)
            .subscribe(data => {
                this.casesList = [];
                data.forEach(d => this.casesList.push(d));
                this.enableSpinner = false;
                this.onChangeTable(this.config, { page: page, itemsPerPage: itemsPerPage });
            });
    }

    private getAllCaseHeadersWithFilters(page: any, itemsPerPage: any, dictionary: any) {
        this.casesService
            .GetFilteredCases(page, itemsPerPage, dictionary)
            .subscribe(data => {
                this.casesList = [];
                data.forEach(d => this.casesList.push(d));
                this.enableSpinner = false;
                this.onChangeTable(this.config, { page: page, itemsPerPage: itemsPerPage });
            });
    }

    private getAllCasesWithSortedDataAsc(page: number, itemsPerPage: number, field: string) {
        this.casesService
            .GetSortedCasesDataAsc(page, itemsPerPage, this.caseDictionary, field)
            .subscribe(data => {
                this.casesList = [];
                data.forEach(d => this.casesList.push(d));
                this.enableSpinner = false;
                this.onChangeTable(this.config, { page: page, itemsPerPage: itemsPerPage });
            });
    }

    private getAllCasesWithSortedDataDesc(page: number, itemsPerPage: number, field: string) {
        this.casesService
            .GetSortedCasesDataDesc(page, itemsPerPage, this.caseDictionary, field)
            .subscribe(data => {
                this.casesList = [];
                data.forEach(d => this.casesList.push(d));
                this.enableSpinner = false;
                this.onChangeTable(this.config, { page: page, itemsPerPage: itemsPerPage });
            });
    }

    private changeData(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }) {
        this.enableSpinner = true;       
        var sortingEnabled = false;

        if (Object.keys(this.caseDictionary).length == 0) {
            this.getAllCaseHeaders(page.page, page.itemsPerPage);
        }
        else {
            config.sorting.columns.forEach((column: any) => {
                if (column.sort == "asc") {
                    this.getAllCasesWithSortedDataAsc(page.page, page.itemsPerPage, column.name);
                    sortingEnabled = true;
                }

                if (column.sort == "desc") {
                    this.getAllCasesWithSortedDataDesc(page.page, page.itemsPerPage, column.name);
                    sortingEnabled = true;
                }
            });

            if (!sortingEnabled) {
                this.changeFilteredData(page.page, page.itemsPerPage, config);
            }
        }
    }

    private changeFilteredData(page: number, itemsPerPage: number, config: any) {
        this.getAllCaseHeadersWithFilters(page, itemsPerPage, this.caseDictionary);
    }

    public getCasesCount() {
        this.casesService.GetCasesCount().subscribe(
            data => {
                this.length = Number(data);
                this.getAllCaseHeaders(1, 10);
            })
    }

    public getFilteredCases(config: any) {
        this.enableSpinner = true;
        var sortingEnabled = false;

        this.columns.forEach((column: any) => {
            if (column.filtering) {
                this.caseDictionary[column.name] = column.filtering.filterString.toLowerCase();
            }
        });

        config.sorting.columns.forEach((column: any) => {
            if (column.sort == "asc")
            {
                this.getAllCasesWithSortedDataAsc(this.page, this.itemsPerPage, column.name);
                sortingEnabled = true;
            }

            if (column.sort == "desc")
            {
                this.getAllCasesWithSortedDataDesc(this.page, this.itemsPerPage, column.name);
                sortingEnabled = true;
            }
        });

        if (!sortingEnabled) {
            this.casesService.GetFilteredCasesCount(this.page, this.itemsPerPage, this.caseDictionary).subscribe(
                data => {
                    this.length = Number(data);
                    this.changeFilteredData(this.page, this.itemsPerPage, config);
                })
        }
    }

    public rows: Array<any> = [];
    public columns: Array<any> = [
        { title: 'No#', name: 'CaseNumber', sort: true, filtering: { filterString: '', placeholder: 'No#' } },
        { title: 'Name', name: 'ClientName', sort: true, filtering: { filterString: '', placeholder: 'Name' } },
        { title: 'Status', name: 'CaseStatus', sort: true, filtering: { filterString: '', placeholder: 'Status' } },
        { title: 'Date', name: 'RegisterDateString', sort: true, filtering: { filterString: '', placeholder: 'Date' } },
        { title: 'Center', name: 'CenterTitle', sort: true, filtering: { filterString: '', placeholder: 'Center' } },
        { title: 'Peace Maker', name: 'PeaceMaker', sort: true, filtering: { filterString: '', placeholder: 'Peace Maker' } },
        { title: 'Counselor', name: 'Counselor', sort: true, filtering: { filterString: '', placeholder: 'Counselor' } },
        { title: 'Mobile', name: 'MobileNumber', sort: true, filtering: { filterString: '', placeholder: 'Mobile' } }
    ];
    public page: number = 1;
    public itemsPerPage: number = 10;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;

    public userData = this.authenticationService.getUser();

    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['case-list-table', 'table-bordered'],
        enableMove: true,
        enableEdit: true,
        enableView: true,
        enableDelete: this.userData.typ == "1" ? true : false, //Enabled delete for roleid 1
    };

    public changePage(page: any, data: Array<any> = this.casesList): Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data;
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
    }

    public onCellClick(data: CaseHeader): any {
        console.log("cell click");
        console.log(data);
    }

    public onMoveClick(data: any): any {
        var url = '/cases/move/' + data.row.CaseId;
        this.router.navigate([url]);
    }

    public onEditClick(data: any): any {        
        var url = '/cases/detailed/' + data.row.CaseId;
        this.router.navigate([url]);        
    }

    public onViewClick(data: any): any {
        var url = '/cases/view/' + data.row.CaseId;
        this.router.navigate([url]);
    }
    
    public onDeleteClick(data: any): any {
        this.deleteModal.show();
        this.selectedCaseId = data.row.CaseId;
        this.caseNumber = data.row.CaseNumber;    
       
    }
    
    public softDeleteCase(CaseId: number): any {
        this.enableSpinner = true;
        this.casesService.deleteCase(CaseId).subscribe(data => {
            this.toastr.success('Case Deleted Successfully');
            this.deleteModal.hide();
            this.enableSpinner = false;
            this.getData();
        },
            (error: any) => {
            this.toastr.error("Error while deleting case, " + error);
        });
    }

    public hideDeleteModal(): void {
        this.deleteModal.hide();
    }
}


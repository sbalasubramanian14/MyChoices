import { Component, Input, Output, OnInit, ViewChild, ViewContainerRef, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { ModalDirective } from 'ng2-bootstrap';

import { CommonService } from '../services/common.services';
import { AuthenticationService } from '../services/authentication.service';

import { User } from '../models/entities';

@Component({
    selector: 'deactivate-user',
    templateUrl: 'deactivateUser.html',
})

export class DeactivateUserComponent {

    @ViewChild('deactivateModal')
    public deactivateModal: ModalDirective;
    public enableSpinner: boolean = true;
    public userList: User[] = [];
    public userDictionary: any = new Object;
    public selectedUserId: number;
    public selectedUserName: string;    
    @Output() onDeactivateUserLoaded: EventEmitter<any> = new EventEmitter<any>();

    public rows: Array<any> = [];
    public columns: Array<any> = [
        { title: 'First Name', name: 'FirstName', sort: true, filtering: { filterString: '', placeholder: 'First Name' } },
        { title: 'Last Name', name: 'LastName', sort: true, filtering: { filterString: '', placeholder: 'Last Name' } },
        { title: 'Email', name: 'UserName', sort: true, filtering: { filterString: '', placeholder: 'Email' } },
    ];

    public userData = this.authenticationService.getUser();

    public page: number = 1;
    public itemsPerPage: number = 10;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;

    constructor(
        private authenticationService: AuthenticationService,
        private commonService: CommonService,
        private toastr: ToastsManager) {   }

    ngOnInit() {
        this.getData();
    }

    public getData(): any {
        this.onChangeTable(this.config);
        this.getUserCount();
    }

    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['case-list-table', 'table-bordered'],
        enableMove: false,
        enableEdit: false,
        enableView: false,
        enableDelete: this.userData.typ == "1" ? true : false, //Enabled delete for roleid 1
    };

    public changeFilter(data: any, config: any): any {
        let filteredData: Array<any> = data;
        this.columns.forEach((column: any) => {
            if (column.filtering) {
                filteredData = filteredData.filter((item: any) => {
                    return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
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

    public changePage(page: any, data: Array<any> = this.userList): Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data;
    }

    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {

        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }

        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.userList, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    }

    public getUserCount() {
        this.commonService.getNonAdminUsersCount().subscribe(
            data => {
                this.length = Number(data);
                this.getAllUsers(1, 10);
            })
    }

    private getAllUsers(page: any, itemsPerPage: any) {
        this.commonService.
            getActiveNonAdminUsers(page, itemsPerPage)
            .subscribe(data => {
                this.userList = [];
                data.forEach(d => this.userList.push(d));
                this.enableSpinner = false;
                this.onDeactivateUserLoaded.emit(true);
                this.onChangeTable(this.config, { page: page, itemsPerPage: itemsPerPage });
               
            });
    }

    private getAllUsersWithSortedDataAsc(page: number, itemsPerPage: number, field: string) {
        this.commonService
            .GetSortedUsersDataAsc(page, itemsPerPage, this.userDictionary, field)
            .subscribe(data => {
                this.userList = [];
                data.forEach(d => this.userList.push(d));
                this.enableSpinner = false;
                this.onChangeTable(this.config, { page: page, itemsPerPage: itemsPerPage });
            });
    }

    private getAllUsersWithSortedDataDesc(page: number, itemsPerPage: number, field: string) {
        this.commonService
            .GetSortedUsersDataDesc(page, itemsPerPage, this.userDictionary, field)
            .subscribe(data => {
                this.userList = [];
                data.forEach(d => this.userList.push(d));
                this.enableSpinner = false;
                this.onChangeTable(this.config, { page: page, itemsPerPage: itemsPerPage });
            });
    }

    private changeFilteredData(page: number, itemsPerPage: number, config: any) {
        this.getAllUsersWithFilters(page, itemsPerPage, this.userDictionary);
    }

    private getAllUsersWithFilters(page: any, itemsPerPage: any, dictionary: any) {
        this.commonService
            .GetFilteredUsers(page, itemsPerPage, dictionary)
            .subscribe(data => {
                this.userList = [];
                data.forEach(d => this.userList.push(d));
                this.enableSpinner = false;
                this.onChangeTable(this.config, { page: page, itemsPerPage: itemsPerPage });
            });
    }
   

    private changeData(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }) {
        this.enableSpinner = true;
        var sortingEnabled = false;

        if (Object.keys(this.userDictionary).length == 0) {
            this.getAllUsers(page.page, page.itemsPerPage);
        }
        else {
            config.sorting.columns.forEach((column: any) => {
                if (column.sort == "asc") {
                    this.getAllUsersWithSortedDataAsc(page.page, page.itemsPerPage, column.name);
                    sortingEnabled = true;
                }

                if (column.sort == "desc") {
                    this.getAllUsersWithSortedDataDesc(page.page, page.itemsPerPage, column.name);
                    sortingEnabled = true;
                }
            });

            if (!sortingEnabled) {
                this.changeFilteredData(page.page, page.itemsPerPage, config);
            }
        }
    }

    public getFilteredUsers(config: any) {
        //  this.enableSpinner = true;
        var sortingEnabled = false;

        this.columns.forEach((column: any) => {
            if (column.filtering) {
                this.userDictionary[column.name] = column.filtering.filterString.toLowerCase();
            }
        });

        config.sorting.columns.forEach((column: any) => {
            if (column.sort == "asc") {
                this.getAllUsersWithSortedDataAsc(this.page, this.itemsPerPage, column.name);
                sortingEnabled = true;
            }

            if (column.sort == "desc") {
                this.getAllUsersWithSortedDataDesc(this.page, this.itemsPerPage, column.name);
                sortingEnabled = true;
            }
        });

        if (!sortingEnabled) {
            this.commonService.GetFilteredUsersCount(this.page, this.itemsPerPage, this.userDictionary).subscribe(
                data => {
                    this.length = Number(data);
                    this.changeFilteredData(this.page, this.itemsPerPage, config);
                })
        }
    }

    public hideDeactivateModal(): void {
        this.deactivateModal.hide();
    }

    public onDeleteClick(data: any): any {
        this.deactivateModal.show();
        this.selectedUserId = data.row.UserId;
        this.selectedUserName = data.row.UserName;

    }

    public softDeleteUser(CaseId: number): any {
        this.enableSpinner = true;
        this.authenticationService.deactivateUser(CaseId).subscribe(data => {
            this.toastr.success('User Deactivated Successfully');
            this.deactivateModal.hide();
            this.enableSpinner = false;
            this.getData();
        },
            (error: any) => {
                this.toastr.error("Error while deactivating user, " + error);
            });
    }
}

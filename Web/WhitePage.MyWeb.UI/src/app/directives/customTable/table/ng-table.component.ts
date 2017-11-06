import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'ng-table',
    template: `
    <style>
        .table-fa-icon{
            cursor: pointer;
            margin-right: 5px;
        }
        .table-fa-icon:hover{
            color: rgb(60, 222, 205);
        }
    </style>
    <table class="table table-responsive" ngClass="{{config.className || ''}}">
        <thead>
            <tr role="row">
                <th style="text-align:center">Actions</th>
                <th *ngFor="let column of columns" [ngTableSorting]="config" [column]="column"
                    (sortChanged)="onChangeTable($event)" ngClass="{{column.className || ''}}">
                    {{column.title}}
                    <i *ngIf="config && column.sort" class="pull-right fa"
                       [ngClass]="{'fa-chevron-down': column.sort === 'desc', 'fa-chevron-up': column.sort === 'asc'}"></i>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr *ngIf="showFilterRow">
                <td style="text-align:center; padding-top: 18px;">
                    Manage
                </td>
                <td *ngFor="let column of columns">
                    <input *ngIf="column.filtering" placeholder="{{column.filtering.placeholder}}"
                           [ngTableFiltering]="column.filtering"
                           class="form-control"
                           style=""
                           (tableChanged)="onChangeTable(config)" />
                </td>
            </tr>
            <tr *ngFor="let row of rows">
                <td>
                <div style="display: flex; align-items: center; justify-content: center;">
                    <span><i class="fa fa-lg fa-arrows table-fa-icon" (click)="moveClick(row)" tooltip="Move" *ngIf="config.enableMove"></i></span>
                    <span><i class="fa fa-lg fa-pencil-square table-fa-icon" (click)="editClick(row)" tooltip="Edit" *ngIf="config.enableEdit"></i></span>
                    <span><i class="fa fa-lg fa-eye table-fa-icon" (click)="viewClick(row)" tooltip="View"  *ngIf="config.enableView" ></i></span>
                    <span><i class="fa fa-lg fa-trash table-fa-icon" (click)="deleteClick(row)" tooltip="Delete" *ngIf="config.enableDelete"></i></span>  
                </div>
                </td>
                <td (click)="cellClick(row, column.name)" *ngFor="let column of columns" [innerHtml]="sanitize(getData(row, column.name))"></td>
            </tr>
        </tbody>
    </table>
  `
})
export class NgTableComponent {
    // Table values
    @Input() public rows: Array<any> = [];

    @Input()
    public set config(conf: any) {
        if (!conf.className) {
            conf.className = 'table-bordered';
        }
        if (conf.className instanceof Array) {
            conf.className = conf.className.join(' ');
        }

        this._config = conf;
    }

    // Outputs (Events)
    @Output() public tableChanged: EventEmitter<any> = new EventEmitter();
    @Output() public cellClicked: EventEmitter<any> = new EventEmitter();
    @Output() public viewClicked: EventEmitter<any> = new EventEmitter();
    @Output() public editClicked: EventEmitter<any> = new EventEmitter();
    @Output() public moveClicked: EventEmitter<any> = new EventEmitter();
    @Output() public deleteClicked: EventEmitter<any> = new EventEmitter();

    public showFilterRow: Boolean = false;

    @Input()
    public set columns(values: Array<any>) {
        values.forEach((value: any) => {
            if (value.filtering) {
                this.showFilterRow = true;
            }
            if (value.className && value.className instanceof Array) {
                value.className = value.className.join(' ');
            }
            let column = this._columns.find((col: any) => col.name === value.name);
            if (column) {
                Object.assign(column, value);
            }
            if (!column) {
                this._columns.push(value);
            }
        });
    }

    private _columns: Array<any> = [];
    private _config: any = {};

    public constructor(private sanitizer: DomSanitizer) {
    }

    public sanitize(html: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    public get columns(): Array<any> {
        return this._columns;
    }

    public get config(): any {
        return this._config;
    }

    public get configColumns(): any {
        let sortColumns: Array<any> = [];

        this.columns.forEach((column: any) => {
            if (column.sort) {
                sortColumns.push(column);
            }
        });

        return { columns: sortColumns };
    }

    public onChangeTable(column: any): void {
        this._columns.forEach((col: any) => {
            if (col.name !== column.name && col.sort !== false) {
                col.sort = '';
            }
        });
        this.tableChanged.emit({ sorting: this.configColumns });
    }

    public getData(row: any, propertyName: string): string {
        return propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
    }

    public cellClick(row: any, column: any): void {
        this.cellClicked.emit({ row });
    }

    public moveClick(row: any): void {
        this.moveClicked.emit({ row });
    }

    public editClick(row: any): void {
        this.editClicked.emit({ row });
    }

    public deleteClick(row: any): void {
        this.deleteClicked.emit({ row });
    }

    public viewClick(row: any): void {
        this.viewClicked.emit({ row });
    }
}

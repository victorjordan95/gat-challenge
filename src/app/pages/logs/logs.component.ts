import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import * as dateFns from 'date-fns';

import { ApiService } from 'src/app/shared/services/api.service';

import { LogViewModalComponent } from './log-view-modal/log-view-modal.component';
import Issue from '../../shared/types/Issue';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss'],
    providers: [ApiService]
})
export class LogsComponent implements OnInit {

    @ViewChild(LogViewModalComponent) modalComponent: LogViewModalComponent;

    public subscription: Subscription;
    public isLoading: boolean;

    public logs: Issue[];
    public originalLogs: Issue[];

    public key = 'Name';
    public reverse = false;
    public currentPage = 1;
    public filterText = '';
    public selectedFilter: string;

    public fromDate: Date;
    public toDate: Date;
    public isDate: boolean;

    public table_headers = [
        { 'label': 'ID', 'id': 'ID' },
        { 'label': 'Name', 'id': 'Name' },
        { 'label': 'Asset', 'id': 'Asset' },
        { 'label': 'Status', 'id': 'Status' },
        { 'label': 'Severity (Asset risk)', 'id': 'Severity' },
        { 'label': 'Responsible', 'id': 'Responsible' },
        { 'label': 'Port', 'id': 'Port' },
        { 'label': 'Protocol', 'id': 'Protocol' },
        { 'label': 'Source', 'id': 'Source' },
        { 'label': 'Changed date', 'id': 'ChangedDate' },
        { 'label': 'Last seen date', 'id': 'LastSeenDate' },
        { 'label': 'Due date', 'id': 'DueDate' }
    ];

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.getLogs();
    }

    /**
     * Show modal with the clicked issue content
     * @param issue Issue - The clicked issue by user
     */
    public showModal(issue: Issue): void {
        this.modalComponent.showModal(issue);
    }

    /**
     * Order the column by the clicked
     * column in HTML table.
     * Orders it by ASC or DESC
     * @param key String - Clicked header in HTML
     */
    public sort(key: string): void {
        this.key = key;
        this.reverse = !this.reverse;
    }

    /**
     * Defines which type of search will make
     * If it's empty, returns all logs.
     */
    public searchFilter(): void {
        this.logs = [];
        if (this.filterText === '' && !this.isDate) {
            this.resetLogs();
            return;
        }
        this.isDate ? this.searchForDateFields() : this.searchForTextFields();
    }

    /**
     * Search for Date fields.
     * Parse the string to a valid
     * date format.
     */
    private searchForDateFields(): void {
        this.originalLogs.forEach((log: Issue) => {
            let compareDate = log[this.selectedFilter].split('-')[0];
            compareDate = compareDate.split('/');
            compareDate = new Date(compareDate[2], (parseInt(compareDate[1], 10) - 1), (parseInt(compareDate[0], 10) + 1));
            if (dateFns.isWithinRange(compareDate, this.fromDate, this.toDate)) {
                this.logs = [...this.logs, log];
            }
        });
    }

    /**
     * Search for text fields
     */
    private searchForTextFields(): void {
        this.originalLogs.forEach((log: Issue) => {
            if (log[this.selectedFilter]
                .toString()
                .toLowerCase()
                .includes(this.filterText.toString().toLowerCase())) {
                this.logs = [...this.logs, log];
            }
        });
    }

    /**
     * Clean any filter and
     * return to the original state
     */
    public resetLogs(): void {
        this.logs = [];
        this.logs = [...this.originalLogs];
    }

    /**
     * Check if the selected column
     * is a date type or text
     * @param column The selected column
     */
    onChangeColumn(column: {label: string, id: string}) {
        this.resetLogs();
        if (column.id === 'ChangedDate' || column.id === 'LastSeenDate' || column.id === 'DueDate') {
            this.isDate = true;
        } else {
            this.isDate = false;
        }
    }

    /**
     * Fetch from server the logs
     */
    private getLogs(): void {
        this.isLoading = true;
        this.subscription = this.apiService.getLogs().subscribe(
            (logs: Issue[]) => {
                this.originalLogs = logs;
                this.logs = logs;
                this.isLoading = false;
            },
            (err: any) => {
                console.log(err);
                this.isLoading = false;
            }
        );
    }

}
